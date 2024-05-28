<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;

class ContactTb extends AbstractTableGateway
{
    protected $table = 'contact_tb';

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

        $select->where->equalTo('menu_code_id', $params['menu_code_id']);

        if (isset($params['status']) && $params['status'] != 'all') {
            $select->where->equalTo('status', $params['status']);
        }
        if (isset($params['from']) && $params['from']) {
            $select->where->greaterThanOrEqualTo('date_created', date('Y-m-d H:i:s',strtotime($params['from'].' 00:00:00')));
        }
        if (isset($params['to']) && $params['to']) {
            $select->where->lessThanOrEqualTo('date_created', date('Y-m-d H:i:s',strtotime($params['to'].' 23:59:00')));
        }
        $select->order('status ASC, id DESC');

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        $result['multi_field'] = json_decode($result['multi_field'], true);

        return $result;
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params = null)
    {
        $data['status'] = $params['post']['status'];

        $this->update($data,'id = '.$params['id']);

        return $data;
    }
}