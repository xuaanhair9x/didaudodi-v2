<?php

namespace Frontend\Block;
use Zend\View\Helper\AbstractHelper;

class Block1 extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    //End code

		$data = $this->view->partial('block/block/block1.phtml',$data);
		echo $data;
	}
}

?>