<?php

namespace Backend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class CommentTb extends AbstractTableGateway
{
    protected $table = 'comment_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select->from(array('c' => $this->table));

        if (isset($params['status']) && $params['status'] != 'all') {
            $select->where->equalTo('c.status', $params['status']);
        }
        if (isset($params['from']) && $params['from']) {
            $select->where->greaterThanOrEqualTo('c.date_created', date('Y-m-d H:i:s',strtotime($params['from'].' 00:00:00')));
        }
        if (isset($params['to']) && $params['to']) {
            $select->where->lessThanOrEqualTo('c.date_created', date('Y-m-d H:i:s',strtotime($params['to'].' 23:59:00')));
        }
        if (isset($params['article_id'])) {
            $select->where->equalTo('c.article_id', $params['article_id']);
        }
        if (isset($params['type'])) {
            $select->where->equalTo('c.type', $params['type']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('c.parent', $params['parent']);
        }

        if (isset($params['getChild'])) {
            $select->join(
                array('u' => new Expression("(
                    (SELECT id,fullname, email,username,thumbnail, 'member_tb' AS type from member_tb)
                    UNION (SELECT id,fullname, email,username,thumbnail, 'admin_tb' AS type from admin_tb)
                )")),
                new Expression('(c.member_id = u.id AND u.type = "member_tb") OR (c.admin_id = u.id AND u.type = "admin_tb")'),
                array('fullname','email','username','thumbnail')
            );
        } else {
            $select->join(array('m' => 'member_tb'), 'c.member_id = m.id', array('fullname','email'));
            $select->join(
                array('a' => new Expression("(
                    (SELECT id, name, slug, 'product_tb' AS type from product_tb)
                    UNION (SELECT id, name, slug, 'news_tb' AS type from news_tb)
                    UNION (SELECT id, name, slug, 'html_tb' AS type from html_tb)
                )")),
                new Expression('c.article_id = a.id AND c.type = a.type'),
                array('article_name' => 'name')
            );
        }

        $select->order(new Expression('CASE WHEN c.status = -1 THEN 2 END, '.(($params['orderby']) ? 'c.'.implode(', c.', $params['orderby']) : 'c.id DESC')));

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from(array('c' => $this->table));
        $select->join(array('m' => 'member_tb'), 'c.member_id = m.id', array('fullname','email'));
        $select->join(
            array('a' => new Expression("(
                (SELECT id, name, slug, cat_id, 'product_tb' AS type from product_tb)
                UNION (SELECT id, name, slug, cat_id, 'news_tb' AS type from news_tb)
                UNION (SELECT id, name, slug, '19' AS cat_id, 'html_tb' AS type from html_tb)
            )")),
            new Expression('c.article_id = a.id AND c.type = a.type'),
            array('article_name' => 'name', 'root_id' => 'cat_id')
        );

        $select->where->equalTo('c.id', $params['id']);

        $result = $this->selectWith($select)->toArray()[0];

        switch ($result['type']) {
            case 'product_tb':
                $ProductCatTb = new ProductCatTb();
                $result['root_id'] = $ProductCatTb->getParent(array(
                    'columns' => array('id','parent'),
                    'child_id' => $result['root_id'],
                    'parent' => 0
                ))['id'];
            break;
            case 'news_tb':
                $NewsCatTb = new NewsCatTb();
                $result['root_id'] = $NewsCatTb->getParent(array(
                    'columns' => array('id','parent'),
                    'child_id' => $result['root_id'],
                    'parent' => 0
                ))['id'];
            break;
        }

        foreach (array('multi_image') as $name) {
            if ($result[$name]) {
                $result[$name] = json_decode($result[$name], true);
            }
        }

        return $result;
    }

    public function deleteItem($params = null)
    {
        if (isset($params['article_id']) && isset($params['type'])) {
            $this->delete(array(
                'article_id = ?' => $params['article_id'],
                'type = ?' => $params['type']
            ));
        }
        if (isset($params['id'])) {
            $this->delete('id = '.$params['id']);
            $this->delete('parent = '.$params['id']);
        }

    }

    public function saveData($params = null)
    {
        $data = array();
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
        } if (isset($params['post']['title'])) {
            $data['title'] = $params['post']['title'];
        } if (isset($params['post']['comment'])) {
            $data['comment'] = $params['post']['comment'];
        }
        if (isset($params['post']['date_updated'])) {
            $data['date_created'] = $params['post']['date_updated'] ? date('Y/m/d H:i:s', strtotime($params['post']['date_updated'])) : time();
        } else {
            $data['date_created'] = date('Y/m/d H:i:s', time());
        }

        if ($params['id']) {
            $this->update($data,'id = '.$params['id']);
        } else {
            $data['status'] = 1;
            $data['type'] = $params['post']['type'];
            $data['parent'] = $params['post']['parent'];
            $data['admin_id'] = $params['post']['admin_id'];
            $data['article_id'] = $params['post']['article_id'];
            $this->insert($data);
        }
    }
}