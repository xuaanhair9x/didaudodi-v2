<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class NewsSelectTb extends AbstractTableGateway
{
    protected $table = 'news_select_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('s' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['menu_code_id'])) {
            $select->where->equalTo('s.menu_code_id', $params['menu_code_id']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('s.parent', $params['parent']);
        }
        if (isset($params['name'])) {
            $select->where->equalTo('s.name', $params['name']);
        }
        if (isset($params['child'])) {
            $select->where->greaterThan('s.parent', 0);
        }
        if (isset($params['level'])) {
            $select->where('s.level '. $params['level']);
        }
        if (isset($params['list_id']) && !empty(array_filter($params['list_id']))) {
            $select->where->in('s.id', $params['list_id']);
        }
        if (isset($params['deny_id']) && !empty(array_filter($params['deny_id']))) {
            $select->where->notIn('s.id', $params['deny_id']);
        }
        if (isset($params['display'])) {
            $select->where->equalTo('s.display', $params['display']);
        }
        if (isset($params['list_news_cat_id'])) {
            $select->where->like('s.list_news_cat_id', '%:'.$params['list_news_cat_id'].':%');
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('s.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('s.id');
        }

        $select->order(new Expression('CASE WHEN s.sort IS NULL THEN 1 ELSE 0 END, s.sort ASC'));
        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        $select->where->equalTo('id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];
        foreach (array('multi_input','multi_detail','multi_image','multi_file') as $name) {
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
        $filter = new \Zend\Filter\ToNull();
        if (isset($params['post']['sort'])) {
            $data['sort'] = $filter->filter($params['post']['sort']);
        }
        if (isset($params['post']['menu_code_id'])) {
            $data['menu_code_id'] = $params['post']['menu_code_id'];
        }
        if (isset($params['post']['parent'])) {
            $data['parent'] = $params['post']['parent'] ? $params['post']['parent'] : 0;
        }
        if (isset($params['post']['level'])) {
            $data['level'] = $params['post']['level'];
        }
        if (isset($params['post']['type'])) {
            $data['type'] = $params['post']['level'] == 2 ? null : $params['post']['type'];
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
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = $params['post']['thumbnail'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
        }
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['list_news_cat_id'])) {
            $data['list_news_cat_id'] = ($params['post']['list_news_cat_id']) ? ':'.implode(':,:', $params['post']['list_news_cat_id']).':' : null;
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
