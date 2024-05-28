<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Backend\Model\NewsTb;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class NewsCatTb extends AbstractTableGateway
{
    protected $table = 'news_cat_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('nc' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['root_id'])) {
            $select->join(
                array('multi' => new Expression("(
                    SELECT id,parent,level
                    FROM (SELECT id,parent,level FROM ".$this->table.") multi, (SELECT @multi:= '".$params['root_id']."') initialisation
                    WHERE find_in_set(parent, @multi) > 0 AND  @multi:= concat(@multi, ',', id)
                )")),
                'nc.id = multi.id',
                array('parent')
            );
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('nc.parent', $params['parent']);
        }
        if (isset($params['level'])) {
            $select->where('nc.level '. $params['level']);
        }
        if (isset($params['deny_id']) && !empty(array_filter($params['deny_id']))) {
            $select->where->notIn('nc.id', $params['deny_id']);
        }
        if (isset($params['slug'])) {
            $select->where->equalTo('nc.slug', $params['slug']);
        }
        if (isset($params['display'])) {
            $select->where->equalTo('nc.display', $params['display']);
        }
        if (isset($params['list_label_id'])) {
            $nest = $select->where->nest();
            foreach ($params['list_label_id'] as $id) {
                $nest->or->like('nc.list_label_id', '%:'.$id.':%');
            }
        }
        if (isset($params['define_news'])) {
            $nest = $select->where->nest();
            foreach ($params['define_news'] as $define) {
                $nest->or->like('nc.define_news', '%"'.$define.'"%');
            }
            $nest->unnest;
        }
        if (isset($params['check'])) {
            $select ->where
                    ->nest() // lồng câu lênh select
                        ->equalTo('nc.parent', $params['check'])
                        ->or
                        ->equalTo('nc.id', $params['check'])
                    ->unnest; // kết thúc lồng
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('nc.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('nc.id');
        }

        $select->order(new Expression('CASE WHEN nc.sort IS NULL THEN 1 ELSE 0 END, nc.sort ASC, nc.id ASC'));
        $result = $this->selectWith($select)->toArray();

        if (!empty($params['count'])) {
            $NewsTb = new NewsTb();
            foreach ($result as $i => $value) {
                $result[$i]['count'] = count($NewsTb->listItem(array('root_id' => $value['id'])));
            }
        }

        return $result;
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('embed','special','multi_input','multi_detail','multi_image','multi_file','define_item','define_news') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        return $result;
    }

    public function getParent($params = null, $all_parents = false)
    {
        $select = new Select();
        $select->from(array('nc' => $this->table));
        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        $select->join(
            array('parents' => new Expression("(
                SELECT @r AS id, (SELECT @r := parent FROM ".$this->table." WHERE id = @r) AS parent
                FROM (SELECT @r := ".$params['child_id'].") vars, ".$this->table."
                WHERE @r <> 0
            )")),
            'nc.id = parents.id'
        );
        if (isset($params['parent'])) {
            $select->where->equalTo('nc.parent', $params['parent']);
        }
        if (isset($params['level'])) {
            $select->where('nc.level '. $params['level']);
        }

        $result = $this->selectWith($select)->toArray();
        return $all_parents ? $result : $result[0];
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params, $config = array())
    {
        $item = $this->getItem(array('id' => $params['id'] ?? 0, 'columns' => array('special')));

        $filter = new \Zend\Filter\ToNull();
        if (isset($params['post']['sort'])) {
            $data['sort'] = $filter->filter($params['post']['sort']);
        }
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
            $ToSlug = new ToSlug();
            $data['slug'] = $ToSlug($data['name']);
            if (!empty($params['post']['slug'])) {
                $data['slug'] = $ToSlug($params['post']['slug']);
            }
        }
        if (isset($params['post']['title'])) {
            $data['title'] = $params['post']['title'];
        }
        if (isset($params['post']['description'])) {
            $data['description'] = $params['post']['description'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['keyword'])) {
            $data['keyword'] = $params['post']['keyword'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['level'])) {
            $data['level'] = $params['post']['level'] ? $params['post']['level'] : 0;
        }
        if (isset($params['post']['parent'])) {
            $data['parent'] = $params['post']['parent'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['list_label_id'])) {
            $data['list_label_id'] = ($params['post']['list_label_id']) ? ':'.implode(':,:', $params['post']['list_label_id']).':' : null;
        }
        if (isset($params['post']['list_tag_id'])) {
            $data['list_tag_id'] = ($params['post']['list_tag_id']) ? ':'.implode(':,:', $params['post']['list_tag_id']).':' : null;
        }
        if (isset($params['post']['list_news_id'])) {
            $data['list_news_id'] = ($params['post']['list_news_id']) ? ':'.implode(':,:', $params['post']['list_news_id']).':' : null;
        }
        if (isset($params['post']['list_product_id'])) {
            $data['list_product_id'] = ($params['post']['list_product_id']) ? ':'.implode(':,:', $params['post']['list_product_id']).':' : null;
        }
        if (isset($params['post']['list_section_id'])) {
            $params['post']['list_section_id'] = array_filter($params['post']['list_section_id']);
            $data['list_section_id'] = $params['post']['list_section_id'] ? ':'.implode(':,:', $params['post']['list_section_id']).':' : null;
        }
        if (isset($params['post']['define_item'])) {
            $data['define_item'] = json_encode($params['post']['define_item'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['define_news'])) {
            $data['define_news'] = json_encode($params['post']['define_news'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['embed'])) {
            array_shift($params['post']['embed']);
            foreach ($params['post']['embed'] as $i => $value) {
                $params['post']['embed'][$i]['embed'] = htmlspecialchars($params['post']['embed'][$i]['embed']);
            }
            $data['embed'] = $params['post']['embed'] ? json_encode($params['post']['embed'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) : null;
        }
        if (isset($params['post']['special'])) {
            $data['special'] = array_merge($item['special'] ?? array(), $params['post']['special'] ?? array());
            if ($data['special']) {
                $special = $data['special'];
                $data['special'] = array_reduce(array_keys($special), function($acc = array(), $key) use ($special) {
                    if ($special[$key] != 0) {
                        $acc[$key] = $special[$key];
                    }
                    return $acc;
                });
            }

            $data['special'] = empty($data['special']) ? null : json_encode($data['special']);
        }
        foreach (array('multi_input','multi_detail','multi_image','multi_file') as $name) {
            if (isset($params['post'][$name])) {
                if ($config[$name] && in_array($name, array('multi_input', 'multi_image'))) {
                    \Backend\View\Helper\Sort::multiData($params['post'][$name], $config[$name]);
                }
                $data[$name] = \Backend\View\Helper\RemoveElementArray::repeater($params['post'][$name], $name);
            }
        }

        if ($data) {
            if ($params['id']) {
                $this->update($data,'id = '.$params['id']);
                $increment = $params['id'];
            } else {
                $this->insert($data);
                $increment = $this->getLastInsertValue();
            }
        }

        return $increment;
    }
}