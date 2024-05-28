<?php

namespace Backend\Model;

use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class RedirectTb extends AbstractTableGateway
{
    protected $table = 'redirect_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('r' => $this->table));

        if (isset($params['url_old'])) {
            $select->where->equalTo('r.url_old', $params['url_old']);
        }
        if (!empty($params['deny_id'])) {
            $select->where->notIn('r.id', $params['deny_id']);
        }

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        $select->where->equalTo('id', $params['id']);

        return $this->selectWith($select)->toArray()[0];
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params = null)
    {
        if (isset($params['post']['url_old'])) {
            $parse = parse_url($params['post']['url_old']);
            $data['url_old'] = (preg_match('/^\//', $parse['path'], $match) ? $parse['path'] : '/'.$parse['path']).($parse['query'] ? '?'.$parse['query'] : '');
        }
        if (isset($params['post']['url_new'])) {
            $parse = parse_url($params['post']['url_new']);
            $data['url_new'] = (preg_match('/^\//', $parse['path'], $match) ? $parse['path'] : '/'.$parse['path']).($parse['query'] ? '?'.$parse['query'] : '');
            if ($parse['host']) {
                $data['url_new'] = $parse['scheme'].'://'.$parse['host'].$data['url_new'];
            }
        }
        if ($data) {
            if ($params['id']) {
                $this->update($data,'id = '.$params['id']);
                $increment = $params['id'];
            } else {
                $this->insert($data);
                $increment = $this->getLastInsertValue();
            }
        }

        return $increment;
    }
}