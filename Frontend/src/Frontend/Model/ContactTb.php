<?php

namespace Frontend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
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

   	public function saveData($params = null)
   	{
	   	$data = array();

	   	$data['menu_code_id'] = $params['post']['root_id'];
        if (isset($params['post']['type'])) {
            $data['type'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['type']);
        }
	   	if (isset($params['post']['fullname'])) {
	   		$data['fullname'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['fullname']);
	   	}
	   	if (isset($params['post']['phone'])) {
	   		$data['phone'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['phone']);
	   	}
	   	if (isset($params['post']['email'])) {
	   		$data['email'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['email']);
	   	}
	   	if (isset($params['post']['address'])) {
	   		$data['address'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['address']);
	   	}
	   	if (isset($params['post']['content'])) {
	   		$data['content'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['content']);
	   	}
	   	if (isset($params['post']['file'])) {
	   		$data['file'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['file']);
	   	}
	   	if (isset($params['post']['multi_field'])) {
	   		$data['multi_field'] = json_encode($params['post']['multi_field'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
	   	}
	   	$data['date_created'] = date('Y/m/d H:i:s', time());
	   	$this->insert($data);
   	}
}