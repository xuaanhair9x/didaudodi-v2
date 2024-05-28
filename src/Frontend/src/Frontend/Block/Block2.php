<?php

namespace Frontend\Block;
use Zend\View\Helper\AbstractHelper;

class Block2 extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    // Xóa dòng này và code ở đây

	    //End code

		$data = $this->view->partial('block/block/block2.phtml',$data);
		echo $data;
	}
}

?>