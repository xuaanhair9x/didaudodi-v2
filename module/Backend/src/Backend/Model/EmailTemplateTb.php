<?php

namespace Backend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class EmailTemplateTb extends AbstractTableGateway
{
    protected $table = 'email_template_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('e' => $this->table));

        if (isset($params['deny_id'])){
            $select->where->notIn('e.id', $params['deny_id']);
        }
        if (isset($params['display'])) {
            $select->where->equalTo('e.display', $params['display']);
        }

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);
        if ($params['default']) {
            $select->columns(array('id','name','display','placeholders','body' => 'body_default', 'subject' => 'subject_default'));
        } else {
            $select->columns(array_merge(
                array('id','name','display','placeholders'),
                array(
                    'subject' => new Expression('CASE WHEN subject_edit IS NOT NULL THEN subject_edit ELSE subject_default END'),
                    'body' => new Expression('CASE WHEN body_edit IS NOT NULL THEN body_edit ELSE body_default END')
                )
            ));
        }

        if (isset($params['display'])) {
            $select->where->equalTo('display', $params['display']);
        }

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        $result['placeholders'] = $result['placeholders'] ? json_decode($result['placeholders'], true) : array('');

        if ($params['sendmail']) {
            if (empty($result['id'])) {
                return array();
            }
            $result['value'] = $result['key'] = array();
            foreach ($result['placeholders'] as $i => $value) {
                if ($i != 0) { $result['key'][] = '[['.$value['value'].']]'; }
            }
            unset($result['placeholders']);
        }

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
        if (isset($params['post']['subject_default'])) {
            $data['subject_default'] = $params['post']['subject_default'];
        }
        if (isset($params['post']['body_default'])) {
            $data['body_default'] = $params['post']['body_default'];
        }
        if (isset($params['post']['subject_edit'])) {
            $data['subject_edit'] = $params['post']['subject_edit'] ? $params['post']['subject_edit'] : null;
        }
        if (isset($params['post']['body_edit'])) {
            $data['body_edit'] = $params['post']['body_edit'] ? $params['post']['body_edit'] : null;
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['placeholders'])) {
            $data['placeholders'] = json_encode($params['post']['placeholders'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        }

        if ($params['id']) {
            $this->update($data,'id = '.$params['id']);
            $increment = $params['id'];
        } else {
            $this->insert($data);
            $increment = $this->getLastInsertValue();
        }

        return $increment;
    }
}