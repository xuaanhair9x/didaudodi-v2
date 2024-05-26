<?php

namespace Frontend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Sql\Select;

class OrderTb extends AbstractTableGateway
{
    protected $table = 'orders_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function saveData($params = null)
    {
        $data = array();
        if (isset($params['post']['orderCode'])) {
            $data['orderCode'] = $params['post']['orderCode'];
        }
        if (isset($params['post']['member_id'])) {
            $data['member_id'] = $params['post']['member_id'];
        }
        if (isset($params['post']['discount_id'])) {
            $data['discount_id'] = $params['post']['discount_id'];
        }
        if (isset($params['post']['total_price'])) {
            $data['total_price'] = $params['post']['total_price'];
        }
        if (isset($params['post']['total_sum'])) {
            $data['total_sum'] = $params['post']['total_sum'];
        }
        if (isset($params['post']['shipping_fee'])) {
            $data['shipping_fee'] = $params['post']['shipping_fee'];
        }
        if (isset($params['post']['extraDiscount'])) {
            $data['extraDiscount'] = $params['post']['extraDiscount'];
        }
        if (isset($params['post']['shippingType'])) {
            $data['shippingType'] = $params['post']['shippingType'];
        }
        if (isset($params['post']['paymentType'])) {
            $data['paymentType'] = $params['post']['paymentType'];
        }
        if (isset($params['post']['paymentStatus'])) {
            $data['paymentStatus'] = $params['post']['paymentStatus'];
        }
        if (isset($params['post']['paymentCode'])) {
            $data['paymentCode'] = $params['post']['paymentCode'];
        }
        if (isset($params['post']['comment'])) {
            $data['comment'] = $params['post']['comment'];
        }
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
        }
        if (isset($params['post']['checkPayment'])) {
            $data['checkPayment'] = $params['post']['checkPayment'];
        }
        if (isset($params['post']['discountInfo'])) {
            $data['discountInfo'] = json_encode($params['post']['discountInfo'], JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['recipient_data'])) {
            $data['recipient_data'] = json_encode($params['post']['recipient_data'], JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['multi_data'])) {
            $data['multi_data'] = json_encode($params['post']['multi_data'], JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['templateMail'])) {
            $data['templateMail'] = json_encode($params['post']['templateMail'], JSON_UNESCAPED_UNICODE);
        }

        if (!empty($params['id'])) {
            $this->update($data, 'id = ' . $params['id']);
            $increment = $params['id'];
        } else {
            $data['date_created'] = date('Y-m-d H:i:s',time());
            $this->insert($data);
            $increment = $this->getLastInsertValue();
        }
        return $increment;
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['limit'])) {
            $select->limit($params['limit'])->offset(isset($params['offset']) ? $params['offset'] : 0);
        }
        if (isset($params['member_id'])) {
            $select->where->equalTo('member_id', $params['member_id']);
        }

        $select->order((($params['orderby']) ? implode(', ', $params['orderby']).', ' : '').'id DESC');

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);
        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['id'])) {
            $select->where->equalTo('id', $params['id']);
        }
        if (isset($params['orderCode'])) {
            $select->where->equalTo('orderCode', $params['orderCode']);
        }
        if (isset($params['status'])) {
            $select->where->equalTo('status', $params['status']);
        }

        return $this->selectWith($select)->toArray()[0];
    }

    public function getID() {
        return $this->adapter->query("SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '".$this->table."'", \Zend\Db\Adapter\Adapter::QUERY_MODE_EXECUTE)->current()->AUTO_INCREMENT;
    }

    public function countItem($params = null)
    {
        unset($params['limit']);
        return count($this->listItem($params));
    }
}