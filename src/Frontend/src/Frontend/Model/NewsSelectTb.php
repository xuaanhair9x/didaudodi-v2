<?php

namespace Frontend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class NewsSelectTb extends AbstractTableGateway
{
    protected $table = 'news_select_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('ns' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('ns.id = l.item_id AND l.display = 1 AND l.name <> "" AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
        */

        if (isset($params['root_id'])) {
            $select->where->equalTo('ns.menu_code_id', $params['root_id']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('ns.parent', $params['parent']);
        }
        if (isset($params['child'])) {
            $select->where->greaterThan('ns.parent', 0);
        }
        if (isset($params['level'])) {
            $select->where->equalTo('ns.level', $params['level']);
        }
        if (isset($params['list_id'])) {
            $select->where->in('ns.id', $params['list_id']);
        }
        $select->where->equalTo('ns.display', 1);
        $select->order(new Expression('CASE WHEN ns.sort IS NULL THEN 1 ELSE 0 END, ns.sort ASC, ns.id ASC'));

        $result = $this->selectWith($select)->toArray();

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
   		$select->from(array('ns' => $this->table));

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('ns.id = l.item_id AND l.display = 1 AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

   		$select->where->equalTo('id', $params['id']);
        $select->where->equalTo('ns.display', 1);
        $select->limit(1)->offset(0);

   		$result = $this->selectWith($select)->toArray()[0];
        foreach (array('multi_input') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        // Nếu có ngôn ngữ LANG
        /*
            $result['translate'] = json_decode($result['translate'], true);
            $result['translate']['multi_input'] = array_merge(
                $result['multi_input'] ? $result['multi_input'] : array(),
                $result['translate']['multi_input'] ? $result['translate']['multi_input'] : array()
            );
            $result = array_merge($result, $result['translate']);
            unset($result['translate']);
        */

   		return $result ?? array();
    }
}