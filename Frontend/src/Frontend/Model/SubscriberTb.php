<?php

namespace Frontend\Model;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class SubscriberTb extends AbstractTableGateway
{
    protected $table = 'subscriber_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function saveData($params = null)
    {
        if (isset($params['post']['email'])) {
            $data = array();
            $data['email'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['email']);
            $select = new Select();
            $select ->from($this->table)->where->equalTo('email', $data['email']);
            if (!$this->selectWith($select)->toArray()[0]) {
                $data['status'] = 1;
                $data['date_created'] = date('Y-m-d', time());
                $this->insert($data);
            }
        }
    }
}