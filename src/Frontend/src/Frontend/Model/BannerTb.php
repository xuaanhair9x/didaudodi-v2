<?php

namespace Frontend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class BannerTb extends AbstractTableGateway
{
    protected $table = 'banner_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('b' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('b.id = l.item_id AND l.display = 1 AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        $select->where->equalTo('b.menu_code_id', $params['root_id']);
        $select->where->equalTo('b.display', 1);
        $select->order(new Expression('CASE WHEN b.sort IS NULL THEN 1 ELSE 0 END, b.sort ASC'));

        $result = $this->selectWith($select)->toArray();

        // Nếu có ngôn ngữ LANG
        /*
            foreach ($result as $i => $value) {
                $result[$i] = array_merge($result[$i], json_decode($value['translate'], true));
                unset($result[$i]['translate']);
            }
        */

        return $result;
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select ->from(array('b' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        $select->where->equalTo('b.id', $params['id']);
        $select->where->equalTo('b.display', 1);
        $select->limit(1)->offset(0);

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('b.id = l.item_id AND l.display = 1 AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        $result = $this->selectWith($select)->toArray()[0];

        // Nếu có ngôn ngữ LANG
        /*
            $result = array_merge($result, json_decode($result['translate'], true));
            unset($result['translate']);
        */

        return $result;
    }
}