<?php

namespace Backend\Model;

use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class SubscriberTb extends AbstractTableGateway
{
    protected $table = 'subscriber_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('n' => $this->table));

        if(isset($params['from']) && $params['from']){
            $select->where->greaterThanOrEqualTo('date_created', date('Y-m-d',strtotime($params['from'].' 00:00:00')));
        }
        if(isset($params['to']) && $params['to']){
            $select->where->lessThanOrEqualTo('date_created', date('Y-m-d',strtotime($params['to'].' 23:59:00')));
        }

        return $this->selectWith($select)->toArray();
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }
}