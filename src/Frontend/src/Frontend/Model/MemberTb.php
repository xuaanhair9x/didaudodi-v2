<?php

namespace Frontend\Model;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Authentication\Adapter\DbTable as AuthAdapter;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Result;
use Zend\Db\Sql\Select;

class MemberTb extends AbstractTableGateway
{
    protected $table = 'member_tb';

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

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['status'])) {
            $select->where->equalTo('c.status', $params['status']);
        }
        if (isset($params['email'])) {
            $select->where->equalTo('c.email', $params['email']);
        }
        if (isset($params['deny_id'])) {
            $select->where->notIn('c.id', $params['deny_id']);
        }

        $select->order('c.id DESC');

        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from($this->table);
        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }
        if (isset($params['id'])) {
            $select->where->equalTo('id', $params['id']);
        }
        if (isset($params['email'])) {
            if ($params['orphone']) {
                $select->where
                        ->nest()
                            ->equalTo('email', $params['email'])
                            ->or
                            ->equalTo('phone', $params['orphone'])
                        ->unnest;
            } else {
                $select->where->equalTo('email', $params['email']);
            }
        }
        if (isset($params['username'])) {
            $select->where->equalTo('username', $params['username']);
        }

        if (isset($params['phone'])) {
            $select->where->equalTo('phone', $params['phone']);
        }
        if (isset($params['status'])) {
            $select->where->equalTo('status', $params['status']);
        }

        return $this->selectWith($select)->toArray()[0];
    }

    public function saveData($params = null)
    {
        $data = array();
        if (isset($params['post']['email'])) {
            $data['email'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['email']);
        }
        if (isset($params['post']['username'])) {
            $data['username'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['username']);
        }
        if (isset($params['post']['password'])) {
            $data['password'] =  \Backend\View\Helper\Crypt::encodePassword($params['post']['password']);
        }
        if (isset($params['post']['fullname'])) {
            $data['fullname'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['fullname']);
        }
        if (isset($params['post']['phone'])) {
            $data['phone'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['phone']);
        }
        if (isset($params['post']['address'])) {
            $data['address'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['address']);
        }
        if (isset($params['post']['birthday'])) {
            $data['birthday'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['birthday']);
        }
        if (isset($params['post']['sex'])) {
            $data['sex'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['sex']);
        }
        if (isset($params['post']['status'])) {
            $data['status'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['status']);
        }
        if (isset($params['post']['type'])) {
            $data['type'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['type']);
        }
        if (isset($params['post']['like'])) {
            $data['like'] = json_encode($params['post']['like'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['dislike'])) {
            $data['dislike'] = json_encode($params['post']['dislike'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        }
        if (isset($params['post']['thumbnail'])) {
            $data['thumbnail'] = \Frontend\View\Helper\Sqlinjection::string($params['post']['thumbnail']);
        }
        if (!empty($params['id'])) {
            if (!isset($params['post']['like']) || !isset($params['post']['dislike'])) {
                $data['date_updated'] = date('Y-m-d', time());
            }
            $this->update($data, 'id = ' . $params['id']);
            $increment = $params['id'];
        } else {
            $data['date_created'] = date('Y-m-d', time());
            $this->insert($data);
            $increment = $this->getLastInsertValue();
        }

        return $increment;
    }

    public function login($params = null)
    {
        $authAdapter = new AuthAdapter(\Zend\Db\TableGateway\Feature\GlobalAdapterFeature::getStaticAdapter(), $this->table, 'email', 'password');
        $authAdapter->setIdentity($params['post']['email'])
                    ->setCredential(\Backend\View\Helper\Crypt::encodePassword($params['post']['password']));
        $select = $authAdapter->getDbSelect();
        $select->where->equalTo('status', 1);
        $result = $authAdapter->authenticate();
        if ($result->isValid()) {
            return $this->getItem(array(
                'email' => $params['post']['email'],
                'status' => 1,
                'columns' => array('id','email','fullname','phone','address','thumbnail','like','dislike','username')
            ));
        }
        return false;
    }

    public function changePassword($params = null)
    {
        $data['password'] =  \Backend\View\Helper\Crypt::encodePassword(\Frontend\View\Helper\Sqlinjection::string($params['post']['password']));
        $data['status'] = 1;
        $this->update($data, 'email = "' . \Frontend\View\Helper\Sqlinjection::string($params['post']['email']) . '"');
    }
}