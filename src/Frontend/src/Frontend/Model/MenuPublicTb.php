<?php

namespace Frontend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class MenuPublicTb extends AbstractTableGateway
{
    protected $table = 'menu_public_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
   	 	$select = new Select();
        $select->from(array('m' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('m.id = l.item_id AND l.display = 1 AND l.name <> "" AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
        */

        if (isset($params['active'])) {
            $select->where->equalTo('m.active', $params['active']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('m.parent', $params['parent']);
        }
        if (isset($params['list_id'])) {
            $select->where->In('m.id', $params['list_id']);
        }
        if (isset($params['deny_id'])) {
            $select->where->notIn('m.id', $params['deny_id']);
        }
        if (isset($params['display'])) {
            if ($params['display'] != 'all') {
                $select->where->equalTo('m.display', $params['display']);
            }
        } else {
            $select->where->equalTo('m.display', 1);
        }

        $select->order(new Expression('CASE WHEN m.sort IS NULL THEN 1 ELSE 0 END, '.(isset($params['orderby']) ? 'm.'.implode(', m.', $params['orderby']) : 'm.sort ASC')));

        $result = $this->selectWith($select)->toArray();

        foreach ($result as $i => $value) {
            foreach (array('multi_input','multi_image','multi_detail','multi_file','special') as $name) {
                if ($result[$i][$name]) {
                    $result[$i][$name] = json_decode($result[$i][$name], true);
                }
            }
        }

        // Nếu có ngôn ngữ LANG
        /*
            foreach ($result as $i => $value) {
                $result[$i] = array_merge($value, json_decode($value['translate'], true));
                unset($result[$i]['translate']);
            }
        */

        return $result;
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from(array('m' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('m.id = l.item_id AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        if (isset($params['active'])) {
            $select->where->equalTo('m.active', $params['active']);
        }
        if (isset($params['link'])) {
            $select->where->like('m.link', '%'.$params['link'].'%');
        }
        if (isset($params['id'])) {
            $select->where->equalTo('m.id', $params['id']);
        }

        $select->limit(1)->offset(0);

        $result = $this->selectWith($select)->toArray()[0];

        foreach (array('multi_input','multi_detail','multi_file','multi_image') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        // Nếu có ngôn ngữ LANG
        /*
            $result = array_replace($result, json_decode($result['translate'], true));
            unset($result['translate']);
        */

        return $result ?? array();
    }
}
