<?php

namespace Backend\Model;

use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class MenuPublicTb extends AbstractTableGateway
{
    protected $table = 'menu_public_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('n' => $this->table));

        if (isset($params['deny_increment'])) {
            $select1 = new Select();
            $select1->from($this->table)
                    ->columns(array('id'))
                    ->where->equalTo('n.level', 0)
                    ->where->greaterThan('n.parent', 0);
            $select->where->notIn('n.id', $select1);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('n.parent', $params['parent']);
        }
        if (isset($params['level'])) {
            $select->where('n.level '. $params['level']);
        }
        if (!empty($params['deny_id'])) {
            $select->where->notIn('n.id', $params['deny_id']);
        }
        if (isset($params['active'])) {
            $select->where->equalTo('n.active', $params['active']);
        }
        if (isset($params['display'])) {
            $select->where->equalTo('n.display', $params['display']);
        }
        if (isset($params['fixed'])) {
            $select->where->equalTo('n.fixed', $params['fixed']);
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('n.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('n.id');
        }

        $select->order(new Expression('CASE WHEN sort IS NULL THEN 1 ELSE 0 END, sort ASC'));
        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);
        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['id'])) {
            $select->where->equalTo('id', $params['id']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('parent', $params['parent']);
        }
        if (isset($params['active'])) {
            $select->where->equalTo('active', $params['active']);
        }
        if (isset($params['link'])) {
            $select->where->like('link', '%'.$params['link'].'%');
        }

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('embed','special','multi_input','multi_detail','multi_image','define') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        return $result;
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
        if (isset($params['post']['parent'])) {
            $data['parent'] = $params['post']['parent'] ? $params['post']['parent'] : 0;
        }
        if (isset($params['post']['level'])) {
            $data['level'] = $params['post']['level'] ? $params['post']['level'] : 0;
        }
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
        }
        if (isset($params['post']['title'])) {
            $data['title'] = $params['post']['title'];
        }
        if (isset($params['post']['description'])) {
            $data['description'] = $params['post']['description'];
        }
        if (isset($params['post']['keyword'])) {
            $data['keyword'] = $params['post']['keyword'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['link'])) {
            $data['link'] = $params['post']['link'];
        }
        if (isset($params['post']['active'])) {
            $data['active'] = $params['post']['active'];
        }
        if (isset($params['post']['icon'])) {
            $data['icon'] = $params['post']['icon'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if  (isset($params['post']['fixed'])) {
            $data['fixed'] = $params['post']['fixed'];
        }
        if (isset($params['post']['define'])) {
            $data['define'] = json_encode($params['post']['define'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
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
        foreach (array('multi_input','multi_detail','multi_image') as $name) {
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