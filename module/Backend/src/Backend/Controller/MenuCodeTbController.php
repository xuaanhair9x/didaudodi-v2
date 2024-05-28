<?php

namespace Backend\Controller;

use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class MenuCodeTbController extends AbstractActionController
{
    protected $_MenuCodeTb;
    protected $_CheckForm;
    protected $_params;
    protected $_renderer;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_params = $e->getRouteMatch()->getParams();
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_params['checkForm'] = array('required' => array('name' => 'Tên menu'));

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title','Menu code');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_renderer->cateSortNested($this->_MenuCodeTb->listItem(), array('parent' => 0, 'type' => 'sort'))
        );

        return new ViewModel($data);
    }

    public function fieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title','Menu code/'.($this->_params['id'] ? 'Chỉnh sửa' : 'Thêm mới'));

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_params['id'] ? $this->_MenuCodeTb->getItem(array('id' => $this->_params['id'])) : array(),
            'menu' => $this->_MenuCodeTb->listItem(array('parent' => 0))
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true) {
                $data['error'] = $validate->getMessagesError();
                $data['item'] = $this->_params['post'];
            } else {
                $this->_params = $validate->getData();
                $this->_MenuCodeTb->saveData($this->_params);
                return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list'));
            }
        }

        return new ViewModel($data);
    }

    public function langAction()
    {
        $item = $this->_MenuCodeTb->getItem(array('id' => $this->_params['id']));

        $this->getEvent()->getRouteMatch()->setParam('title', $item['name']);

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $item['define'],
            'langs' => array(
                'vi-Tiếng Việt'     => 'vi - Tiếng Việt',
                'vn-Tiếng Việt'     => 'vn - Tiếng Việt',
                'en-Tiếng Anh'      => 'en - Tiếng Anh',
                'ja-Tiếng Nhật'     => 'ja - Tiếng Nhật',
                'th-Tiếng Thái'     => 'th - Tiếng Thái',
                'fr-Tiếng Pháp'     => 'fr - Tiếng Pháp',
                'ru-Tiếng Nga'      => 'ru - Tiếng Nga',
                'zh-Tiếng Trung'    => 'zh - Tiếng Trung',
                'cn-Tiếng Trung'    => 'cn - Tiếng Trung',
                'de-Tiếng Đức'      => 'de - Tiếng Đức',
                'ko-Tiếng Hàn'      => 'ko - Tiếng Hàn'
            )
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            $slug = explode('-', $this->_params['post']['define']['slug'])[0];
            $this->_params['post']['define'] = array_values(array_unique($this->_params['post']['define']));
            foreach ($this->_params['post']['define'] as $i => $value) {
                $this->_params['post']['define'][$i] = explode('-', $value);
            }
            $this->_params['post']['define']['slug'] = $slug;
            $this->_MenuCodeTb->saveData($this->_params);
            $data['success'] = "Bạn đã chỉnh sửa thành công!";
            $data['item'] = $this->_params['post']['define'];
        }

        return new ViewModel($data);
    }

    public function mailerAction()
    {
        $item = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->getEvent()->getRouteMatch()->setParam('title', $item['name'].'/Cấu hình dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => 'info_tb','action' => 'mailer','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
            'define' => $item['define'],
            'list' => array(
                array('service' => 'notifyit369', 'name' => 'Mặc định','port' => '','host' => '','auth' => array('user' => '','pass' => '')),
                array('service' => 'gmail', 'name' => 'Gmail','port' => 465,'host' => 'smtp.gmail.com','auth' => array('user' => '','pass' => ''),'link' => 'https://netsa.vn/huong-dan-cau-hinh-gui-mail-qua-smtp-gmail-cho-website/'),
                array('service' => 'other', 'name' => 'Khác','port' => '','host' => '','auth' => array('user' => '','pass' => ''))
            )
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost('define') ? $this->params()->fromPost('define') : array();
            foreach ($this->_params['post']['define'] as $i => $value) {
                $this->_params['post']['define'][$i] = json_decode($value, true);
            }

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkList']);
        }

        return new ViewModel($data);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            $post = $this->params()->fromPost();
            if ($post['define']) {
                $item = $this->_MenuCodeTb->getItem(array('id' => $this->_params['id']));
                $item['define'] = $item['define'] ? $item['define'] : array();
                $post['define'] = array_merge($item['define'], $post['define']);
                if ($post['define']['branch']) {
                    $post['link'] = '/info_tb/field/id='.$post['define']['branch'].'/root_id='.$this->_params['id'];
                    $this->_MenuCodeTb->saveData(array('id' => 37, 'post' => array('link' => '/info_tb/headline/id='.$post['define']['branch'].'/root_id=37')));
                    $this->_MenuCodeTb->saveData(array('id' => 38, 'post' => array('link' => '/info_tb/mailer/id='.$post['define']['branch'].'/root_id=38')));
                    unset($post['define']);
                }
            }
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_MenuCodeTb->saveData(array('id' => $id, 'post' => $post));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_MenuCodeTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }
}