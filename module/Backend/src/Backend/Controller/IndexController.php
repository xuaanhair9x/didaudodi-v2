<?php

namespace Backend\Controller;
use Backend\Model\AdminTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    protected $_translator;

    public function indexAction()
    {
        $this->_translator = $this->getServiceLocator()->get('Translator');
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Trang chủ"));
        $data = array('_params' => $this->params()->fromRoute());

        $view = new ViewModel($data);
        return $view;
    }
}