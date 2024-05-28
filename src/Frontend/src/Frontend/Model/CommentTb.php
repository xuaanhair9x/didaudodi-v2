<?php

namespace Frontend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Sql\Predicate\Expression;

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
        $select_all = new Select();
        $select_all->from(array('c' => $this->table));
        $select_all->where->equalTo('c.status', 1);
        $select_all->where->equalTo('c.article_id', $params['article_id']);
        $select_all->where->equalTo('c.type', $params['type']);
        $select_all->join(
            array('u' => new Expression("(
                (SELECT id,fullname, email,thumbnail, 'member_tb' AS type from member_tb)
                UNION (SELECT id,fullname, email, thumbnail, 'admin_tb' AS type from admin_tb)
            )")),
            new Expression('(c.member_id = u.id AND u.type = "member_tb") OR (c.admin_id = u.id AND u.type = "admin_tb")'),
            array('fullname','email','thumbnail')
        );

        $select_parent = clone($select_all);
        $select_parent->where->equalTo('c.parent', 0);
        if($params['orderby']) {
            $select_parent->order('c.'.$params['orderby']);
        } else {
            $select_parent->order('c.id DESC');
        }

        $select_child = clone($select_all);
        $select_child->where->greaterThan('c.parent', 0);
        $select_child->order('c.id ASC');

        return array_merge($this->selectWith($select_parent)->toArray(), $this->selectWith($select_child)->toArray());
    }

    public function listItemNormal($params = null)
    {
        $select = new Select();
        $select->from(array('c' => $this->table));

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['parent'])) {
            $select->where->equalTo('c.parent', $params['parent']);
        }
        if (isset($params['type'])) {
            $select->where->equalTo('c.type', $params['type']);
        }
        if (isset($params['deny_id'])) {
            $select->where->notIn('c.id', $params['deny_id']);
        }

        $select->join(
            array('u' => new Expression("(
                (SELECT id,fullname, email, 'member_tb' AS type from member_tb)
                UNION (SELECT id,fullname, email, 'admin_tb' AS type from admin_tb)
            )")),
            new Expression('(c.member_id = u.id AND u.type = "member_tb") OR (c.admin_id = u.id AND u.type = "admin_tb")'),
            array('fullname','email')
        );

        $select->where->equalTo('c.status', 1);
        $select->order('c.id DESC');

        return $this->selectWith($select)->toArray();
    }

   	public function saveData($params = null)
   	{
	   	$data = array();

        if (isset($params['post']['parent'])) {
            $data['parent'] = $params['post']['parent'];
        }
        if (isset($params['post']['like'])) {
            $data['like'] = $params['post']['like'];
        }
        if (isset($params['post']['dislike'])) {
            $data['dislike'] = $params['post']['dislike'];
        }
        if (isset($params['post']['star'])) {
            $data['star'] = $params['post']['star'] > 5 ? 5 : $params['post']['star'];
        }
        if (isset($params['post']['advertise'])) {
            $data['advertise'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['advertise']);
        }
        if (isset($params['post']['used'])) {
            $data['used'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['used']);
        }
        if (isset($params['post']['title'])) {
            $data['title'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['title']);
        }
        if (isset($params['post']['multi_image'])) {
            $data['multi_image'] = json_encode($params['post']['multi_image'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['video'])) {
            $data['video'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['video']);
        }

        if ($params['post']['id']) {
            $this->update($data,'id = '.$params['post']['id']);
        } else {
            $data['status'] = 0;
            $data['type'] = $params['post']['type'];
            $data['article_id'] = $params['post']['article_id'];
            $data['member_id'] = $params['post']['member_id'];
            $data['date_created'] = date('Y/m/d H:i:s', time());
            $data['comment'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['comment']);
            $this->insert($data);
        }
   	}
}