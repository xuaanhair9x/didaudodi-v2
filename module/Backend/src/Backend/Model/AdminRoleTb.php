<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;

class AdminRoleTb extends AbstractTableGateway
{
    protected $table = 'admin_role_tb';

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
        if (isset($params['deny_id'])) {
            $select->where->notIn('id', $params['deny_id']);
        }

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
        $result['permission'] = json_decode($result['permission'], true);
        return $result;
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params = null)
    {
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
        }
        if (isset($params['post']['permission'])) {
            $data['permission'] = $params['post']['permission'];
        }
        if ($data) {
            if ($params['id']) {
                $this->update($data,'id = '.$params['id']);
            } else {
                $this->insert($data);
            }
        }

        return $data;
    }
}