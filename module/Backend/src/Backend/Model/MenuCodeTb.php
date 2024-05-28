<?php
namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class MenuCodeTb extends AbstractTableGateway
{
    protected $table = 'menu_code_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
   	 	$select = new Select();
        $select->from($this->table);

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('parent', $params['parent']);
        }
        if (isset($params['active'])) {
            $select->where->like('active', '%'.$params['active'].'%');
        } else {
            $select->where->notLike('active', '%_sub-%');
        }
        if (isset($params['list_id']) && !empty(array_filter($params['list_id']))) {
            $select->where->in('id', $params['list_id']);
        }
        if (isset($params['deny_id']) && !empty(array_filter($params['deny_id']))) {
            $select->where->notIn('id', $params['deny_id']);
        }
        if (isset($params['display'])) {
            $select->where->equalTo('display', $params['display']);
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

        if (isset($params['display'])){
            $select->where->equalTo('display', $params['display']);
        }

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        if ($result['define']) {
            $result['define'] = json_decode($result['define'], true);
        }

        return $result;
    }

    public function saveData($params = null)
    {
        $filter = new \Zend\Filter\ToNull();
        if (isset($params['post']['sort'])) {
            $data['sort'] = $filter->filter($params['post']['sort']);
        }
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
        }
        if (isset($params['post']['parent'])) {
            $data['parent'] = $params['post']['parent'] ? $params['post']['parent'] : 0;
        }
        if (isset($params['post']['active'])) {
            $data['active'] = $params['post']['active'];
        }
        if (isset($params['post']['link'])) {
            $data['link'] = $params['post']['link'];
        }
        if (isset($params['post']['icon'])) {
            $data['icon'] = $params['post']['icon'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['define'])) {
            $data['define'] = json_encode($params['post']['define'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
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

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }
}
