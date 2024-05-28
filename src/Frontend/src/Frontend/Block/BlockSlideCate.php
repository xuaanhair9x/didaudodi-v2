<?php

namespace Frontend\Block;
use Frontend\Model\InfoTb;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsCatTb;
use Frontend\Model\SectionTb;
use Zend\View\Helper\AbstractHelper;

class BlockSlideCate extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    $NewsCatTb = new NewsCatTb();
        $MenuPublicTb = new MenuPublicTb();

        $data['cate'] = $NewsCatTb->listItem(array('parent' => 6, 'columns' => array('id','name','slug','multi_image')));
        $data['topic'] = $MenuPublicTb->getItem(array('id' => 42, 'columns' => array('name','link','multi_image')));

	    //End code

		$data = $this->view->partial('block/block/blockSlideCate.phtml',$data);
		echo $data;
	}
}

?>