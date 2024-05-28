<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;

class LangMultiTb extends AbstractTableGateway
{
    protected $table = 'lang_multi_tb';

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

        $select->where->equalTo('item_id', $params['item_id']);
        $select->where->equalTo('type', $params['type']);

        if (isset($params['deny_lang'])) {
            $select->where->notIn('language', $params['deny_lang']);
        }

        if ($params['language']) {
            $select->where->equalTo('language', $params['language']);
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
        if ($params['language']) {
            $select->where->equalTo('item_id', $params['item_id']);
            $select->where->equalTo('type', $params['type']);
            $select->where->equalTo('language', $params['language']);
        }

        $result = $this->selectWith($select)->toArray()[0];
        return $result;
    }

    public function deleteItem($params = null)
    {
        $this->delete($params);
    }

    public function saveData($params = null)
    {
        $data = array();
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
        }
        if (isset($params['post']['item_id'])) {
            $data['item_id'] = $params['post']['item_id'];
        }
        if (isset($params['post']['translate'])) {
            $data['translate'] = $params['post']['translate'];
        }
        if (isset($params['post']['language'])) {
            $data['language'] = $params['post']['language'];
        }
        if (isset($params['post']['type'])) {
            $data['type'] = $params['post']['type'];
        }
        if  (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }

        if ($data) {
            if ($params['id']) {
                $this->update($data, 'id = ' . $params['id']);
            } else {
                $this->insert($data);
            }
        }
        return $data;
    }
}
