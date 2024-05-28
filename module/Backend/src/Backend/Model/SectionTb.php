<?php

namespace Backend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class SectionTb extends AbstractTableGateway
{
    protected $table = 'section_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('s' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('s.parent', $params['parent']);
        } else {
            $select->where->isNull('s.parent');
        }
        if (isset($params['menu_code_id'])) {
            $select->where->equalTo('s.menu_code_id', $params['menu_code_id']);
        }
        if (isset($params['list_id']) && !empty(array_filter($params['list_id']))) {
            $select->where->in('s.id', $params['list_id']);
        }
        if (isset($params['display'])) {
            $select->where->equalTo('display', $params['display']);
        }

        $select->order(new Expression('CASE WHEN s.sort IS NULL THEN 1 ELSE 0 END, s.sort ASC, ' . (($params['orderby']) ? 's.' . implode(', s.', $params['orderby']) : 's.id ASC')));

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('embed', 'special', 'multi_input', 'multi_detail', 'multi_image', 'multi_file', 'define') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        return $result;
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = ' . $params['id']);
    }

    public function saveData($params, $config = array())
    {
        $item = $this->getItem(array('id' => $params['id'] ?? 0, 'columns' => array('special')));

        $filter = new \Zend\Filter\ToNull();
        if (isset($params['post']['menu_code_id'])) {
            $data['menu_code_id'] = $filter->filter($params['post']['menu_code_id']);
        }
        if (isset($params['post']['parent'])) {
            $data['parent'] = $filter->filter($params['post']['parent']);
        }
        if (isset($params['post']['sort'])) {
            $data['sort'] = $filter->filter($params['post']['sort']);
        }
        if (isset($params['post']['menu'])) {
            $data['menu'] = $params['post']['menu'];
        }
        if (isset($params['post']['note'])) {
            $data['note'] = $params['post']['note'];
        }
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
        }
        if (isset($params['post']['icon'])) {
            $data['icon'] = $params['post']['icon'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['define'])) {
            $data['define'] = json_encode($params['post']['define'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
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
        foreach (array('multi_input', 'multi_detail', 'multi_image', 'multi_file') as $name) {
            if (isset($params['post'][$name])) {
                if ($config[$name] && in_array($name, array('multi_input', 'multi_image'))) {
                    \Backend\View\Helper\Sort::multiData($params['post'][$name], $config[$name]);
                }
                $data[$name] = \Backend\View\Helper\RemoveElementArray::repeater($params['post'][$name], $name);
            }
        }

        if ($data) {
            if ($params['id']) {
                $this->update($data, 'id = ' . $params['id']);
                $increment = $params['id'];
            } else {
                $this->insert($data);
                $increment = $this->getLastInsertValue();
            }
        }

        return $increment;
    }
}
