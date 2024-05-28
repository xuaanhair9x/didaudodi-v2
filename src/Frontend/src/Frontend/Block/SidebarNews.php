<?php

namespace Frontend\Block;
use Frontend\Controller\NewsController;
use Frontend\Controller\ProductController;
use Frontend\Model\CommentTb;
use Frontend\Model\InfoTb;
use Frontend\Model\NewsTb;
use Frontend\Model\ProductBrandTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductTb;
use Frontend\Model\SectionTb;
use Frontend\View\Helper\SortNestedCate;
use Zend\View\Helper\AbstractHelper;

class SidebarNews extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

        $SectionTb = new SectionTb();
        $NewsTb = new NewsTb();

        $data['banner'] = $SectionTb->getItem(array('id' => 5, 'columns' => array('multi_image')));

        // danh sách tin thảo luận nhiều
        $CommentTb = new CommentTb();
        $listNewsCmt = array_column($CommentTb->listItemNormal(array('type' => 'news_tb', 'parent' => 0, 'columns' => array('id','parent','type','article_id'))), 'article_id');
        $listNewsCmt = array_count_values($listNewsCmt);
        arsort($listNewsCmt);

        $data['newsCmt'] = array();
        $flag = 0;
        foreach ($listNewsCmt as $i => $value) {
            $item = $NewsTb->getItem(array('id' => $i, 'columns' => array('id','name','slug')));
            if($item['id']) {
                if($flag < 4) {
                    $data['newsCmt'][] = array_merge(
                        $NewsTb->getItem(array('id' => $i, 'columns' => array('id','name','slug'))),
                        array('countCmt' => $value)
                    );
                }
                $flag++;
            }
        }

        // sản phẩm mới
        $ProductController = new ProductController();
        $list = $ProductController->listPage(array(
            'root_id' => 1,
            'columns' => array('id','name','slug','thumbnail','price_discount','price_market'),
            'limit' => 5,
            'page'  => isset($params['page']) ? $params['page'] : '',
        ));
        $data['listProductNew'] = $list['list'];
        $data['paginatorProductNew'] = $list['paginator'];

        // sidebar product
        $data['listSidebarProduct'] = $ProductController->listItem(array('cat_id' => 15, 'columns' => array('id','name','list_product_id')));
        foreach ($data['listSidebarProduct'] as $i => $value) {
        	if($value['list_product_id']) {
        		$listSidebarProduct = $ProductController->listPage(array(
		            'root_id' => 1,
		            'list_id' => explode(',', str_replace(':','', $value['list_product_id'])),
		            'columns' => array('id','name','slug','thumbnail','price_discount','price_market'),
		            'limit' => 5,
		            'page'  => isset($params['page']) ? $params['page'] : '',
		        ));

        		$data['listSidebarProduct'][$i]['list'] = $listSidebarProduct['list'];
        		$data['listSidebarProduct'][$i]['paginator'] = $listSidebarProduct['paginator'];
        	}
        }

        // sidebar tin
        $NewsController = new NewsController();
        $data['listSidebarNews'] = $NewsController->listItem(array('cat_id' => 17, 'columns' => array('id','name','list_news_id')));
        foreach ($data['listSidebarNews'] as $i => $value) {
        	if($value['list_news_id']) {
                $listSidebarNews = $NewsController->listPage(array(
                    'list_id' => explode(',', str_replace(':','', $value['list_news_id'])),
                    'columns' => array('id','name','slug','thumbnail','cat_id'),
                    'limit' => 5,
                    'page'  => isset($params['page']) ? $params['page'] : '',
                ));

                $data['listSidebarNews'][$i]['list'] = $listSidebarNews['list'];
                $data['listSidebarNews'][$i]['paginator'] = $listSidebarNews['paginator'];
        	}
        }

	    //End code

		$data = $this->view->partial('block/sidebarNews.phtml',$data);
		echo $data;
	}
}

?>