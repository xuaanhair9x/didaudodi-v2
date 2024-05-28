<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

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
        $select ->from(array('plabel' => $this->table));

        if (isset($params['product_cat_id'])) {
            $select->join(
                array('pcat' => 'product_cat_tb'),
                new Expression('pcat.list_label_id LIKE CONCAT("%:", plabel.id, ":%")'),
                array('product_cat_id' => new Expression('GROUP_CONCAT(pcat.id ORDER BY pcat.level, pcat.id)')),
                'left'
            );
            $select->group('plabel.id');
        }
        if (isset($params['display'])) {
            $select->where->equalTo('plabel.display', $params['display']);
        }
        if (isset($params['list_id']) && isset($params['status'])) {
            $select->where->nest()
                            ->equalTo('plabel.status', $params['status'])->or->in('plabel.id', $params['list_id'])
                            ->unnest;
        } else if (isset($params['list_id'])) {
            $select->where->in('plabel.id', $params['list_id']);
        } else if (isset($params['status'])) {
            $select->where->equalTo('plabel.status', $params['status']);
        }
        $authService = new \Zend\Authentication\AuthenticationService();
        if ($authService->getIdentity()->lang) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('plabel.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('plabel.id');
        }

        $select->order(new Expression('CASE WHEN plabel.sort IS NULL THEN 1 ELSE 0 END, plabel.sort ASC, plabel.id ASC'));
        $result = $this->selectWith($select)->toArray();
        if ($params['display_lang']) {
            return array_reduce($result, function($arr = array(), $item) use ($params) {
                if (empty($item['l.display']) || array_filter(explode('#@#', $item['l.display']))) {
                    $arr[] = $item;
                }
                return $arr;
            });
        }

        return $result;
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
        foreach (array('special','multi_input','multi_detail','multi_image','multi_file') as $name) {
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
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['desc_short'])) {
            $data['desc_short'] = $params['post']['desc_short'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
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
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['list_news_id'])) {
            $data['list_news_id'] = ($params['post']['list_news_id']) ? ':'.implode(':,:', $params['post']['list_news_id']).':' : null;
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
        foreach (array('multi_input','multi_detail','multi_image','multi_file') as $name) {
            if (isset($params['post'][$name])) {
                if ($config[$name] && in_array($name, array('multi_input', 'multi_image'))) {
                    \Backend\View\Helper\Sort::multiData($params['post'][$name], $config[$name]);
                }
                $data[$name] = \Backend\View\Helper\RemoveElementArray::repeater($params['post'][$name], $name);
            }
        }
        if ($data) {
            if ($params['id']) {
                $this->update($data,'id = '.$params['id']);
                $increment = $params['id'];
            } else {
                $this->insert($data);
                $increment = $this->getLastInsertValue();
            }
        }

        return $increment;
    }
}