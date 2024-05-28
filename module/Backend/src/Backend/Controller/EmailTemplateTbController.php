<?php
namespace Backend\Controller;

use Backend\Model\EmailTemplateTb;
use Backend\Model\MenuCodeTb;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class EmailTemplateTbController extends AbstractActionController
{
    protected $_MenuCodeTb;
    protected $_EmailTemplateTb;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_EmailTemplateTb = new EmailTemplateTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field['define'] = array('subject' => 'Tiêu đề','name' => 'Loại email','body' => 'Nội dung');

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));
        $data = array(
            '_field' => $this->_field,
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_EmailTemplateTb->listItem($this->identity()->supper ? '' : array('deny_id' => array(1,2,4,8)))
        );

        return new ViewModel($data);
    }

    public function fieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.($this->_translator->translate($this->_params['id'] ? 'Chỉnh sửa' : 'Thêm mới')));
        $data = array(
            '_params' => $this->params()->fromRoute(),
            'default' => ($this->params()->fromQuery('style') || empty($this->_params['id'])) ? true : false,
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        $data['item'] = $this->_params['id'] ? $this->_EmailTemplateTb->getItem(array('id' => $this->_params['id'], 'default' => $data['default'])) : array();

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            switch ($this->_params['post']['save']) {
                case 'default':
                    $this->_params['post']['subject_default'] = $this->_params['post']['subject'];
                    $this->_params['post']['body_default'] = $this->_params['post']['body'];
                break;
                case 'edit':
                    $this->_params['post']['subject_edit'] = $this->_params['post']['subject'];
                    $this->_params['post']['body_edit'] = $this->_params['post']['body'];
                break;
                case 'rollback':
                    $this->_params['post']['subject_edit'] = '';
                    $this->_params['post']['body_edit'] = '';
                break;
            }
            $this->_EmailTemplateTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkList']);
        }

        // Các field và thứ tự hiển thị
        $fields = array(
            'subject' => array('class' => 'col-md-8'),
            'name' => array('class' => 'col-lg-4', 'attr' => $this->identity()->supper ? '' : 'readonly="true"'),
            'body'
        );
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

        return new ViewModel($data);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_EmailTemplateTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_EmailTemplateTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }
}