<?php

namespace Frontend\Controller;

use Frontend\Model\BannerTb;
use Frontend\Model\CommentTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductTb;
use Frontend\Model\SectionTb;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
	public function indexAction()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        //Begin code
        $SectionTb = new SectionTb();
        $ProductCatTb = new ProductCatTb();
        $ProductTb = new ProductTb();
        $CommentTb = new CommentTb();
        $MenuPublicTb = new MenuPublicTb();
        $NewsTb = new NewsTb();

        $data = array(
            'action' => 'home',
            'active' => 'home',
            'slide' => $SectionTb->getItem(array('id' => 1, 'columns' => array('multi_image'), 'special' => 'hien-thi')),
            'slogan' => $SectionTb->getItem(array('id' => 12, 'columns' => array('desc_short'), 'special' => 'hien-thi')),
            'cate' => $ProductCatTb->listItem(array('parent' => 1, 'columns' => array('id','name','slug','thumbnail'), 'special' => 'trang-chu', 'limit' => 12)),
            'spTieuBieu' => $ProductTb->getList(array('root_id' => 1, 'columns' => array('id','name','slug','thumbnail'), 'special' => 'tieu-bieu')),
            'spSale' => $ProductTb->getList(array('root_id' => 1, 'columns' => array('id','name','slug','thumbnail','price_market','price_discount','price_percent'), 'filter_sale' => 1, 'deny_special' => 'an-sale', 'limit' => 20)),
            'combo' => array(
                'link' => $MenuPublicTb->getItem(array('id' => 38, 'columns' => array('link')))['link'],
                'list' => $ProductTb->getList(array('cat_id' => 16, 'columns' => array('id','name','slug','thumbnail','list_combo_item'), 'special' => 'trang-chu', 'limit' => 20))
            ),
            'traiNghiem' => $SectionTb->getItem(array('id' => 7, 'columns' => array('name','multi_input','multi_image','detail'), 'special' => 'hien-thi')),
            'video' => $SectionTb->getItem(array('id' => 6, 'columns' => array('name','desc_short','multi_image'), 'special' => 'hien-thi')),
            'blog' => $NewsTb->getList(array('root_id' => 6, 'columns' => array('id','name','slug','thumbnail','desc_short','view'), 'special' => 'tieu-bieu', 'limit' => 20)),
            'banner' => $SectionTb->getItem(array('id' => 5, 'columns' => array('multi_image'))),
            'background' => $SectionTb->getItem(array('id' => 13, 'columns' => array('multi_image'))),
            'camket' => $MenuPublicTb->getItem(array('id' => 21, 'columns' => array('name','link')))
        );

        foreach ($data['spTieuBieu'] as $i => $value) {
            $commentList = $CommentTb->listItem(array('article_id' => $value['id'], 'type' => 'product_tb'));

            $one = $two = $three = $four = $five = 0;
            foreach ($commentList as $j => $value) {
                if($value['parent'] == 0) {
                    // tính tổng số lượng sao
                    switch ($value['star']) {
                        case 5: $five++; break;
                        case 4: $four++; break;
                        case 3: $three++; break;
                        case 2: $two++; break;
                        case 1: $one++; break;
                    }
                } else {
                    unset($commentList[$j]);
                }
            }

            $totalStar = $one + $two + $three + $four + $five;
            $avgStar = ($one * 1 + $two * 2 + $three * 3 + $four * 4 + $five * 5) / $totalStar;
            $data['spTieuBieu'][$i]['avgStar'] = $avgStar;
            $data['spTieuBieu'][$i]['countComment'] = count($commentList);
            $data['spTieuBieu'][$i]['comment'] = $commentList[0];
        }

        foreach ($data['blog'] as $i => $value) {
            $commentList = $CommentTb->listItem(array('article_id' => $value['id'], 'type' => 'news_tb'));

            $one = $two = $three = $four = $five = 0;
            foreach ($commentList as $j => $value) {
                if($value['parent'] == 0) {
                    // tính tổng số lượng sao
                    switch ($value['star']) {
                        case 5: $five++; break;
                        case 4: $four++; break;
                        case 3: $three++; break;
                        case 2: $two++; break;
                        case 1: $one++; break;
                    }
                } else {
                    unset($commentList[$j]);
                }
            }

            $totalStar = $one + $two + $three + $four + $five;
            $avgStar = ($one * 1 + $two * 2 + $three * 3 + $four * 4 + $five * 5) / $totalStar;
            $data['blog'][$i]['avgStar'] = $avgStar;
            $data['blog'][$i]['countComment'] = count($commentList);
        }

        //End code

        // SEO || SNIPPET
        $data['menu'] = $MenuPublicTb->getItem(array('active' => $data['active'], 'columns' => array('title','keyword','description','link','active','detail')));

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'name' => $data['menu']['name'],
            'title' => $data['menu']['title'],
            'keyword' => $data['menu']['keyword'],
            'description' => $data['menu']['description'],
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => array($data['menu']),
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = array('vi' => '','en' => 'en/'); // Nếu có ngôn ngữ LANG

        $this->getResponse()->setContent($data);
    	return new ViewModel($data);
    }
}

?>