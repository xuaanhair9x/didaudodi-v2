<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;

class AdminSessionTb extends AbstractTableGateway
{
    protected $table = 'admin_session_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('s' => $this->table));
        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['admin_id'])) {
            $select ->where->equalTo('admin_id', $params['admin_id']);
        }
        if(isset($params['from']) && $params['from']){
            $select->where->greaterThanOrEqualTo('session_start', date('Y-m-d H:i:s',strtotime($params['from'].' 00:00:00')));
        }
        if(isset($params['to']) && $params['to']){
            $select->where->lessThanOrEqualTo('session_start', date('Y-m-d H:i:s',strtotime($params['to'].' 23:59:00')));
        }
        if (isset($params['user'])) {
            $select->join(
                array('a'=> 'admin_tb'),
                's.admin_id = a.id',
                array('fullname','username'),
                'left'
            );
        }
        if ($params['col'] && $params['orderby']) {
            $select->order($params['col'] . ' ' . $params['orderby']);
        } else {
           $select->order('id DESC');
        }
        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);
        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if ($params['id']) {
            $select->where->equalTo('id', $params['id']);
        }
        $result = $this->selectWith($select)->toArray()[0];
        return $result;
    }

    public function getItemLast($params = null){
        $params['col'] = 'id';
        $params['orderby'] = 'DESC';
        return $this->listItem($params)[0];
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params = null)
    {
        $data['ip'] = $_SERVER['REMOTE_ADDR'];
        if ($params['admin_id']) {
            $data['admin_id'] = $params['admin_id'];
        }
        if ($params['id']) {
            $data['session_end'] = date('Y-m-d H:i:s', time());
            $this->update($data, 'id = ' . $params['id']);
        } else {
            $data['session_start'] = date('Y-m-d H:i:s', time());
            $this->insert($data);
        }
        return $data;
    }
}
