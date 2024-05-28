<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;

class AdminTb extends AbstractTableGateway
{
    protected $table = 'admin_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('a' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        } else {
            $select->columns(array('id','role_id','username','fullname','email','status','force_reset'));
        }
        if (isset($params['deny_id'])) {
            $select->where->notIn('a.id', $params['deny_id']);
        }
        if (isset($params['status']) && $params['status'] != 'all') {
            $select->where->equalTo('a.status', $params['status']);
        }
        if (isset($params['role_name'])) {
            $select->join(
                array('r'=> 'admin_role_tb'),
                'a.role_id = r.id',
                array('role_name' => 'name'),
                'left'
            );
        }
        $select->order('a.id DESC');
        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        if (isset($params['getRecord'])) {
            $select->where
                        ->nest()
                            ->equalTo('username', $params['getRecord']['username'])
                            ->or
                            ->equalTo('email', $params['getRecord']['email'])
                        ->unnest;
            if ($params['getRecord']['id']) {
                $select->where->notEqualTo('id', $params['getRecord']['id']);
            }
        }
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
        if (isset($params['post']['role_id'])) {
            $data['role_id'] = $params['post']['role_id'];
        }
        if (isset($params['post']['fullname'])) {
            $data['fullname'] = $params['post']['fullname'];
        }
        if (isset($params['post']['email'])) {
            $data['email'] = $params['post']['email'];
        }
        if (isset($params['post']['username'])) {
            $data['username'] = $params['post']['username'];
        }
        if (!empty($params['post']['password'])) {
            $data['password'] = $params['post']['password'];
        }
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
        }
        if (isset($params['post']['force_reset'])) {
            $data['force_reset'] = $params['post']['force_reset'];
        }
        if (isset($params['post']['sessionLogin'])) {
            $data['sessionLogin'] = $params['post']['sessionLogin'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if ($data) {
            if ($params['id']) {
                $data['date_updated'] = date('Y-m-d H:i:s', time());
                $this->update($data,'id = '.$params['id']);
            } else {
                $data['date_created'] = date('Y-m-d H:i:s', time());
                $this->insert($data);
            }
        }

        return $data;
    }
}