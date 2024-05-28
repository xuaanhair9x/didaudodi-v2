<?php

namespace Frontend\Model;

use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class InfoTb extends AbstractTableGateway
{
   	protected $table = 'info_tb';

   	public function __construct()
   	{
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
   	}

   	public function getItem($params = null)
   	{
   		$select = new Select();
	   	$select->from(array('i' => $this->table));

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('i.id = l.item_id AND l.display = 1 AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        $MenuCodeTb = new \Backend\Model\MenuCodeTb();
        preg_match("'id=(.*?)/'si", $MenuCodeTb->getItem(array('id' => 36, 'columns' => array('link')))['link'], $branch);
        $select->where->equalTo('i.id', $branch[1]);
        $select->limit(1)->offset(0);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('embed','multi_image','multi_input','multi_detail','multi_file') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        if ($result['headline']) {
            $result['headline'] = json_decode($result['headline'], true);
            $result['headline'] = array_combine($result['headline']['slug'], $result['headline'][LANG]);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $result['translate'] = json_decode($result['translate'], true);
            $result['translate']['multi_input'] = array_merge(
                $result['multi_input'] ? $result['multi_input'] : array(),
                $result['translate']['multi_input'] ? $result['translate']['multi_input'] : array()
            );
            // $result['translate']['multi_detail'] = array_merge(
            //     $result['multi_detail'] ? $result['multi_detail'] : array(),
            //     $result['translate']['multi_detail'] ? $result['translate']['multi_detail'] : array()
            // );
            $result = array_merge($result, $result['translate']);
            unset($result['translate']);
        */

   		return $result;
   	}
}