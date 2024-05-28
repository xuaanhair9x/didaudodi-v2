<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class NewsTb extends AbstractTableGateway
{
    protected $table = 'news_tb';

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
        $select->from($this->table);

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('embed','special','select','multi_input','multi_detail','multi_image','multi_file') as $name) {
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
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['keyword'])) {
            $data['keyword'] = $params['post']['keyword'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['list_select_id'])) {
            $params['post']['list_select_id'] = array_filter($params['post']['list_select_id']);
            $data['list_select_id'] = ($params['post']['list_select_id']) ? ':'.implode(':,:', $params['post']['list_select_id']).':' : null;
        }
        if (isset($params['post']['list_label_id'])) {
            $data['list_label_id'] = ($params['post']['list_label_id']) ? ':'.implode(':,:', $params['post']['list_label_id']).':' : null;
        }
        if (isset($params['post']['list_news_id'])) {
            $data['list_news_id'] = ($params['post']['list_news_id']) ? ':'.implode(':,:', $params['post']['list_news_id']).':' : null;
        }
        if (isset($params['post']['list_product_id'])) {
            $data['list_product_id'] = ($params['post']['list_product_id']) ? ':'.implode(':,:', $params['post']['list_product_id']).':' : null;
        }
        if (isset($params['post']['list_tag_id'])) {
            $data['list_tag_id'] = ($params['post']['list_tag_id']) ? ':'.implode(':,:', $params['post']['list_tag_id']).':' : null;
        }
        if (isset($params['post']['list_section_id'])) {
            $params['post']['list_section_id'] = array_filter($params['post']['list_section_id']);
            $data['list_section_id'] = $params['post']['list_section_id'] ? ':'.implode(':,:', $params['post']['list_section_id']).':' : null;
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['date_up'])) {
            $data['date_up'] = date('Y-m-d H:i:s', time());
        }
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
            if ($data['status'] == 1 && empty($params['post']['date_published'])) {
                $params['post']['date_published'] = date('d-m-Y H:i:s');
            }
        }
        if (isset($params['post']['date_published']) && !empty($params['post']['date_published'])) {
            $data['date_published'] = date('Y-m-d H:i:s', strtotime($params['post']['date_published']));
        }
        if (isset($params['post']['embed'])) {
            array_shift($params['post']['embed']);
            foreach ($params['post']['embed'] as $i => $value) {
                $params['post']['embed'][$i]['embed'] = htmlspecialchars($params['post']['embed'][$i]['embed']);
            }
            $data['embed'] = $params['post']['embed'] ? json_encode($params['post']['embed'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) : null;
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
        if (isset($params['post']['select'])) {
            $data['select'] = json_encode($params['post']['select'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

            $listSelectIds = array();
            foreach ($params['post']['select'] as $value) {
                foreach (array_values($value) as $id) {
                    if (empty($id)) continue;
                    if (is_array($id)) {
                        $listSelectIds = array_merge($listSelectIds, $id);
                    } else {
                        $listSelectIds[] = $id;
                    }
                }

            }
            $data['list_select_id'] = empty($listSelectIds) ? null : ':'.implode(':,:', $listSelectIds).':';
        }

        foreach (array('multi_input','multi_detail','multi_image','multi_file') as $name) {
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
            if (!isset($params['post']['status'])) {
                $data['date_published'] = $data['date_published'] ? $data['date_published'] : date('Y-m-d H:i:s');
            }
            $data['date_created'] = date('Y-m-d H:i:s', time());
            $data['user_created'] = $authService->getIdentity()->supper ? 'admin' : $authService->getIdentity()->username;
            $this->insert($data);
            $increment = $this->getLastInsertValue();
        }

        /* if ($params['id']) {
            if (empty($authService->getIdentity()->supper)) {
                if (!isset($params['post']['special']) && !isset($params['post']['display']))  {
                    $data['date_updated'] = date('Y-m-d H:i:s', time());
                }

                $data['user_updated'] = $authService->getIdentity()->username;
            }

            if(!empty($params['post']['multi_input']['date'])) {
                $data['date_published'] = date('Y-m-d H:i:s', strtotime($params['post']['multi_input']['date']));
            }

            $this->update($data,'id = '.$params['id']);
            $increment = $params['id'];
        } else {
            if (!isset($params['post']['status'])) {
                if(!empty($params['post']['multi_input']['date'])) {
                    $data['date_published'] = date('Y-m-d H:i:s', strtotime($params['post']['multi_input']['date']));
                } else {
                    $data['date_published'] = $data['date_published'] ? $data['date_published'] : date('Y-m-d H:i:s');
                }
            }
            $data['date_created'] = date('Y-m-d H:i:s', time());
            $data['user_created'] = $authService->getIdentity()->supper ? 'admin' : $authService->getIdentity()->username;
            $this->insert($data);
            $increment = $this->getLastInsertValue();
        } */

        return $increment;
    }

    private function buildQuery($params)
    {
        $select = new Select();
        $select ->from(array('n' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['root_id'])) {
            $select->join(
                array('multi' => new Expression("(SELECT id,parent,level FROM (SELECT id,parent,level FROM news_cat_tb) multi, (SELECT @multi:= '".$params['root_id']."') initialisation WHERE (find_in_set(parent, @multi) > 0 AND  @multi:= concat(@multi, ',', id)) OR id = ".$params['root_id'].")")),
                'n.cat_id = multi.id',
                array('cat_id' => 'id')
            );
        }
        if ($params['joinCate']) {
            $select->join(
                array('nc' => 'news_cat_tb'),
                'n.cat_id = nc.id',
                array('cat_name' => 'name','cat_slug' => 'slug')
            );
        }
        if ($params['search']) {
            foreach ($params['search'] as $value) {
                $nest = $select->where->nest();
                foreach ($value['columns'] as $column) {
                    if ($value['notLike']) {
                        $nest->or->notLike('n.'.$column, '%'.$value['keysearch'].'%')->or->isNull('n.'.$column);
                    } else {
                        $nest->or->like('n.'.$column, '%'.$value['keysearch'].'%');
                    }
                }
                $nest->unnest;
            }
        }
        if(isset($params['cat_id'])){
            $select->where->equalTo('n.cat_id', $params['cat_id']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('n.parent', $params['parent']);
        }
        if (isset($params['list_id']) && !empty(array_filter($params['list_id']))) {
            $select->where->in('n.id', $params['list_id']);
        }
        if (isset($params['deny_id']) && !empty(array_filter($params['deny_id']))) {
            $select->where->notIn('n.id', $params['deny_id']);
        }
        if (isset($params['slug'])) {
            $select->where->equalTo('n.slug', $params['slug']);
        }
        if (isset($params['menu_code_id'])) {
            $select->where->equalTo('n.menu_code_id', $params['menu_code_id']);
        }
        if (isset($params['user_created']) && !empty($params['user_created'])) {
            $select->where->equalTo('n.user_created', $params['user_created']);
        }
        if (isset($params['status'])) {
            if (is_array($params['status'])) {
                // $select->where->in('n.status', $params['status']);
                $authService = new \Zend\Authentication\AuthenticationService();
                $select->where
                        ->nest()
                            ->in('n.status', $params['status'])
                            ->or
                            ->equalTo('n.status', -2)
                            ->equalTo('n.user_created', $authService->getIdentity()->username)
                        ->unnest;
            } else {
                switch ($params['status']) {
                    case '1':
                        $select->where->equalTo('n.status', 1);
                        $select->where->lessThanOrEqualTo('n.date_published', date('Y-m-d H:i:s', time()));
                    break;
                    case 'schedule':
                        $select->where->equalTo('n.status', 1);
                        $select->where->greaterThan('n.date_published', date('Y-m-d H:i:s', time()));
                    break;
                    default:
                        $select->where->equalTo('n.status', $params['status']);
                    break;
                }
            }
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('n.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('n.id');
        }

        if (isset($params['limit']) && $params['limit'] > 0) {
            $select->limit($params['limit'])->offset(isset($params['offset']) ? $params['offset'] : 0);
        }

        $select->order(new Expression($params['orderby'] ? ((array_search('sort asc',$params['orderby']) > -1) ? 'CASE WHEN n.sort IS NULL THEN 1 ELSE 0 END, ' : '').'n.'.implode(', n.', $params['orderby']) : 'n.date_up DESC, n.id DESC'));

        return $select;
    }
}