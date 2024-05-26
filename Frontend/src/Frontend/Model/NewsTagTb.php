<?php

namespace Frontend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class NewsTagTb extends AbstractTableGateway
{
    protected $table = 'news_tag_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('nt' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('nt.id = l.item_id AND l.display = 1 AND l.name <> "" AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
        */


        if (isset($params['list_news_id'])) {
            $select->where->like('nt.list_news_id', '%:'.$params['list_news_id'].':%');
        }

        $select->where->equalTo('nt.display', 1);
        $select->order(new Expression('CASE WHEN nt.sort IS NULL THEN 1 ELSE 0 END, nt.sort ASC, nt.id ASC'));

        $result = $this->selectWith($select)->toArray();

        foreach ($result as $i => $value) {
            foreach (array('multi_input','multi_image','multi_detail','multi_file') as $name) {
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
   		$select->from(array('nt' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('nt.id = l.item_id AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

   		$select->where->equalTo('id', $params['id']);
        $select->where->equalTo('nt.display', 1);
        $select->limit(1)->offset(0);

   		$result = $this->selectWith($select)->toArray()[0];

        foreach (array('multi_input','multi_image','multi_detail','multi_file') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        // Nếu có ngôn ngữ LANG
        /*
            $result = array_merge($result, json_decode($result['translate'], true);
            unset($result['translate']);
        */

   		return $result ?? array();
    }
}