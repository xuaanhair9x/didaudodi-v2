<?php

namespace Frontend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Sql\Select;
Use Zend\Db\Sql\Predicate\Expression;

class OrderDetailTb extends AbstractTableGateway
{
    protected $table = 'orders_detail_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function saveData($params = null)
    {
        $data = array();
        $data['orders_id'] = $params['post']['orders_id'];
        $data['product_id'] = $params['post']['product_id'];
        $data['quantity'] = $params['post']['quantity'];
        $data['product_meta'] = $params['post']['product_meta'];
        $this->insert($data);
    }

    // Chi tiết đơn đặt hàng.
    public function detailOrder($params = null)
    {
        $select = new Select();
        $select ->from(array('d' => $this->table))
                ->columns(array('orders_id'))
                ->join(array('o' => 'orders_tb'), 'd.orders_id = o.id')
                ->join(array('c' => 'member_tb'), 'o.member_id = c.id', array('fullname','phone','address'));
        if (isset($params['orders_id'])) {
            $select->where->equalTo('orders_id', $params['orders_id']);
        }

        return $this->selectWith($select)->toArray()[0];
    }

    // Danh sách sản phẩm thuộc đơn đặt hàng.
    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('d' => $this->table));

        // $columns = array(
        //     'price' => new Expression(
        //         'CASE
        //             WHEN p.price_discount > 0 THEN p.price_discount
        //             WHEN p.price_discount = 0 THEN p.price_market
        //         END'
        // ), 'quantity', 'product_id', 'product_meta');
        // $select->columns($columns);

        if (isset($params['orders_id'])) {
            $select->where->equalTo('orders_id', $params['orders_id']);
        }

        return $this->selectWith($select)->toArray();
    }

    public function config($params = null)
    {
        $select = new Select();
        $select->from('menu_code_tb');

        $select->where->equalTo('id', 3);

        return json_decode($this->selectWith($select)->toArray()[0]['define'], true);
    }
}