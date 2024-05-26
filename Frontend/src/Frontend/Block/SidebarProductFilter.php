<?php

namespace Frontend\Block;
use Frontend\Model\InfoTb;
use Frontend\Model\ProductBrandTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductLabelTb;
use Frontend\Model\ProductSelectTb;
use Frontend\Model\ProductTb;
use Frontend\View\Helper\SortNestedCate;
use Zend\View\Helper\AbstractHelper;

class SidebarProductFilter extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    $ProductCatTb = new ProductCatTb();
	    $ProductSelectTb = new ProductSelectTb();
	    $ProductBrandTb = new ProductBrandTb();
	    $ProductLabelTb = new ProductLabelTb();
	    $SortNestedCate = new SortNestedCate();

        $data['catItem'] = $ProductCatTb->getParent(array('parent' => 1, 'child_id' => $data['params']['id'], 'columns' => array('id','parent','name','slug','list_label_id')));
        if($data['params']['menu_id'] || $data['params']['action'] == 'search') {
        	$data['catItem']['name'] = $data['info']['headline']['slug-18'];
        	$data['catItem']['list'] = $SortNestedCate($ProductCatTb->listItem(array('root_id' => 1, 'columns' => array('id','name','slug','parent'))), array('parent' => 1));

        	// lấy hãng sản xuất
        	$data['brand'] = $ProductBrandTb->listItem(array('columns' => array('id','name')));

        	// lấy bộ lọc
        	$data['filter'] = $SortNestedCate($ProductSelectTb->listItem(array('root_id' => 17, 'columns' => array('id','name','slug','parent'))), array('parent' => 0, 'type' => 'nested'));
        } else {
        	$data['catItem']['list'] = $ProductCatTb->listItem(array('parent' => $data['catItem']['id'], 'columns' => array('id','name','slug')));
        	$item = $ProductCatTb->getItem(array('id' => $data['params']['id'], 'columns' => array('id','name','list_select_id','list_brand_id')));

        	// lấy danh sách phân loại theo danh mục cấp 1
        	if($data['catItem']['list_label_id']) {
        		$data['label'] = $ProductLabelTb->listItem(array('list_id' => explode(',', str_replace(':','', $data['catItem']['list_label_id'])), 'columns' => array('id','name','slug')));
        	}

        	// lấy hãng sản xuất
        	if($item['list_brand_id']) {
        		$data['brand'] = $ProductBrandTb->listItem(array('list_id' => explode(',', str_replace(':','', $item['list_brand_id'])), 'columns' => array('id','name')));
        	}

        	// lấy bộ lọc
	        if($item['list_select_id']) {
	    		$list_select_id = explode(',', str_replace(':','',$item['list_select_id']));
	    		$data['filter'] = $ProductSelectTb->listItem(array('root_id' => 17, 'list_id' => $list_select_id, 'columns' => array('id','name','slug','parent')));
	    		$temp = array();
	    		foreach ($data['filter'] as $i => $value) {
	    			$temp[] = $ProductSelectTb->getItem(array('id' => $value['parent'], 'columns' => array('id','name','parent')));
	    		}

	    		$temp = array_column($temp, 'id');
	    		$list_select_id = array_unique(array_merge($list_select_id, $temp));
	    		$data['filter'] = $SortNestedCate($ProductSelectTb->listItem(array('root_id' => 17, 'list_id' => $list_select_id, 'columns' => array('id','name','slug','parent','type'))), array('parent' => 0, 'type' => 'nested'));
	    	}
        }

	    //End code

		$data = $this->view->partial('block/sidebarProductFilter.phtml',$data);
		echo $data;
	}
}

?>