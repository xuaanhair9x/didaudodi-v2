<?php

namespace Backend\Model;

use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class InfoTb extends AbstractTableGateway
{
    protected $table = 'info_tb';

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

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('embed','mailer','headline','multi_image','multi_input','multi_detail','multi_file') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        return $result;
    }

    public function saveData($params, $config = array())
    {
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
        }
        if (isset($params['post']['address'])) {
            $data['address'] = $params['post']['address'];
        }
        if (isset($params['post']['email'])) {
            $data['email'] = $params['post']['email'];
        }
        if (!empty($params['post']['logo'])) {
            $data['logo'] = $params['post']['logo'];
        }
        if (!empty($params['post']['favicon'])) {
            $data['favicon'] = $params['post']['favicon'];
        }
        if (!empty($params['post']['image'])) {
            $data['image'] = $params['post']['image'];
        }
        if (isset($params['post']['map'])) {
            $data['map'] = $params['post']['map'];
        }
        if (isset($params['post']['notification'])) {
            $data['notification'] = $params['post']['notification'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['mailer'])) {
            $data['mailer'] = $params['post']['mailer'] ? json_encode($params['post']['mailer']) : null;
        }
        if (isset($params['post']['embed'])) {
            array_shift($params['post']['embed']);
            foreach ($params['post']['embed'] as $i => $value) {
                $params['post']['embed'][$i]['embed'] = htmlspecialchars($params['post']['embed'][$i]['embed']);
            }
            $data['embed'] = $params['post']['embed'] ? json_encode($params['post']['embed'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) : null;
        }
        foreach (array('headline','multi_image','multi_input','multi_detail','multi_file') as $name) {
            if (isset($params['post'][$name])) {
                if ($config[$name] && in_array($name, array('multi_input', 'multi_image'))) {
                    \Backend\View\Helper\Sort::multiData($params['post'][$name], $config[$name]);
                }
                $data[$name] = \Backend\View\Helper\RemoveElementArray::repeater($params['post'][$name], $name);
            }
        }

        if ($params['id']) {
            $this->update($data,'id = '.$params['id']);
            $increment = $params['id'];
        }

        return $increment;
    }
}