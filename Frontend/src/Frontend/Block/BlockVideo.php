<?php

namespace Frontend\Block;
use Frontend\Model\InfoTb;
use Frontend\Model\SectionTb;
use Zend\View\Helper\AbstractHelper;

class BlockVideo extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    $InfoTb = new InfoTb();
	    $SectionTb = new SectionTb();

	    $data['info'] = $InfoTb->getItem();
	    $data['video'] = $SectionTb->getItem(array('id' => 4, 'columns' => array('name','desc_short','multi_input'), 'special' => 'hien-thi'));

	    //End code

		$data = $this->view->partial('block/block/blockVideo.phtml',$data);
		echo $data;
	}
}

?>