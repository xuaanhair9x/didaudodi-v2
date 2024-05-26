<?php

namespace Frontend\Block;

use Frontend\Model\MenuPublicTb;
use Zend\View\Helper\AbstractHelper;

class Breadcrumb extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;
		$data = $this->view->partial('block/breadcrumb.phtml',$data);
		echo $data;
	}
}

?>