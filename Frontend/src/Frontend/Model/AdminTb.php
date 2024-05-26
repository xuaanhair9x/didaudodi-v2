<?php

namespace Frontend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Authentication\Adapter\DbTable as AuthAdapter;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Result;
use Zend\Db\Sql\Select;

class AdminTb extends AbstractTableGateway
{
    protected $table = 'admin_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);
        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        if (isset($params['email'])) {
            $select->where->equalTo('email', $params['email']);
        }

        if (isset($params['username'])) {
            $select->where->equalTo('username', $params['username']);
        }

        return $this->selectWith($select)->toArray()[0];
    }
}