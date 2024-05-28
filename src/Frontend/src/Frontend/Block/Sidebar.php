<?php

namespace Frontend\Block;
use Frontend\Model\InfoTb;
use Frontend\Model\ProductBrandTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductTb;
use Frontend\View\Helper\SortNestedCate;
use Zend\View\Helper\AbstractHelper;

class Sidebar extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

        // Code here

	    //End code

		$data = $this->view->partial('block/sidebar.phtml',$data);
		echo $data;
	}
}

?>