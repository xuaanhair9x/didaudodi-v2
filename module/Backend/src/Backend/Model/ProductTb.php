<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class ProductTb extends AbstractTableGateway
{
    protected $table = 'product_tb';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function countItems($params = null)
    {
        $select = $this->buildQuery($params);
        return $this->selectWith($select)->count();
    }

    public function listItem($params = null)
    {
        if ($params['special']) {
            $notLike = $params['special']['order'] == 'desc';
            $search = array('columns' => array('special'), 'keysearch' => $params['special']['value'], 'notLike' => $notLike);
            $select1 = $this->buildQuery(array_merge($params, array('search' => array_merge($params['search'] ?? array(), array($search)))));
            $search = array('columns' => array('special'), 'keysearch' => $params['special']['value'], 'notLike' => !$notLike);
            $select2 = $this->buildQuery(array_merge($params, array('search' => array_merge($params['search'] ?? array(), array($search)))));
            return array_merge($this->selectWith($select1)->toArray(), $this->selectWith($select2)->toArray());
        } else {
            $select = $this->buildQuery($params);
            return $this->selectWith($select)->toArray();
        }
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from(array('p' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($this->getColumnsAllow($params['columns']));
        }

        $select->where->equalTo('p.id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('special','embed','multi_input','multi_detail','multi_image','multi_file') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        return $result;
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params, $config = array())
    {
        $item = $this->getItem(array('id' => $params['id'] ?? 0, 'columns' => array('special')));

        $filter = new \Zend\Filter\ToNull();
        if (isset($params['post']['cat_id'])) {
            $data['cat_id'] = $filter->filter($params['post']['cat_id']);
        }
        if (isset($params['post']['menu_code_id'])) {
            $data['menu_code_id'] = $filter->filter($params['post']['menu_code_id']);
        }
        if (isset($params['post']['parent'])) {
            $data['parent'] = $filter->filter($params['post']['parent']);
        }
        if (isset($params['post']['sort'])) {
            $data['sort'] = $filter->filter($params['post']['sort']);
        }
        if (isset($params['post']['brand_id'])) {
            $data['brand_id'] = $filter->filter($params['post']['brand_id']);
        }
        if (isset($params['post']['sku'])) {
            $data['sku'] = $params['post']['sku'];
        }
        if (isset($params['post']['name'])) {
            $data['name'] = $params['post']['name'];
            $ToSlug = new ToSlug();
            $data['slug'] = $ToSlug($data['name']);
            if (!empty($params['post']['slug'])) {
                $data['slug'] = $ToSlug($params['post']['slug']);
            }
        }
        if (isset($params['post']['title'])) {
            $data['title'] = $params['post']['title'];
        }
        if (isset($params['post']['description'])) {
            $data['description'] = $params['post']['description'];
        }
        if (isset($params['post']['keyword'])) {
            $data['keyword'] = $params['post']['keyword'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['price_market'])) {
            $re = $config['unit'] == 'dollar' ? '/[^0-9.]/' : '/[^0-9]/';
            $data['price_market'] = preg_replace($re, '', $params['post']['price_market'] ? $params['post']['price_market'] : 0);
            if (!isset($params['post']['price_discount'])) {
                $data['price_discount'] = 0;
                $data['price_percent'] = 0;
            }
        }
        if (isset($params['post']['price_discount'])) {
            $re = $config['unit'] == 'dollar' ? '/[^0-9.]/' : '/[^0-9]/';
            $data['price_discount'] = preg_replace($re, '', $params['post']['price_discount'] ? $params['post']['price_discount'] : 0);
        }
        if (isset($params['post']['price_percent'])) {
            $data['price_percent'] = $params['post']['price_percent'] ? $params['post']['price_percent'] : 0;
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['date_up'])) {
            $data['date_up'] = date('Y-m-d H:i:s', time());
        }
        if (isset($params['post']['todo_date'])) {
            $data['todo_date'] = $params['post']['todo_date'] ? date('Y-m-d H:i:s', strtotime($params['post']['todo_date'])) : null;
        }
        if (isset($params['post']['list_select_id'])) {
            $params['post']['list_select_id'] = array_filter($params['post']['list_select_id']);
            $data['list_select_id'] = ($params['post']['list_select_id']) ? ':'.implode(':,:', $params['post']['list_select_id']).':' : null;
        }
        if (isset($params['post']['list_label_id'])) {
            $data['list_label_id'] = ($params['post']['list_label_id']) ? ':'.implode(':,:', $params['post']['list_label_id']).':' : null;
        }
        if (isset($params['post']['list_product_id'])) {
            $data['list_product_id'] = ($params['post']['list_product_id']) ? ':'.implode(':,:', $params['post']['list_product_id']).':' : null;
        }
        if (isset($params['post']['list_news_id'])) {
            $data['list_news_id'] = ($params['post']['list_news_id']) ? ':'.implode(':,:', $params['post']['list_news_id']).':' : null;
        }
        if (isset($params['post']['list_cat_id'])) {
            $data['list_cat_id'] = ($params['post']['list_cat_id']) ? ':'.implode(':,:', $params['post']['list_cat_id']).':' : null;
        }
        if (isset($params['post']['list_tag_id'])) {
            $data['list_tag_id'] = ($params['post']['list_tag_id']) ? ':'.implode(':,:', $params['post']['list_tag_id']).':' : null;
        }
        if (isset($params['post']['list_section_id'])) {
            $params['post']['list_section_id'] = array_filter($params['post']['list_section_id']);
            $data['list_section_id'] = $params['post']['list_section_id'] ? ':'.implode(':,:', $params['post']['list_section_id']).':' : null;
        }
        if (isset($params['post']['special'])) {
            $data['special'] = array_merge($item['special'] ?? array(), $params['post']['special'] ?? array());
            if ($data['special']) {
                $special = $data['special'];
                $data['special'] = array_reduce(array_keys($special), function($acc = array(), $key) use ($special) {
                    if ($special[$key] != 0) {
                        $acc[$key] = $special[$key];
                    }
                    return $acc;
                });
            }

            $data['special'] = empty($data['special']) ? null : json_encode($data['special']);
        }
        if (isset($params['post']['embed'])) {
            array_shift($params['post']['embed']);
            foreach ($params['post']['embed'] as $i => $value) {
                $params['post']['embed'][$i]['embed'] = htmlspecialchars($params['post']['embed'][$i]['embed']);
            }
            $data['embed'] = $params['post']['embed'] ? json_encode($params['post']['embed'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) : null;
        }
        foreach (array('multi_input','multi_detail','multi_image','multi_file','list_combo_item') as $name) {
            if (isset($params['post'][$name])) {
                if ($config[$name] && in_array($name, array('multi_input', 'multi_image'))) {
                    \Backend\View\Helper\Sort::multiData($params['post'][$name], $config[$name]);
                }
                $data[$name] = \Backend\View\Helper\RemoveElementArray::repeater($params['post'][$name], $name);
            }
        }

        $authService = new \Zend\Authentication\AuthenticationService();
        if ($params['id']) {
            if (empty($authService->getIdentity()->supper)) {
                if (!isset($params['post']['special']) && !isset($params['post']['display']))  {
                    $data['date_updated'] = date('Y-m-d H:i:s', time());
                }
                $data['user_updated'] = $authService->getIdentity()->username;
            }
            $this->update($data,'id = '.$params['id']);
            $increment = $params['id'];
        } else {
            $data['date_created'] = $data['date_up'] = date('Y-m-d H:i:s', time());
            $data['user_created'] = $authService->getIdentity()->supper ? 'admin' : $authService->getIdentity()->username;
            $this->insert($data);
            $increment = $this->getLastInsertValue();
        }

        return $increment;
    }

    protected function getColumnsAllow($columns)
    {
        $ignoreColumns = array('unit');
        return array_filter($columns, function($column) use ($ignoreColumns) {
            return !in_array($column, $ignoreColumns);
        }, ARRAY_FILTER_USE_BOTH);
    }

    private function buildQuery($params)
    {
        $select = new Select();
        $select ->from(array('p' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($this->getColumnsAllow($params['columns']));
        }
        if (isset($params['root_id'])) {
            $select->join(
                array('multi' => new Expression("(SELECT id,parent,level FROM (SELECT id,parent,level FROM product_cat_tb) multi, (SELECT @multi:= '".$params['root_id']."') initialisation WHERE (find_in_set(parent, @multi) > 0 AND  @multi:= concat(@multi, ',', id)) OR id = ".$params['root_id'].")")),
                'p.cat_id = multi.id',
                array('cat_id' => 'id')
            );
        }
        if ($params['joinCate']) {
            $select->join(
                array('pc' => 'product_cat_tb'),
                'p.cat_id = pc.id',
                array('cat_name' => 'name','cat_slug' => 'slug'),
                'left'
            );
        }
        if ($params['joinBrand']) {
            $select->join(
                array('pb' => 'product_brand_tb'),
                'p.brand_id = pb.id',
                array('brand_name' => 'name','brand_slug' => 'slug'),
                'left'
            );
        }
        if ($params['search']) {
            foreach ($params['search'] as $value) {
                $nest = $select->where->nest();
                foreach ($value['columns'] as $column) {
                    if ($value['notLike']) {
                        $nest->or->notLike('p.'.$column, '%'.$value['keysearch'].'%')->or->isNull('p.'.$column);
                    } else {
                        $nest->or->like('p.'.$column, '%'.$value['keysearch'].'%');
                    }
                }
                $nest->unnest;
            }
        }
        if (isset($params['cat_id'])) {
            $select->where->equalTo('p.cat_id', $params['cat_id']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('p.parent', $params['parent']);
        }
        if (isset($params['brand_id'])) {
            $select->where->equalTo('p.brand_id', $params['brand_id']);
        }
        if (isset($params['menu_code_id'])) {
            $select->where->equalTo('p.menu_code_id', $params['menu_code_id']);
        }
        if (isset($params['user_created']) && !empty($params['user_created'])) {
            $select->where->equalTo('p.user_created', $params['user_created']);
        }
        if (isset($params['list_id']) && !empty(array_filter($params['list_id']))) {
            $select->where->in('p.id', $params['list_id']);
        }
        if (isset($params['deny_id']) && !empty(array_filter($params['deny_id']))) {
            $select->where->notIn('p.id', $params['deny_id']);
        }
        if (isset($params['slug'])) {
            $select->where->equalTo('p.slug', $params['slug']);
        }
        if (isset($params['sku'])) {
            $select->where->equalTo('p.sku', $params['sku']);
        }
        if (isset($params['list_cat_id'])) {
            $select->where->like('p.list_cat_id', '%:'.$params['list_cat_id'].':%');
        }
        if (isset($params['list_label_id'])) {
            $select->where->like('p.list_label_id', '%:'.$params['list_label_id'].':%');
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('p.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('p.id');
        }

        $orderby = '';
        if ($params['orderby']) {
            if (array_search('sort asc',$params['orderby']) > -1) {
                $orderby = 'CASE WHEN p.sort IS NULL THEN 1 ELSE 0 END, ';
            } else if (array_search('price_market asc',$params['orderby']) > -1) {
                $orderby = 'CASE WHEN p.price_market = 0 THEN 1 ELSE 0 END, ';
            } else if (array_search('price_discount asc',$params['orderby']) > -1) {
                $orderby = 'CASE WHEN p.price_discount = 0 THEN 1 ELSE 0 END, ';
            } else if (array_search('sku asc',$params['orderby']) > -1) {
                $orderby = 'CASE WHEN p.sku IS NULL or p.sku = "" THEN 1 ELSE 0 END, ';
            }
        }

        if (isset($params['limit']) && $params['limit'] > 0) {
            $select->limit($params['limit'])->offset(isset($params['offset']) ? $params['offset'] : 0);
        }

        $select->order(new Expression($params['orderby'] ? $orderby.'p.'.implode(', p.', $params['orderby']) : 'p.date_up DESC, p.id DESC'));

        return $select;
    }
}