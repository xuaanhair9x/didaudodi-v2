<?php

namespace Frontend\Block;

use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsTb;
use Frontend\View\Helper\SortNestedCate;
use Zend\Session\Container;
use Zend\View\Helper\AbstractHelper;

class Header extends AbstractHelper
{
	public function __invoke($params)
    {
    	//Begin code

        $MenuPublicTb = new MenuPublicTb();
        $SortNestedCate = new SortNestedCate();
        $NewsTb = new NewsTb();
        $session = new Container('frontend');

		$data = array(
            'active' => $params->active,
            'params' => $params->params,
            'info' => $params->info,
            'menu' => $SortNestedCate($MenuPublicTb->listItem(array('deny_id' => array(1,3,21,42), 'columns' => array('id','parent','name','link','active','multi_image','multi_input'))), array('parent' => 0)),
            'newsHot' => $NewsTb->getList(array('cat_id' => 19, 'columns' => array('id','name','slug'), 'special' => 'header')),
            'numCart' => ($session->cart) ? count($session->cart) : 0,
            'logged' => $session->logged,
        );

	    //End code

		$data = $this->view->partial('block/header.phtml',$data);
		echo $data;
	}
}