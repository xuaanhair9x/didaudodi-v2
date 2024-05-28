<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;

class OrderTb extends AbstractTableGateway
{
    protected $table = 'orders_tb';

    public function __construct()
    {
      $this->featureSet = new Feature\FeatureSet();
      $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
      $this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('o' => $this->table))
                ->join(array('c' => 'member_tb'), 'o.member_id = c.id', array('fullname','email','phone','address','email'));

        if ($params['member_id']) {
            $select->where->equalTo('o.member_id', $params['member_id']);
        }
        if(isset($params['status']) && $params['status'] != 'all'){
            $select->where->equalTo('o.status', $params['status']);
        }
        if(isset($params['from']) && $params['from']){
            $select->where->greaterThanOrEqualTo('o.date_created', date('Y-m-d H:i:s',strtotime($params['from'].' 00:00:00')));
        }
        if(isset($params['to']) && $params['to']){
            $select->where->lessThanOrEqualTo('o.date_created', date('Y-m-d H:i:s',strtotime($params['to'].' 23:59:00')));
        }

        $select->order('o.id DESC');
        return $this->selectWith($select)->toArray();
    }

    public function listProduct($params = null)
    {
        $select = new Select();
        $select ->from(array('o' => $this->table))
                ->columns(array('id'))
                ->join(array('od' => 'orders_detail_tb'), 'o.id = od.orders_id', array('product_id','quantity','product_meta'));

        if (isset($params['id'])) {
            $select->where->equalTo('o.id', $params['id']);
        }

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select ->from(array('o' => $this->table))
                ->join(array('c' => 'member_tb'), 'o.member_id = c.id', array('fullname','phone','address','email','active' => 'status' ));

        if (isset($params['id'])) {
            $select->where('o.id = '.$params['id']);
        }

        $result = $this->selectWith($select)->toArray()[0];
        $result['multi_data'] = json_decode($result['multi_data'], true);
        $result['recipient_data'] = json_decode($result['recipient_data'], true);
        return $result;
    }

    public function deleteItem($params = null)
    {
        if (isset($params['id'])) {
            $this->delete('id = ' . $params['id']);
        }
        if (isset($params['member_id'])) {
            $this->delete('member_id = ' . $params['member_id']);
        }
    }

    public function saveData($params = null)
    {
        $data['status'] = $params['post']['status'];
        $this->update($data,'id = '.$params['id']);
        return $data;
    }
}
