<?php

namespace Frontend\Model;

use Frontend\Model\ProductCatTb;
use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class ProductTb extends AbstractTableGateway
{
    protected $table = 'product_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function getList($params = null)
    {
        $select = new Select();
        $select->from(array('p' => $this->table));

        if (isset($params['columns'])) {
            $select->columns(array_merge(
                array_unique(array_merge($params['columns'], array('sort','date_up','id','cat_id'))),
                array('price' => new Expression('CASE WHEN p.price_discount > 0 THEN p.price_discount ELSE p.price_market END'))
            ));
        }

        // Lấy danh sách tin nhiều cấp
        if (isset($params['root_id'])) {
            $select->join(
                array('multi' => new Expression("(SELECT id,parent,level FROM (SELECT id,parent,level FROM product_cat_tb) multi, (SELECT @multi:= '".$params['root_id']."') initialisation WHERE (find_in_set(parent, @multi) > 0 AND  @multi:= concat(@multi, ',', id)) OR (id = ".$params['root_id']." AND parent > 0))")),
                'p.cat_id = multi.id',
                array('cat_id' => 'id')
            );
        }

        // Lấy danh sách thương hiệu

            if (isset($params['getBrand'])) {
                $select->join(
                    array('b' => 'product_brand_tb'),
                    'p.brand_id = b.id',
                    array('brand_name' => 'name', 'brand_slug' => 'slug'),
                    'left'
                );
            }

        // Lấy danh sách danh mục
        // if(!isset($params['list_product_id'])) {
        //     $select->join(
        //         array('pc' => 'product_cat_tb'),
        //         'p.cat_id = pc.id',
        //         array('cat-id' => 'id','cat-name' => 'name','cat-slug' => 'slug','cat-level' => 'level')
        //     );
        // }


        // Nếu không có ngôn ngữ LANG
        if (isset($params['keysearch'])) {
            $select->where->nest()
                            ->or->like('p.name', '%'.$params['keysearch'].'%')
                            ->or->like('p.sku', '%'.$params['keysearch'].'%')
                        ->unnest;
        }

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('p.id = l.item_id AND l.display = 1 AND l.name <> "" AND l.type = "'.$this->table.'"'.((empty($params['alllang']) ? ' AND l.language = "'.LANG.'"' : ''))),
                array('translate','language')
            );
            if (isset($params['keysearch'])) {
                $select->where->nest()
                                ->or->like('l.name', '%'.$params['keysearch'].'%')
                                ->or->like('p.sku', '%'.$params['keysearch'].'%')
                            ->unnest;
            }
        */

        if (isset($params['cat_id'])) {
            $select->where->equalTo('p.cat_id', $params['cat_id']);
        }
        if (isset($params['menu_code_id'])) {
            $select->where->equalTo('p.menu_code_id', $params['menu_code_id']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('p.parent', $params['parent']);
        }
        if (isset($params['list_id'])){
           $select->where->In('p.id', $params['list_id']);
        }
        if (isset($params['deny_id'])){
            $select->where->notIn('p.id', $params['deny_id']);
        }
        if (isset($params['list_cat_id'])) {
            $select->where->like('list_cat_id', '%:'.$params['list_cat_id'].':%');
        }
        if (isset($params['list_label_id'])) {
            $select->where->like('list_label_id', '%:'.$params['list_label_id'].':%');
        }
        if (isset($params['list_product_id'])) {
            $select->where->like('list_product_id', '%:'.$params['list_product_id'].':%');
        }
        // if (isset($params['list_select_id'])) {
        //     if (is_array($params['list_select_id'])) {
        //         $nest = $select->where->nest();
        //         foreach ($params['list_select_id'] as $select_id) {
        //             $nest->or->like('list_select_id', '%:'.$select_id.':%');
        //         }
        //         $nest->unnest;
        //     } else {
        //         $select->where->like('list_select_id', '%:'.$params['list_select_id'].':%');
        //     }
        // }

        if (isset($params['filter_select'])) {
            $parents = array_keys($params['filter_select']);
            foreach ($parents as $slug) {
                $nest = $select->where->nest();
                foreach ($params['filter_select'][$slug] as $id) {
                    $nest->or->like('list_select_id', '%:'.$id.':%');
                }
                $nest->unnest;
            }
            // echo $select->getSqlString($this->getAdapter()->getPlatform()).'<br>';
        } else if (isset($params['list_select_id'])) {
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

        if (isset($params['brand_id'])) {
            if (is_array($params['brand_id'])) {
                $select->where->In('brand_id', $params['brand_id']);
            } else {
                $select->where->equalTo('brand_id', $params['brand_id']);
            }
        }
        if (isset($params['filter_price']) && !empty($params['filter_price'])) {
            $params['filter_price'] = explode(',', $params['filter_price']);
            if (count($params['filter_price']) == 2) {
                $select->having('price BETWEEN ' . $params['filter_price'][0] . ' AND ' . $params['filter_price'][1]);
            } else {
                $select->having('price > ' . $params['filter_price'][0]);
            }
        }
        if (isset($params['filter_sale']) && $params['filter_sale'] != 0) {
            if ($params['filter_sale'] == 1) {
                $select->where->greaterThan('price_discount', 0);
            } else {
                $select->where->equalTo('price_discount', 0);
            }
        }
        if (isset($params['special'])) {
            $select->where->like('p.special', '%'.$params['special'].'%');
        }
        if (isset($params['denySpecial'])) {
            $nest = $select->where->nest();
            $nest->or->notLike('p.special', '%'.$params['denySpecial'].'%');
            $nest->or->isNull('p.special');
            $nest->or->equalTo('p.special', '');
            $nest->unnest;
        }
        if (isset($params['limit']) && !empty($params['limit'])) {
            $select->limit($params['limit'])->offset(isset($params['offset']) ? $params['offset'] : 0);
        }
        $select->where->equalTo('p.display', 1);
        $select->order(new Expression((isset($params['orderby']) ? 'CASE WHEN p.sort IS NULL THEN 1 ELSE 0 END, '.implode(', ', $params['orderby']) : 'CASE WHEN p.sort IS NULL THEN 1 ELSE 0 END, sort ASC, date_up DESC, id DESC')));

        // Trả về kết quả
        $result = $this->selectWith($select)->toArray();

        $ProductCatTb = new ProductCatTb();
        foreach ($result as $i => $value) {
            foreach (array('multi_input','multi_image','multi_detail','multi_file','special','list_combo_item') as $name) {
                if ($result[$i][$name]) {
                    $result[$i][$name] = json_decode($result[$i][$name], true);
                    if($name == 'list_combo_item') {
                        $listItem = array();
                        if($result[$i]['list_combo_item']) {
                            foreach ($result[$i]['list_combo_item'] as $item) {
                                $listItem[] = $this->getItem(array('id' => $item['id'], 'columns' => array('id','name','slug','thumbnail','price_market','price_discount','cat_id')));
                            }
                            $result[$i]['listItem'] = $listItem;
                        } else {
                            unset($result[$i]);
                        }
                    }
                }
            }

            if($result[$i]['cat_id']) {
                $catItem = $ProductCatTb->getParent(array('level' => 1, 'child_id' => $result[$i]['cat_id'], 'columns' => array('id','parent','name','slug')));
                $result[$i]['rootSlug'] = $catItem['slug'];
            }

            if (isset($params['deny_special']) && isset($result[$i]['special'][$params['deny_special']])) {
                unset($result[$i]);
            }
        }

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

        return array_values($result);
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from(array('p' => $this->table));

        $select->columns(array_merge(
            $params['columns'] ? array_unique(array_merge($params['columns'], array('cat_id'))) : array('*'),
            array('price' => new Expression('CASE WHEN p.price_discount > 0 THEN p.price_discount ELSE p.price_market END'))
        ));

        // Nếu có ngôn ngữ LANG
        /*
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('p.id = l.item_id AND l.type = "'.$this->table.'" AND l.language = "'.LANG.'"'),
                array('translate','language')
            );
        */

        // Lấy danh sách thương hiệu

            $select->join(
                array('b' => 'product_brand_tb'),
                'p.brand_id = b.id',
                array('brand_name' => 'name', 'brand_slug' => 'slug'),
                'left'
            );

        // Lấy danh sách danh mục

            // $select->join(
            //     array('pc' => 'product_cat_tb'),
            //     'p.cat_id = pc.id',
            //     array('cat-id' => 'id','cat-name' => 'name','cat-slug' => 'slug','cat-level' => 'level')
            // );

        $select->where->equalTo('p.id', $params['id']);
        $select->where->equalTo('p.display', 1);
        $select->limit(1)->offset(0);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('multi_input','multi_image','multi_detail','multi_file','list_combo_item') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        if($result['cat_id']) {
            $ProductCatTb = new ProductCatTb();
            $catItem = $ProductCatTb->getParent(array('level' => 1, 'child_id' => $result['cat_id'], 'columns' => array('id','parent','name','slug')));
            $result['rootSlug'] = $catItem['slug'];
        }

        if (isset($params['sub'])) {
            $result['sub'] = $this->getList(array('parent' => $result['id'], 'columns' => array('id','name','sku','desc_short','thumbnail','multi_input'), 'orderby' => array('sort ASC','id ASC')));
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

    public function getParent($params = null)
    {
        $select = new Select();
        $select->from(array('pc' => $this->table));
        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        $select->join(
            array('parents' => new Expression("(
                SELECT @r AS id, (SELECT @r := parent FROM ".$this->table." WHERE id = @r) AS parent
                FROM (SELECT @r := ".$params['child_id'].") vars, ".$this->table."
                WHERE @r <> 0
            )")),
            'pc.id = parents.id'
        );
        if (isset($params['parent'])) {
            $select->where->equalTo('pc.parent', $params['parent']);
        }
        if (isset($params['level'])) {
            $select->where('pc.level '. $params['level']);
        }

        return $this->selectWith($select)->toArray()[0];
    }

    public function listRelated($params = null)
    {
        $select = new Select();
        $select->from('product_tag_tb')
            ->columns(array('list_product_id'))
            ->where->in('id', $params['list_tag_id'])->equalTo('display', 1);
        $ids = array();
        foreach ($this->selectWith($select)->toArray() as $value) {
            $ids = array_unique(array_merge($ids, explode(',', str_replace(':','', $value['list_product_id']))));
        }

        return ($ids) ? $this->getList(array('list_id' => $ids, 'columns' => $params['columns'])) : false;
    }

    public function change($params = null)
    {
        if ($params['post']['view']) {
            $data['view'] = $params['post']['view'] + 1;
        }
        $this->update($data, 'id = ' . $params['id']);
    }
}