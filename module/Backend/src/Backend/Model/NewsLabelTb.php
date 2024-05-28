<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class NewsLabelTb extends AbstractTableGateway
{
    protected $table = 'news_label_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('nlabel' => $this->table));

        if (isset($params['news_cat_id'])) {
            $select->join(
                array('ncat' => 'news_cat_tb'),
                new Expression('ncat.list_label_id LIKE CONCAT("%:", nlabel.id, ":%")'),
                array('news_cat_id' => new Expression('GROUP_CONCAT(ncat.id ORDER BY ncat.level, ncat.id)')),
                'left'
            );
            $select->group('nlabel.id');
        }
        if (isset($params['display'])) {
            $select->where->equalTo('nlabel.display', $params['display']);
        }
        if (isset($params['list_id']) && isset($params['status'])) {
            $select->where->nest()
                            ->equalTo('nlabel.status', $params['status'])->or->in('nlabel.id', $params['list_id'])
                            ->unnest;
        } else if (isset($params['list_id'])) {
            $select->where->in('nlabel.id', $params['list_id']);
        } else if (isset($params['status'])) {
            $select->where->equalTo('nlabel.status', $params['status']);
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('nlabel.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('nlabel.id');
        }

        $select->order(new Expression('CASE WHEN nlabel.sort IS NULL THEN 1 ELSE 0 END, nlabel.sort ASC, nlabel.id DESC'));
        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('multi_input','multi_detail','multi_image','multi_file') as $name) {
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
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
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
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
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