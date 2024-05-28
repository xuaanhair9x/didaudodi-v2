<?php

namespace Frontend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class ProductLabelTb extends AbstractTableGateway
{
    protected $table = 'product_label_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('pl' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('pl.id = l.item_id AND l.display = 1 AND l.name <> "" AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
        */

        if (isset($params['list_id'])) {
            $select->where->in('id', $params['list_id']);
        }
        $select->where->equalTo('pl.display', 1);
        $select->order(new Expression('CASE WHEN pl.sort IS NULL THEN 1 ELSE 0 END, pl.sort ASC, pl.id ASC'));

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
        $select ->from(array('pl' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('pl.id = l.item_id AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        $select->where->equalTo('pl.id', $params['id']);
        $select->where->equalTo('pl.display', 1);
        $select->limit(1)->offset(0);

        $result = $this->selectWith($select)->toArray()[0];
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
            $result = array_merge($result, $result['translate']);
            unset($result['translate']);
        */

        return $result ?? array();
    }
}