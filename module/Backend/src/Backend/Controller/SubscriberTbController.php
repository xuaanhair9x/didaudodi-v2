<?php
namespace Backend\Controller;

use Backend\Model\SubscriberTb;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class SubscriberTbController extends AbstractActionController
{
    protected $_SubscriberTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_SubscriberTb = new SubscriberTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        // Filter
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            'query' => $this->params()->fromQuery(),
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_SubscriberTb->listItem($this->params()->fromQuery())
        );

        $view = new ViewModel($data);
        return $view;
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_SubscriberTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }
}