<?php

namespace Frontend\Controller;
use Frontend\Controller\NewsController;
use Frontend\Controller\OrderController;
use Frontend\Controller\ProductController;
use Frontend\Model\CommentTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MemberTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductSelectTb;
use Frontend\Model\ProductTb;
use Frontend\View\Helper\SortNestedCate;
use Frontend\View\Helper\ToSlug;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class AjaxController extends AbstractActionController
{
    public function ajax81Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());

            $NewsController = new NewsController();
            $ProductController = new ProductController();

            $array = array(
                'root_id' => $params['id'],
                'limit' => $params['limit'],
                'page'  => $params['page'],
            );

            switch ($params['type']) {
                case 'news21X':
                    $array['columns'] = array('id','name','slug','thumbnail','desc_short','user_created','date_published');
                    $list = $NewsController->listPage($array);
                    break;
                case 'news21Y':
                    if($params['list_select_id']) {
                        $array['list_select_id'] = $params['list_select_id'];
                    } if($params['list_label_id']) {
                        $array['list_label_id'] = $params['list_label_id'];
                    } if ($params['keysearch']) {
                        $array['keysearch'] = $params['keysearch'];
                    }
                    $array['columns'] = array('id','name','slug','thumbnail','desc_short','user_created','date_published','view');
                    $list = $NewsController->listPage($array);
                    break;
                case 'newsCat21X':
                    unset($array['root_id']);
                    $array['parent'] = $params['id'];
                    $array['columns'] = array('id','name','slug','thumbnail');
                    $array['countItem'] = true;
                    $list = $NewsController->listCatPage($array);
                    break;
                case 'productSidebar':
                    if($params['list_product_id']) {
                        $array['list_id'] = explode(',', str_replace(':','', $params['list_product_id']));
                    }
                    $array['columns'] = array('id','name','slug','thumbnail','price_discount','price_market');
                    $list = $ProductController->listPage($array);
                    break;
                case 'newsSidebar':
                    unset($array['root_id']);
                    if($params['list_news_id']) {
                        $array['list_id'] = explode(',', str_replace(':','', $params['list_news_id']));
                    }
                    $array['columns'] = array('id','name','slug','thumbnail','cat_id');
                    $list = $NewsController->listPage($array);
                    break;
                case 'productList11X':
                    if($params['list_select_id']) {
                        $array['list_select_id'] = $params['list_select_id'];
                    } if($params['brand_id']) {
                        $array['brand_id'] = $params['brand_id'];
                    } if($params['orderby']) {
                        $array['orderby'] = $params['orderby'];
                    } if ($params['special']) {
                        $array['special'] = $params['special'];
                    } if ($params['filter_price']) {
                        $array['filter_price'] = $params['filter_price'];
                    } if ($params['filter_sale'] == 1) {
                        $array['filter_sale'] = $params['filter_sale'];
                        $array['deny_special'] = 'an-sale';
                    } if ($params['keysearch']) {
                        $array['keysearch'] = $params['keysearch'];
                    } if($params['label_id']) {
                        $array['list_label_id'] = $params['label_id'];
                    }

                    $array['columns'] = array('id','name','slug','thumbnail','price_market','price_discount','price_percent');
                    $list = $ProductController->listPage($array);
                    break;
                case 'productCombo12X':
                    unset($array['root_id']);
                    $array['cat_id'] = $params['id'];
                    $array['columns'] = array('id','name','slug','thumbnail','list_combo_item');
                    $list = $ProductController->listPage($array);
                    break;
                default:
                    // code...
                    break;
            }

            $data['list'] = $list['list'];
            $data['params'] = $params;


            //End code
        }
        $view = new ViewModel($data);
        return $view->setTerminal(true);
    }

    public function ajax82Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());

            $array = array(
                'root_id' => $params['id'],
                'columns' => array('id','name','slug','thumbnail','desc_short','user_created','date_published','view'),
                'limit' => $params['limit'],
                'page' => isset($params['page']) ? $params['page'] : '',
            );

            $session = new Container('frontend'); // Khai báo thư viện: "Zend\Session\Container;"
            $session->filter = $session->filter ? $session->filter : array();

            // Filter
            if ($session->filter) {
                foreach ($session->filter as $key => $value) {
                    $array[$key] = $value;
                }
            }
            if ($params['filter']) {
                $array[$params['filter']] = $session->filter[$params['filter']] = $params['value'];
            }

            if($params['keysearch']) {
                $array['keysearch'] = $params['keysearch'];
            }

            if(!$array['list_select_id']) {
                unset($array['list_select_id']);
            }
            if(!$array['list_label_id']) {
                unset($array['list_label_id']);
            }

            $NewsController = new NewsController();
            $list = $NewsController->listPage($array);
            $data['list'] = $list['list'];
            $data['paginator'] = $list['paginator'];
            $data['params'] = array_merge($params, $list['params']);

            //End code
        }
        $view = new ViewModel($data);
        return $view->setTerminal(true);
    }

    public function ajax83Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());
            $data['params'] = $params;

            $ProductTb = new ProductTb();
            $data['detail'] = $ProductTb->getItem(array('id' => $params['id'], 'columns' => array('id','name','slug','detail','thumbnail','multi_input','multi_image','multi_detail','price_discount','price_market','list_product_id')));

            $data['package'] = $ProductTb->getList(array(
                'menu_code_id' => 50,
                'parent'    => $data['detail']['id'],
                'columns' => array('name','price_market','price_discount','thumbnail'),
                'orderby' => array('sort ASC','id ASC'),
                'denySpecial' => 'an-tam-thoi'
            ));

            array_unshift(
                $data['package'],
                array(
                    'name' => $data['detail']['multi_input']['quy-cach'],
                    'price' => $data['detail']['price'],
                    'price_market' => $data['detail']['price_market'],
                    'price_discount' => $data['detail']['price_discount'],
                    'thumbnail' => $data['detail']['thumbnail']
                )
            );

            foreach ($data['package'] as $i => $value) {
                $data['package'][$i]['thumbPath'] = PUBLIC_PATH.UPLOAD_IMAGES.date('Y/m',explode('-',$value['thumbnail'])[0]).'/100x100-'.$value['thumbnail'];
                if(!$value['name']) {
                    unset($data['package'][$i]);
                    $data['package'] = array_values($data['package']);
                }
            }

            $CommentTb = new CommentTb();
            $data['commentList'] = $CommentTb->listItem(array('article_id' => $data['detail']['id'], 'type' => 'product_tb'));

            $one = $two = $three = $four = $five = 0;
            foreach ($data['commentList'] as $i => $value) {
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
                    unset($data['commentList'][$i]);
                }
            }

            $totalStar = $one + $two + $three + $four + $five;
            $data['avgStar'] = ($one * 1 + $two * 2 + $three * 3 + $four * 4 + $five * 5) / $totalStar;

            $InfoTb = new InfoTb();
            $data['info'] = $InfoTb->getItem();

            // booking
            $toSlug = new ToSlug();
            $data['booking'] = array(
                'root_id'   => 1,
                'quantity'  => 1,
                'id'        => $data['detail']['id'],
                'name'      => $data['detail']['name'],
                'package'   => ($data['detail']['multi_input']['quy-cach'] ? $data['detail']['multi_input']['quy-cach']:''),
                'slug'      => $data['detail']['slug'],
                'rootSlug'      => $data['detail']['rootSlug'],
                'price'     => $data['detail']['price'],
                'price_discount' => $data['detail']['price_discount'],
                'price_market' => $data['detail']['price_market'],
                'thumbnail' => $data['detail']['thumbnail'],
                'thumbPath' => PUBLIC_PATH.UPLOAD_IMAGES.date('Y/m',explode('-',$data['detail']['thumbnail'])[0]).'/100x100-'.$data['detail']['thumbnail'],
                'search'    => $data['detail']['id'].'-'.$data['detail']['slug'].($data['detail']['multi_input']['quy-cach'] ? '-'.$toSlug($data['detail']['multi_input']['quy-cach']):'')
            );

            //End code
        }
        $view = new ViewModel($data);
        return $view->setTerminal(true);
    }

    public function ajax84Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());

            $array = array(
                'root_id' => $params['id'],
                'columns' => array('id','name','slug','thumbnail','price_market','price_discount','price_percent'),
                'limit' => $params['limit'],
                'page' => isset($params['page']) ? $params['page'] : '',
            );

            $session = new Container('frontend'); // Khai báo thư viện: "Zend\Session\Container;"
            $session->filter = $session->filter ? $session->filter : array();

            // Sort
            if ($session->sort && $session->sort != 'special') {
                $array['orderby'] = $session->sort;
            } else if($session->sort == 'special') {
                $array['special'] = $session->special = 'ban-chay';
                unset($array['orderby']);
            }

            if ($params['sort'] && $params['sort'] != 'special') {
                $array['orderby'] = $session->sort = array($params['sort']);
            } else if($params['sort'] == 'special') {
                $array['special'] = $session->special = 'ban-chay';
                unset($array['orderby']);
            }

            // Filter
            if ($session->filter) {
                foreach ($session->filter as $key => $value) {
                    $array[$key] = $value;
                }
            }
            if ($session->filter_select) {
                $array['filter_select'] = $session->filter_select;
            }
            if ($params['filter']) {
                $array[$params['filter']] = $session->filter[$params['filter']] = $params['value'];
                if ($params['filter'] == 'list_select_id') {
                    $array['filter_select'] = $session->filter_select = $params['value_parent'];
                }
            }

            // Shortcut: menu_id
            if ($params['menu_id']) {
                $array['filter_sale'] = 1;
                $array['deny_special'] = 'an-sale';
            }

            // Shortcut: brand_id
            if ($params['brand_id']) {
                $array['brand_id'] = $params['brand_id'];
            } if ($params['label_id']) {
                $array['list_label_id'] = $params['label_id'];
            }

            // Điều kiện tìm kiếm theo từ khóa (nếu có)
            if ($params['keysearch']) {
                $array['keysearch'] = $params['keysearch'];
            }

            // Lấy kết quả theo điều kiện || Khai báo thư viện: "Frontend\Controller\ProductController;"
            $ProductController = new ProductController();
            $list = $ProductController->listPage($array);
            $data['list'] = $list['list'];
            $data['paginator'] = $list['paginator'];
            $data['params'] = array_merge($params, $list['params']);

            //End code
        }
        $view = new ViewModel($data);
        return $view->setTerminal(true);
    }

    public function ajax85Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());
            $session = new Container('frontend');

            if($session->logged['id']) {
                $MemberTb = new MemberTb();
                $data['logged'] = $MemberTb->getItem(array('id' => $session->logged['id']));
                if($data['logged']['id']) {
                    $data['logged']['listLike'] = json_decode($data['logged']['like'], true);
                    $data['logged']['listDislike'] = json_decode($data['logged']['dislike'], true);
                }
            }

            if(in_array($params['sort'], array('id DESC','id ASC'))) {
                $SortNestedCate = new SortNestedCate();
                $CommentTb = new CommentTb();
                $data['commentList'] = $SortNestedCate($CommentTb->listItem(array(
                    'article_id' => $params['article_id'],
                    'type' => $params['type'],
                    'orderby' => $params['sort']
                )), array('parent' => 0, 'type' => 'nested'));

                if($data['commentList']) {
                    foreach ($data['commentList'] as $i => $value) {
                        // tính số lượt like, dislike của đánh giá
                        $listMember = $MemberTb->listItem(array('columns' => array('id','like','dislike'), 'status' => 1));
                        $countLike = $countDislike = 0;
                        foreach ($listMember as $member) {
                            if(!empty($member['like'])) {
                                $like = json_decode($member['like'], true);
                                if(in_array($value['id'], $like)) {
                                    $countLike++;
                                }
                            } if(!empty($member['dislike'])) {
                                $dislike = json_decode($member['dislike'], true);
                                if(in_array($value['id'], $dislike)) {
                                    $countDislike++;
                                }
                            }
                        }
                        $data['commentList'][$i]['like'] = $countLike;
                        $data['commentList'][$i]['dislike'] = $countDislike;
                    }
                }
            }

            $InfoTb = new InfoTb();
            $data['info'] = $InfoTb->getItem();

            //End code
        }
        $view = new ViewModel($data);
        return $view->setTerminal(true);
    }

    public function ajax86Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());

            $CommentTb = new CommentTb();
            $ProductTb = new ProductTb();
            $SortNestedCate = new SortNestedCate();

            if($params['article_id']) {
                $data['commentList'] = $SortNestedCate($CommentTb->listItem(array('article_id' => $params['article_id'], 'type' => 'product_tb')), array('parent' => 0, 'type' => 'nested'));

                $data['combo'] = $ProductTb->getList(array(
                    'cat_id' => 16,
                    'columns' => array('id','name','slug','list_combo_item'),
                    'list_product_id' => $params['article_id'],
                    'limit' => 3
                ));

                if(!$data['combo']) {
                    $product = $ProductTb->getItem(array('id' => $params['article_id'], 'columns' => array('cat_id','list_product_id')));
                    if($product['list_product_id']) {
                        $data['p_other'] = $ProductTb->getList(array(
                            'root_id'    => 1,
                            'list_id' => explode(',', str_replace(':','', $product['list_product_id'])),
                            'columns' => array('id','name','slug','sku','thumbnail','price_market','price_discount','multi_input'),
                            'limit'     => 9,
                        ));
                    }
                }
            }

            $data['params'] = $params;

            $InfoTb = new InfoTb();
            $data['info'] = $InfoTb->getItem();

            //End code
        }
        $view = new ViewModel($data);
        return $view->setTerminal(true);
    }

    public function ajax87Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());

            $session = new Container('frontend');
            $ProductSelectTb = new ProductSelectTb();
            $ProductTb = new ProductTb();
            $OrderController = new OrderController();

            if($params['id']) {
                $district = $ProductTb->getItem(array('id' => $params['id'], 'columns' => array('id','name')));
                $listOption = $ProductTb->getList(array('parent' => $params['id'], 'columns' => array('id','name','list_select_id'), 'orderby' => array('sort ASC','id ASC')));
                $totalInfo = $OrderController->calcPriceSuggestion();

                foreach ($listOption as $i => $value) {
                    $orderValue = $ProductSelectTb->listItem(array('root_id' => $district['cat_id'] == 52 ? 57 : 60, 'list_id' => explode(',', str_replace(':','', $value['list_select_id'])), 'columns' => array('id','name','multi_input'), 'limit' => 1))[0];
                    $shippingType = $ProductSelectTb->listItem(array('root_id' => 58, 'list_id' => explode(',', str_replace(':','', $value['list_select_id'])), 'columns' => array('id','name'), 'limit' => 1))[0];

                    $giaTu = $listOption[$i]['giaTu'] = $orderValue['multi_input']['tu'] ? str_replace(',','', $orderValue['multi_input']['tu']) : 0;
                    $den = $listOption[$i]['den'] = $orderValue['multi_input']['den'] ? str_replace(',','', $orderValue['multi_input']['den']) : 0;
                    $listOption[$i]['shippingTypeID'] = $shippingType['id'];
                    $listOption[$i]['shippingTypeName'] = $shippingType['name'];

                    if($giaTu == 0 && $den == 0 || !$shippingType['id']) {
                        unset($listOption[$i]);
                    }

                    if($totalInfo['totalPrice'] < $giaTu) {
                        unset($listOption[$i]);
                    }

                    if($totalInfo['totalPrice'] > $den && $den != 0) {
                        unset($listOption[$i]);
                    }
                }

                $listOption = array_values($listOption);
                echo json_encode(array('shippingType' => $listOption));
            }

            //End code
        }

        return $this->getResponse();
    }

    public function ajax88Action()
    {
        $data = array();
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {

            //Begin code

            $params = array_merge($params, $this->getRequest()->getPost()->toArray());

            $OrderController = new OrderController();
            $calcPrice = $OrderController->calcPrice($params);
            echo json_encode($calcPrice);

            //End code
        }

        return $this->getResponse();
    }
}

?>