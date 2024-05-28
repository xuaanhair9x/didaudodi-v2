<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class MemberTb extends AbstractTableGateway
{
    protected $table = 'member_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('c' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['status']) && $params['status'] != 'all') {
            $select->where->equalTo('c.status', $params['status']);
        }
        if (isset($params['email'])) {
            $select->where->equalTo('c.email', $params['email']);
        }
        if (isset($params['deny_id'])) {
            $select->where->notIn('c.id', $params['deny_id']);
        }
        if (isset($params['count'])) {
            $select->join(
                array('o' => 'orders_tb'),
                'o.member_id = c.id',
                array('count' => new Expression('COUNT(member_id)')),
                'left'
            )->group('c.id');
        }

        $select->order('c.id DESC');

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        if (isset($params['id'])) {
            $select->where->equalTo('id', $params['id']);
        }

        $result = $this->selectWith($select)->toArray()[0];
        return $result;
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params = null)
    {
        if (isset($params['post']['fullname'])) {
            $data['fullname'] = $params['post']['fullname'];
        }
        if (isset($params['post']['email'])) {
            $data['email'] = $params['post']['email'];
        }
        if (isset($params['post']['phone'])) {
            $data['phone'] = $params['post']['phone'];
        }
        if (!empty($params['post']['address'])) {
            $data['address'] = $params['post']['address'];
        }
        if (isset($params['post']['note'])) {
            $data['note'] = $params['post']['note'];
        }
        if (isset($params['post']['birthday'])) {
            $data['birthday'] = $params['post']['birthday'];
        }
        if (isset($params['post']['sex'])) {
            $data['sex'] = $params['post']['sex'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (!empty($params['post']['password'])) {
            $data['password'] = \Backend\View\Helper\Crypt::encodePassword($params['post']['password']);
        }
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
        }
        if ($data) {
            if ($params['id']) {
                $data['date_updated'] = date('Y-m-d', time());
                $this->update($data,'id = '.$params['id']);
            } else {
                $data['date_created'] = date('Y-m-d', time());
                $this->insert($data);
            }
        }

        return $data;
    }
}