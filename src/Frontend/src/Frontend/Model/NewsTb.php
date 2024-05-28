<?php

namespace Frontend\Model;

use Frontend\Model\AdminTb;
use Frontend\Model\NewsCatTb;
use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class NewsTb extends AbstractTableGateway
{
    protected $table = 'news_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function getList($params = null)
    {
        $select = new Select();
        $select->from(array('n' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns(
                array_unique(array_merge($params['columns'], array('cat_id','multi_input')))
            );
        }

        // Lấy danh sách tin nhiều cấp
        if (isset($params['root_id'])) {
            $select->join(
                array('multi' => new Expression("(SELECT id,parent,level FROM (SELECT id,parent,level FROM news_cat_tb) multi, (SELECT @multi:= '".$params['root_id']."') initialisation WHERE (find_in_set(parent, @multi) > 0 AND  @multi:= concat(@multi, ',', id)) OR (id = ".$params['root_id']." AND parent > 0))")),
                'n.cat_id = multi.id',
                array('cat_id' => 'id')
            );
        }

        // Lấy danh sách danh mục

            $select->join(
                array('nc' => 'news_cat_tb'),
                'n.cat_id = nc.id',
                array('cat-id' => 'id','cat-name' => 'name','cat-slug' => 'slug', 'cat-level' => 'level')
            );


        // Nếu không có ngôn ngữ LANG
        if (isset($params['keysearch'])) {
            $select->where->like('n.name', '%'.$params['keysearch'].'%');
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('n.id = l.item_id AND l.display = 1 AND l.name <> "" AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
            if (isset($params['keysearch'])) {
                $select->where->like('l.name', '%'.$params['keysearch'].'%');
            }
        */

        if (isset($params['cat_id'])) {
            if (is_array($params['cat_id'])) {
                $select->where->In('n.cat_id', $params['cat_id']);
            } else {
                $select->where->equalTo('n.cat_id', $params['cat_id']);
            }
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('n.parent', $params['parent']);
        }
        if (isset($params['list_id'])){
           $select->where->In('n.id', $params['list_id']);
        }
        if (isset($params['deny_id'])){
            $select->where->notIn('n.id', $params['deny_id']);
        }
        if (isset($params['list_tag_id'])) {
            $select->where->like('n.list_tag_id', '%'.$params['list_tag_id'].'%');
        }
        if (isset($params['list_select_id'])) {
            if (is_array($params['list_select_id'])) {
                $nest = $select->where->nest();
                foreach ($params['list_select_id'] as $select_id) {
                    $nest->or->like('list_select_id', '%:'.$select_id.':%');
                }
                $nest->unnest;
            } else {
                $select->where->like('list_select_id', '%:'.$params['list_select_id'].':%');
            }
        }
        if (isset($params['list_label_id'])) {
            if (is_array($params['list_label_id'])) {
                $nest = $select->where->nest();
                foreach ($params['list_label_id'] as $select_id) {
                    $nest->or->like('n.list_label_id', '%:'.$select_id.':%');
                }
                $nest->unnest;
            } else {
                $select->where->like('ln.ist_label_id', '%:'.$params['list_label_id'].':%');
            }
        }
        if (isset($params['special'])) {
            $select->where->like('n.special', '%'.$params['special'].'%');
        }
        if (isset($params['date_published'])) {
            $select->where->greaterThanOrEqualTo('n.date_published', $params['date_published']);
        }
        if (isset($params['status'])) {
            $select->where->equalTo('n.status', 1);
        }
        if (isset($params['limit']) && !empty($params['limit'])) {
            $select->limit($params['limit'])->offset(isset($params['offset']) ? $params['offset'] : 0);
        }

        $select->where->equalTo('n.display', 1);
        $select->order(new Expression('CASE WHEN n.sort IS NULL THEN 1 ELSE 0 END, '.(isset($params['orderby']) ? 'n.'.implode(', n.', $params['orderby']) : 'n.sort ASC, n.id DESC')));
        $result = $this->selectWith($select)->toArray();

        $AdminTb = new AdminTb();
        $NewsCatTb = new NewsCatTb();
        foreach ($result as $i => $value) {
            foreach (array('multi_input','multi_image','multi_detail','multi_file') as $name) {
                if ($result[$i][$name]) {
                    $result[$i][$name] = json_decode($result[$i][$name], true);
                }
            }

            $admin = $AdminTb->getItem(array('username' => $result[$i]['user_created'], 'columns' => array('fullname')));

            if(!$admin) {
                $admin = $AdminTb->getItem(array('username' => 'admin', 'columns' => array('fullname')));
            }
            $result[$i]['author'] = $admin['fullname'];
            $result[$i]['avatar'] = $admin['thumbnail'];

            if($result[$i]['cat_id']) {
                $catItem = $NewsCatTb->getParent(array('level' => 1, 'child_id' => $result[$i]['cat_id'], 'columns' => array('id','parent','name','slug')));
                $result[$i]['rootSlug'] = $catItem['slug'];
            }
        }

        // lọc theo điều kiện AND, thêm columns list_select_id
        // if (isset($params['list_select_id'])) {
        //     $prams_select = array_filter($params['list_select_id']);
        //     $countParams = count($prams_select);
        //     foreach ($result as $i => $value) {
        //         $count = 0;
        //         $list_select_id = explode(',', str_replace(':','',$value['list_select_id']));
        //         foreach ($prams_select as $check) {
        //             if(in_array($check, $list_select_id)) {
        //                 $count++;
        //             }
        //         }
        //         if($count != $countParams) {
        //             unset($result[$i]);
        //         }
        //     }
        // }

        // Nếu có ngôn ngữ LANG
        /*
            foreach ($result as $i => $value) {
                $result[$i]['translate'] = json_decode($result[$i]['translate'], true);

                // $result[$i]['translate']['multi_input'] = array_merge(
                //     $result[$i]['multi_input'] ? json_decode($result[$i]['multi_input'], true) : array(),
                //     $result[$i]['translate']['multi_input'] ? $result[$i]['translate']['multi_input'] : array()
                // );

                $result[$i] = array_merge($result[$i], $result[$i]['translate']);
                unset($result[$i]['translate']);
            }
        */

        return $result;
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from(array('n' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns(array_unique(array_merge($params['columns'], array('cat_id'))));
        }

        // Lấy danh sách tin nhiều cấp
        if (isset($params['root_id'])) {
            $select->join(
                array('multi' => new Expression("(SELECT id,parent,level FROM (SELECT id,parent,level FROM news_cat_tb) multi, (SELECT @multi:= '".$params['root_id']."') initialisation WHERE (find_in_set(parent, @multi) > 0 AND  @multi:= concat(@multi, ',', id)) OR (id = ".$params['root_id']." AND parent > 0))")),
                'n.cat_id = multi.id',
                array('cat_id' => 'id')
            );
        }

            $select->join(
                array('nc' => 'news_cat_tb'),
                'n.cat_id = nc.id',
                array('cat-id' => 'id','cat-name' => 'name', 'cat-slug' => 'slug', 'cat-level' => 'level')
            );

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('n.id = l.item_id AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        $select->where->equalTo('n.id', $params['id']);
        $select->where->equalTo('n.display', 1);
        $select->limit(1)->offset(0);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('multi_input','multi_image','multi_detail','multi_file') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        if($result['cat_id']) {
            $NewsCatTb = new NewsCatTb();
            $catItem = $NewsCatTb->getParent(array('level' => 1, 'child_id' => $result['cat_id'], 'columns' => array('id','parent','name','slug')));
            $result['rootSlug'] = $catItem['slug'];
        }

        $AdminTb = new AdminTb();
        $admin = $AdminTb->getItem(array('username' => $result['user_created'], 'columns' => array('fullname')));

        if(!$admin) {
            $admin = $AdminTb->getItem(array('username' => 'admin', 'columns' => array('fullname')));
        }
        $result['author'] = $admin['fullname'];
        $result['avatar'] = $admin['thumbnail'];

        if (isset($params['sub'])) {
            $result['sub'] = $this->getList(array('parent' => $result['id'], 'columns' => array('id','name','desc_short','thumbnail','multi_input'), 'orderby' => array('sort ASC','id ASC')));
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

    public function listRelated($params = null)
    {
        $select = new Select();
        $select->from('news_tag_tb')
            ->columns(array('list_news_id'))
            ->where->in('id', $params['list_tag_id'])->equalTo('display', 1);
        $ids = array();
        foreach ($this->selectWith($select)->toArray() as $value) {
            $ids = array_unique(array_merge($ids, explode(',', str_replace(':','', $value['list_news_id']))));
        }

        return ($ids) ? $this->getList(array('list_id' => $ids, 'columns' => $params['columns'])) : false;
    }

    public function change($params = null)
    {
        $data['view'] = $params['post']['view'] + 1;
        $this->update($data, 'id = ' . $params['id']);
    }
}