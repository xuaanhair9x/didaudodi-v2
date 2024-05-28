<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class ProductTagTb extends AbstractTableGateway
{
    protected $table = 'product_tag_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('ptag' => $this->table));

        if ($params['countProduct']) {
            $select->join(
                array('p' => 'product_tb'),
                new Expression('p.list_tag_id LIKE CONCAT("%:", ptag.id, ":%")'),
                array('list_product_id' => new Expression('GROUP_CONCAT(p.id)')),
                'left'
            );
            $select->group('ptag.id');
        }
        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['list_product_id'])){
            $select->where->like('ptag.list_product_id', '%:'.$params['list_product_id'].':%');
        }
        if (isset($params['display'])) {
            $select->where->equalTo('ptag.display', $params['display']);
        }
        if (!empty($params['language'])) {
            $select->join(
                array('l' => 'lang_multi_tb'),
                new Expression('ptag.id = l.item_id AND (l.type = "" OR l.type = "'.$this->table.'")'),
                array(
                    'l.id' => new Expression('GROUP_CONCAT(l.id SEPARATOR "#@#")'),
                    'l.name' => new Expression('GROUP_CONCAT(l.name SEPARATOR "#@#")'),
                    'l.language' => new Expression('GROUP_CONCAT(l.language SEPARATOR "#@#")'),
                    'l.display' => new Expression('GROUP_CONCAT(l.display SEPARATOR "#@#")')
                ),
                'left'
            )->group('ptag.id');
        }

        $select->order(new Expression('CASE WHEN ptag.sort IS NULL THEN 1 ELSE 0 END, '.(($params['orderby']) ? 'ptag.'.implode(', ptag.', $params['orderby']) : 'ptag.sort ASC, ptag.id DESC')));
        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);

        if (isset($params['id'])) {
            $select->where->equalTo('id', $params['id']);
        }
        if (isset($params['name'])) {
            $select->where->equalTo('name', $params['name']);
        }

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

    public function saveData($params = null)
    {
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
        if (isset($params['post']['display'])) {
            $data['display'] = $params['post']['display'];
        }
        if (isset($params['post']['detail'])) {
            $data['detail'] = $params['post']['detail'];
        }
        if (isset($params['post']['list_product_id'])) {
            $data['list_product_id'] = ($params['post']['list_product_id']) ? ':'.implode(':,:', $params['post']['list_product_id']).':' : null;
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