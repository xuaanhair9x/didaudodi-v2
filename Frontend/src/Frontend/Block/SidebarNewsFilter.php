<?php

namespace Frontend\Block;
use Frontend\Model\NewsCatTb;
use Frontend\Model\NewsLabelTb;
use Frontend\Model\NewsSelectTb;
use Frontend\View\Helper\SortNestedCate;
use Zend\View\Helper\AbstractHelper;

class SidebarNewsFilter extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

        $NewsCatTb = new NewsCatTb();
        $NewsSelectTb = new NewsSelectTb();
        $NewsLabelTb = new NewsLabelTb();

        if($data['params']['action'] != 'search') {
            $data['catItem'] = $NewsCatTb->getParent(array('parent' => 6, 'child_id' => $data['params']['id'], 'columns' => array('id','parent','name')));
            $data['catItem']['list'] = $NewsCatTb->listItem(array('parent' => $data['catItem']['id'], 'columns' => array('id','name','slug')));
            $catItem = $NewsCatTb->getItem(array('id' => $data['params']['id'], 'columns' => array('id','name','list_label_id')));
            $listLabelId = $catItem['list_label_id'] ? explode(',', str_replace(':','', $catItem['list_label_id'])) : array();
            if($listLabelId) {
                $data['label'] = $NewsLabelTb->listItem(array('list_id' => $listLabelId, 'columns' => array('id','name')));
            }
        } else {
            $data['label'] = $NewsLabelTb->listItem(array('columns' => array('id','name')));
        }

        $data['filter'] = array(
            // array(
            //     'name' => 'Loại bài',
            //     'list' => $NewsSelectTb->listItem(array('root_id' => 42, 'columns' => array('id','name')))
            // ),
            array(
                'name' => 'Đối tượng',
                'list' => $NewsSelectTb->listItem(array('root_id' => 44, 'columns' => array('id','name')))
            )
        );

	    //End code

		$data = $this->view->partial('block/sidebarNewsFilter.phtml',$data);
		echo $data;
	}
}

?>