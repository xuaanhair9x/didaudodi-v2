<?php

namespace Backend\Model;

use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class BannerTb extends AbstractTableGateway
{
    protected $table = 'banner_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('b' => $this->table));

        if (isset($params['menu_code_id'])) {
            $select->where->equalTo('b.menu_code_id', $params['menu_code_id']);
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('b.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('b.id');
        }

        $select->order(new Expression('CASE WHEN b.sort IS NULL THEN 1 ELSE 0 END, b.sort ASC'));
        return $this->selectWith($select)->toArray();
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
        foreach (array('special','multi_input','multi_image') as $name) {
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

    public function saveData($params = null)
    {
        $item = $this->getItem(array('id' => $params['id'] ?? 0, 'columns' => array('special')));

        $filter = new \Zend\Filter\ToNull();
        if (isset($params['post']['sort'])) {
            $data['sort'] = $filter->filter($params['post']['sort']);
        }
        if (isset($params['post']['menu_code_id'])) {
            $data['menu_code_id'] = $params['post']['menu_code_id'];
        }
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
        }
        if (isset($params['post']['link'])) {
            $data['link'] = $params['post']['link'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
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
        foreach (array('multi_image') as $name) {
            if (isset($params['post'][$name])) {
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