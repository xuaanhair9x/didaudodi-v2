<?php
namespace Backend\Controller;

use Backend\Model\AdminSessionTb;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AdminSessionTbController extends AbstractActionController
{
    protected $_AdminSessionTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_AdminSessionTb = new AdminSessionTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        // Filter
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'list' => $this->_AdminSessionTb->listItem(array_merge(array('user' => true), $this->params()->fromQuery()))
        );

        $view = new ViewModel($data);
        return $view;
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_AdminSessionTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }
}