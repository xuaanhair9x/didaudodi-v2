<?php

namespace Frontend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class HtmlTb extends AbstractTableGateway
{
    protected $table = 'html_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('h' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('h.id = l.item_id AND l.display = 1 AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
        */

        if (isset($params['root_id'])) {
            $select->where->equalTo('h.menu_code_id', $params['root_id']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('h.parent', $params['parent']);
        }
        if (isset($params['list_id'])) {
            $select->where->In('h.id', $params['list_id']);
        }
        if (isset($params['deny_id'])) {
            $select->where->notIn('h.id', $params['deny_id']);
        }

        $select->where->equalTo('h.display', 1);
        $select->order(new Expression('CASE WHEN h.sort IS NULL THEN 1 ELSE 0 END, '.(($params['orderby']) ? 'h.'.implode(', h.', $params['orderby']) : 'h.sort ASC, h.id ASC')));

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
        $select->from(array('h' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('h.id = l.item_id AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        $select->where->equalTo('h.id', $params['id']);
        $select->where->equalTo('h.display', 1);
        $select->limit(1)->offset(0);

        $result = $this->selectWith($select)->toArray()[0];
        unset($result['define']);

        if (isset($params['sub'])) {
            $result['sub'] = $this->listItem(array('parent' => $result['id'], 'columns' => array('id','name','icon','desc_short','thumbnail','multi_input'), 'orderby' => array('sort ASC','id ASC')));
        }

        foreach (array('multi_input','multi_detail','multi_file','multi_image') as $name) {
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
            $result['translate']['multi_detail'] = array_merge(
                $result['multi_detail'] ? $result['multi_detail'] : array(),
                $result['translate']['multi_detail'] ? $result['translate']['multi_detail'] : array()
            );
            $result['translate']['multi_image'] = array_replace_recursive(
                $result['multi_image'] ? $result['multi_image'] : array(),
                $result['translate']['multi_image'] ? $result['translate']['multi_image'] : array()
            );

            if(LANG == 'en') {
                $temp = $result['multi_image'];
                $translt = $result['translate']['multi_image'];
                foreach ($temp as $key => $value) {
                    foreach ($value as $i => $item) {
                        $translt[$key][$i]['thumbnail'] = $item['thumbnail'];
                    }
                }
            } else {
                $translt = $result['multi_image'];
            }

            $result['translate']['multi_image'] = $translt;
            $result = array_merge($result, $result['translate']);
            unset($result['translate']);
        */

        return $result ?? array();
    }
}
