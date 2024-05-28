<?php
namespace Backend\Controller;

use Backend\Model\RedirectTb;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class RedirectTbController extends AbstractActionController
{
    protected $_RedirectTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_RedirectTb = new RedirectTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));

        // Kiểm tra form nhập liệu
        $this->_params['checkForm'] = array(
            'required' => array(
                'url_old' => $this->_translator->translate($this->_field['define']['url_old']),
                'url_new' => $this->_translator->translate($this->_field['define']['url_new'])
            ),
            'exists' => array(
                'url_old' => array(
                    'name' => $this->_translator->translate($this->_field['define']['url_old']),
                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'exists')),
                    'condition' => array('deny_id' => array($this->_params['id']))
                )
            )
        );

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_RedirectTb->listItem()
        );

        $view = new ViewModel($data);
        return $view;
    }

    public function fieldAction()
    {
        $this->identity()->langlist = array('');
        $this->identity()->lang = '';
        $data = array(
            'item' => array(),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );
        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            $data['item'] = $this->_RedirectTb->getItem(array('id' => $this->_params['id']));
        }
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true) {
                $data['error'] = $validate->getMessagesError();
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData();

                // Lưu dữ liệu
                $id = $this->_RedirectTb->saveData($this->_params);

                if ($this->_params['post']['continue']) {
                    $data['continue'] = $this->_params['post']['continue'];
                } else {
                    return $this->redirect()->toUrl($data['linkList']);
                }
            }
            $data['item'] = ($data['error']) ? $this->_params['post'] : array();
        }

        // Các field và thứ tự hiển thị
        $fields = array('url_old','url_new');
        foreach ($fields as $field => $value) {
            $field = is_array($value) ? $field : $value;
            if (!empty($this->_field['define'][$field])) {
                $data['elements'][$field] = array_merge(array(
                    'label' => $this->_field['define'][$field],
                    'name' => $field,
                    'value' => $data['item'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$title);
        $data['_params'] = array_merge($this->_params, $this->params()->fromRoute());

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/field.phtml');
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_RedirectTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function existsAction()
    {
        if ($this->getRequest()->isPost()) {
            echo $this->_RedirectTb->listItem($this->params()->fromPost()) ? true : false;
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_RedirectTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }

    public function codefieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/Cấu hình dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_field['define'],
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost();

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $defines = array(
            'input' => array(
                'url_old' => array('label' => 'Url cần chuyển hướng 301', 'class' => 'col-md-3'),
                'url_new' => array('label' => 'Url đích chuyển đến (gốc)', 'class' => 'col-md-3'),
            ),
            'action' => array('add-delete')
        );
        foreach ($defines as $group => $fields) {
            foreach ($fields as $field => $value) {
                $field = is_array($value) ? $field : $value;
                $data['elements'][$group][] = array_merge(array(
                    'name' => $field,
                    'value' => $data['item'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        $data['html'] = $this->_renderer->code($data);

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}