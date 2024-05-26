<?php

namespace Frontend\Block;
use Zend\View\Helper\AbstractHelper;

class bgHeader extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    //End code

		$data = $this->view->partial('block/block/bgHeader.phtml',$data);
		echo $data;
	}
}

?>