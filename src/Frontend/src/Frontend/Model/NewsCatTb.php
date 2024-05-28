<?php

namespace Frontend\Model;

use Frontend\Model\NewsTb;
use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class NewsCatTb extends AbstractTableGateway
{
    protected $table = 'news_cat_tb';

    public function __construct ()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('nc' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        if (isset($params['root_id'])) {
            $select->join(
                array('multi' => new Expression("(SELECT id,parent,level FROM (SELECT id,parent,level FROM ".$this->table.") multi, (SELECT @multi:= '".$params['root_id']."') initialisation WHERE find_in_set(parent, @multi) > 0 AND  @multi:= concat(@multi, ',', id))")),
                'nc.id = multi.id',
                array('parent')
            );
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('nc.id = l.item_id AND l.display = 1 AND l.name <> "" AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
        */

        if (isset($params['parent'])) {
            $select->where->equalTo('nc.parent', $params['parent']);
        }
        if (isset($params['list_id'])) {
           $select->where->In('nc.id', $params['list_id']);
        }
        if (isset($params['deny_id'])) {
            $select->where->notIn('nc.id', $params['deny_id']);
        }
        if (isset($params['special'])) {
            $select->where->like('nc.special', '%'.$params['special'].'%');
        }
        if (isset($params['limit']) && !empty($params['limit'])) {
            $select->limit($params['limit'])->offset(isset($params['offset']) ? $params['offset'] : 0);
        }

        $select->where->equalTo('nc.display', 1);
        $select->order(new Expression('CASE WHEN nc.sort IS NULL THEN 1 ELSE 0 END, nc.sort ASC, nc.id ASC'));

        $result = $this->selectWith($select)->toArray();

        foreach ($result as $i => $value) {
            foreach (array('multi_input','multi_image','multi_detail','multi_file','special') as $name) {
                if ($result[$i][$name]) {
                    $result[$i][$name] = json_decode($result[$i][$name], true);
                }
            }
        }

        // Lấy danh sách tin theo danh mục
        if (isset($params['getList']) || isset($params['countItem']) || LANG != 'default') {
            $NewsTb = new NewsTb();
            foreach ($result as $i => $value) {
                // Nếu có ngôn ngữ LANG
                /*
                    $result[$i] = array_merge($value, json_decode($value['translate'], true));
                    unset($result[$i]['translate']);
                */

                if (isset($params['getList'])) {
                    $result[$i]['child'] = $NewsTb->getList(array_merge($params['getList'],array('root_id' => $value['id'])));
                }
                if (isset($params['countItem'])) {
                    $result[$i]['count'] = count($NewsTb->getList(array('root_id' => $value['id'], 'columns' => array('id','name'))));
                }
            }
        }

        return $result;
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select ->from(array('nc' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('nc.id = l.item_id AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        $select->where->equalTo('nc.id', $params['id']);
        $select->where->equalTo('nc.display', 1);
        $select->limit(1)->offset(0);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('multi_input','multi_image','multi_detail','multi_file') as $name) {
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

    public function getParent($params = null)
    {
        $select = new Select();
        $select->from(array('nc' => $this->table));
        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        $select->join(
            array('parents' => new Expression("(
                SELECT @r AS id, (SELECT @r := parent FROM ".$this->table." WHERE id = @r) AS parent
                FROM (SELECT @r := ".$params['child_id'].") vars, ".$this->table."
                WHERE @r <> 0
            )")),
            'nc.id = parents.id'
        );
        if (isset($params['parent'])) {
            $select->where->equalTo('nc.parent', $params['parent']);
        }
        if (isset($params['level'])) {
            $select->where('nc.level = '. $params['level']);
        }

        return $this->selectWith($select)->toArray()[0];
    }
}