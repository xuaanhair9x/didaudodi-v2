<?php

namespace Frontend\Controller;

use Frontend\Model\CommentTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsTb;
use Frontend\Model\ProductBrandTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductLabelTb;
use Frontend\Model\ProductSelectTb;
use Frontend\Model\ProductTagTb;
use Frontend\Model\ProductTb;
use Frontend\Model\SectionTb;
use Frontend\View\Helper\ToSlug;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class ProductController extends AbstractActionController
{
    public function list11Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDefault($params);

        //Begin code

        $ProductCatTb = new ProductCatTb();
        $ProductLabelTb = new ProductLabelTb();
        $NewsTb = new NewsTb();

        if($params['id'] == 1) {
            $data['cate'] = $ProductCatTb->listItem(array('parent' => 1, 'columns' => array('id','name','slug','thumbnail','multi_image'), 'getList' => array('columns' => array('id','name','slug','thumbnail','price_market','price_discount'), 'limit' => 9)));
        } else {
            $itemCat = $ProductCatTb->getItem(array('id' => $params['id'], 'columns' => array('id','name','list_news_id')));
            $listNewsId = $itemCat['list_news_id'];

            if($params['label_id']) {
                $labelItem = $ProductLabelTb->getItem(array('id' => $params['label_id'], 'columns' => array('id','name','slug','list_news_id')));
                if($labelItem['list_news_id']) {
                    $listNewsId = $labelItem['list_news_id'];
                }
            }

            if($listNewsId) {
                $data['news'] = $NewsTb->getList(array(
                    'root_id' => 6,
                    'list_id' => explode(',', str_replace(':','', $listNewsId)),
                    'columns' => array('id','name','slug','thumbnail','desc_short','date_published','view')
                ));
            }
        }

        $array = array(
            'root_id' => $params['id'],
            'columns' => array('id','name','slug','thumbnail','price_market','price_discount','price_percent'),
            'limit' => 20,
            'page' => isset($params['page']) ? $params['page'] : '',
        );

        $session = new Container('frontend'); // Khai báo thư viện: "Zend\Session\Container;"

        // Xóa session khi truy cập vào link
        if (!$params['page']) {
            $session->offsetSet('sort', '');
            $session->offsetSet('filter', '');
            $session->offsetSet('special', '');
        }

        if($params['menu_id']) {
            $array['filter_sale'] = 1;
            $array['deny_special'] = 'an-sale';
        } if($params['label_id']) {
            $array['list_label_id'] = $params['label_id'];
        }

        $list = $this->listPage($array);
        $data['list'] = $list['list'];
        $data['paginator'] = $list['paginator'];
        $data['params'] = array_merge($data['params'], $list['params']);

        $data['sort'] = array(
            array('orderby' => 'special', 'name' => 'Bán chạy nhất'),
            array('orderby' => 'name ASC', 'name' => 'Theo thứ tự A - Z'),
            array('orderby' => 'name DESC', 'name' => 'Theo thứ tự Z - A'),
            array('orderby' => 'price ASC', 'name' => 'Giá tăng dần'),
            array('orderby' => 'price DESC', 'name' => 'Giá giảm dần'),
        );

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function list12Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params ()->fromRoute();
        $data = $this->getDefault($params);

        //Begin code

        $array = array(
            'cat_id' => $params['id'],
            'columns' => array('id','name','slug','thumbnail','list_combo_item'),
            'limit' => 16,
            'page' => isset($params['page']) ? $params['page'] : '',
        );

        $list = $this->listPage($array);
        $data['list'] = $list['list'];
        $data['paginator'] = $list['paginator'];
        $data['params'] = array_merge($data['params'], $list['params']);

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function list13Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params ()->fromRoute ();
        $data = $this->getDefault($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function list14Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params ()->fromRoute ();
        $data = $this->getDefault($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function detail15Action()
    {
        $params = $this->params()->fromRoute();
        $params['root'] = '11.html'; // n: action list number || Sử dụng khi menu có danh mục
        // $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        //Begin code

        array_unshift($data['detail']['multi_image']['anh-san-pham'], array('name' => $data['detail']['name'], 'thumbnail' => $data['detail']['thumbnail']));

        $data['camKet'] = $this->listItem(array('parent' => $data['detail']['id'], 'menu_code_id' => 51, 'columns' => array('name','thumbnail'), 'orderby' => array('sort ASC','id ASC')));

        $data['package'] = $this->listItem(array(
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

        $SectionTb = new SectionTb();
        $data['support'] = $SectionTb->getItem(array('id' => 10, 'columns' => array('multi_image'), 'special' => 'hien-thi'))['multi_image']['noi-dung'];

        if($data['detail']['list_product_id']) {
            $data['p_other'] = $this->listItem(array(
                'root_id'    => 1,
                'list_id' => explode(',', str_replace(':','', $data['detail']['list_product_id'])),
                'columns' => array('id','name','slug','sku','thumbnail','price_market','price_discount','multi_input'),
                'limit'     => 9,
            ));
        }

        $data['productReference'] = $this->listItem(array(
            'menu_code_id' => 56,
            'parent'    => $data['detail']['id'],
            'columns'   => array('id','name','slug','sku','thumbnail','desc_short','price_market','price_discount','multi_input'),
            'orderby'   => array('sort ASC','id ASC'),
            'limit'     => 6,
        ));

        // tạo nội dung so sánh sp dựa trên đặc điểm
        $toSlug = new ToSlug();
        $multi = array_column($data['productReference'], 'multi_input');
        $data['value'] = array();
        $data['label'] = array();
        foreach ($multi as $i => $value) {
            foreach ($value['dac-diem'] as $j => $item) {
                $data['label'][$toSlug($item['name'])] = $item['name'];
                $data['value'][$i][$toSlug($item['name'])] = $item['desc_short'];
            }
            if(empty($value['dac-diem'])) {
                $data['value'][$i] = array();
            }
        }
        $data['label'] = array_unique($data['label']);

        $data['combo'] = $this->listItem(array(
            'cat_id' => 16,
            'columns' => array('id','name','slug','list_combo_item'),
            'list_product_id' => $data['detail']['id'],
            'limit' => 3
        ));

        $data['danhGiaChatLuong'] = $this->listItem(array('parent' => $data['detail']['id'], 'menu_code_id' => 46, 'columns' => array('desc_short','multi_input'), 'orderby' => array('sort ASC','id ASC')));
        $data['loiIch'] = $this->listItem(array('parent' => $data['detail']['id'], 'menu_code_id' => 45, 'columns' => array('name','desc_short','thumbnail'), 'orderby' => array('sort ASC','id ASC')));
        $data['review'] = $this->listItem(array('parent' => $data['detail']['id'], 'menu_code_id' => 47, 'columns' => array('name','desc_short','thumbnail'), 'orderby' => array('sort ASC','id ASC')));
        $data['congDung'] = $this->listItem(array('parent' => $data['detail']['id'], 'menu_code_id' => 48, 'columns' => array('name','thumbnail'), 'orderby' => array('sort ASC','id ASC')));
        $data['faq'] = $this->listItem(array('parent' => $data['detail']['id'], 'menu_code_id' => 49, 'columns' => array('name','detail'), 'orderby' => array('sort ASC','id ASC')));

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

        return new ViewModel($data);
    }

    public function detail16Action()
    {
        $params = $this->params()->fromRoute();
        // $params['root'] = '<n>.html'; // n: action list number || Sử dụng khi menu có danh mục
        $params['root'] = array(16 => '12.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        // Begin code

        $ProductTb = new ProductTb();
        $listItem = array();
        if($data['detail']['list_combo_item']) {
            foreach ($data['detail']['list_combo_item'] as $item) {
                $product = $ProductTb->getItem(array('id' => $item['id'], 'columns' => array('id','name','slug','thumbnail','price_market','price_discount','multi_input')));
                $package = $ProductTb->getList(array('menu_code_id' => 50, 'parent' => $item['id'], 'columns' => array('id','name','price_market','thumbnail'), 'orderby' => array('sort ASC','id ASC'), 'denySpecial' => 'an-tam-thoi'));

                array_unshift(
                    $package,
                    array(
                        'id' => $product['id'],
                        'name' => $product['multi_input']['quy-cach'],
                        'price' => $product['price'],
                        'price_market' => $product['price_market'],
                        'price_discount' => $product['price_discount'],
                        'thumbnail' => $product['thumbnail']
                    )
                );

                foreach ($package as $i => $value) {
                    $package[$i]['parentId'] = $product['id'];
                    $package[$i]['parentName'] = $product['name'];
                    $package[$i]['thumbPath'] = PUBLIC_PATH.UPLOAD_IMAGES.date('Y/m',explode('-',$value['thumbnail'])[0]).'/100x100-'.$value['thumbnail'];
                    if(!$value['name']) {
                        unset($package[$i]);
                        $package = array_values($package);
                    }
                }

                $listItem[] = array_merge(
                    $product,
                    array('package' => $package ? $package : array())
                );
            }

            foreach ($listItem as $i => $item) {
                foreach ($item['multi_input'] as $j => $multi) {
                    if(is_array($multi)) {
                        unset($listItem[$i]['multi_input'][$j]);
                    }
                }
            }

            $priceMarket = array_sum(array_column($listItem, 'price'));
            $data['detail']['price'] = $data['detail']['price_market'] = $priceMarket;

            if($data['detail']['multi_input']['discount']['type'] == 1 && !empty($data['detail']['multi_input']['discount']['value'])) {
                $price = ($priceMarket * (100 - $data['detail']['multi_input']['discount']['value']) / 100);
                $price = round(intdiv($price, 100) / 10) * 1000;
                $data['detail']['price'] = $data['detail']['price_discount'] = $price;
            } else if($data['detail']['multi_input']['discount']['type'] == 2 && !empty($data['detail']['multi_input']['discount']['value'])) {
                $price = $priceMarket - str_replace(',','', $data['detail']['multi_input']['discount']['value']);
                $price = round(intdiv($price, 100) / 10) * 1000;
                $data['detail']['price'] = $data['detail']['price_discount'] = $price;
            }

            $data['detail']['listItem'] = $listItem;

            // booking
            $data['bookingCombo'] = array(
                'root_id'   => 16,
                'quantity'  => 1,
                'id'        => $data['detail']['id'],
                'name'      => $data['detail']['name'],
                'comboList' => $data['detail']['listItem'],
                'slug'      => $data['detail']['slug'],
                'price'     => $data['detail']['price'],
                'price_market' => $data['detail']['price_market'],
                'price_discount' => $data['detail']['price_discount'],
                'percent' => $data['detail']['multi_input']['giam-gia'] ? $data['detail']['multi_input']['giam-gia'] : 0,
                'thumbnail' => $data['detail']['thumbnail'],
                'thumbPath' => PUBLIC_PATH.UPLOAD_IMAGES.date('Y/m',explode('-',$data['detail']['thumbnail'])[0]).'/100x100-'.$data['detail']['thumbnail'],
                'search'    => $data['detail']['id'].'-'.$data['detail']['slug']
            );
        }

        // End code

        return new ViewModel($data);
    }

    public function detail17Action()
    {
        $params = $this->params()->fromRoute();
        // $params['root'] = '<n>.html'; // n: action list number || Sử dụng khi menu có danh mục
        $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        // Begin code

        // Xóa dòng này và code ở đây

        // End code

        return new ViewModel($data);
    }

    public function detail18Action()
    {
        $params = $this->params()->fromRoute();
        // $params['root'] = '<n>.html'; // n: action list number || Sử dụng khi menu có danh mục
        $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        // Begin code

        // Xóa dòng này và code ở đây

        // End code

        return new ViewModel($data);
    }

    public function detail19Action()
    {
        $params = $this->params()->fromRoute();
        // $params['root'] = '<n>.html'; // n: action list number || Sử dụng khi menu có danh mục
        $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        // Begin code

        // Xóa dòng này và code ở đây

        // End code

        return new ViewModel($data);
    }

    // Lấy danh sách dữ liệu không phân trang
    public function listItem($params = null)
    {
        if (empty($params['columns'])) {
            $params['columns'] = array('id','name','slug','thumbnail','price_market','price_discount','price_percent','cat_id');
        }
        $ProductTb = new ProductTb();
        return $ProductTb->getList($params);
    }

    // Lấy dang sách dữ liệu có phân trang
    public function listPage($params = null)
    {
        if (empty($params['limit'])) {
            $params['limit'] = 0;
        }
        if (empty($params['number_page'])) {
            $params['number_page'] = 5;
        }
        if ($params['page']) {
            $params['offset'] = ($params['page'] - 1) * $params['limit'];
        } else {
            $params['page'] = 1;
        }

        $paginator = new \Zend\Paginator\Paginator(new \Zend\Paginator\Adapter\ArrayAdapter($this->listItem(array_merge($params, array('limit' => 0)))));
        $paginator->setCurrentPageNumber($params['page']);
        $paginator->setItemCountPerPage($params['limit']);
        $paginator->setPageRange($params['number_page']);

        return array(
            'params' => $params,
            'paginator' => $paginator,
            'list' => $paginator->getCurrentItems()
        );
    }

    // Thiết lập giá trị mặc đinh
    private function getDefault($params = null)
    {
        $data = array('action' => 'product-'.$params['action']);
        $link = $params['id'].'-'.$params['format'];

        preg_match('/[a-z]*/', $params['action'], $action);

        $ProductCatTb = new ProductCatTb();
        if ($action[0] == 'detail') {
            $ProductTb = new ProductTb();
            $data['detail'] = $ProductTb->getItem(array('id' => $params['id']));
            $data['slug'] = $params['slug'].'-'.$params['id'].'-'.$params['format'];

            $rootItem = $ProductCatTb->getParent(array('parent' => 0, 'child_id' => $data['detail']['cat_id'], 'columns' => array('id', 'parent')));
            $link = $data['detail']['cat_id'].'-'.(is_array($params['root']) ? $params['root'][$rootItem['id']] : $params['root']);
        } elseif (isset($params['menu_id'])) { // list
            $link = $params['shortcut'].$params['menu_id'].'-'.($params['id'] ? $params['id'].'-' : '').$params['format'];
        }

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array_merge(
            array($MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('name','title','keyword','description','link','active')))),
            array($MenuPublicTb->getItem(array('link' => '-'.$link, 'columns' => array('id','parent','name','title','keyword','description','link','active','thumbnail','level','detail','desc_short','multi_image','level')))) // link: -<id>-<action(number)>.html
        );

        if (isset($params['brand_id'])) {
            $ProductBrandTb = new ProductBrandTb();
            $data['menu'][1] = $ProductBrandTb->getItem(array('id' => $params['brand_id'], 'columns' => array('id','name','slug','title','keyword','description')));
            $data['menu'][1]['link'] = $data['menu'][1]['slug'].'-br'.$data['menu'][1]['id'].'-'.$params['id'].'-'.$params['format'];
        } elseif (isset($params['label_id'])) {
            $ProductLabelTb = new ProductLabelTb();
            $data['menu'][1] = $ProductLabelTb->getItem(array('id' => $params['label_id'], 'columns' => array('id','name','slug','title','keyword','description','multi_image')));
            $data['menu'][1]['link'] = $data['menu'][1]['slug'];

            $data['breadcrumb'] = $ProductCatTb->getItem(array('id' => $params['id'], 'columns' => array('id','name','slug','title','description')));
            $data['breadcrumb']['link'] = $data['breadcrumb']['slug'];

            $data['menu'][1]['title'] = $data['menu'][1]['title'];
            $data['menu'][1]['description'] = $data['menu'][1]['description'];
        } elseif (isset($params['tag_id'])) {
            $ProductTagTb = new ProductTagTb();
            $data['menu'][1] = $ProductTagTb->getItem(array('id' => $params['tag_id'], 'columns' => array('id','name','slug','title','keyword','description')));
            $data['menu'][1]['link'] = $data['menu'][1]['slug'].'-tg'.$data['menu'][1]['id'].'-'.$params['id'].'-'.$params['format'];
        } elseif ($data['menu'][1]['parent'] > 0) {
            $data['breadcrumb'] = $MenuPublicTb->getItem(array('id' => $data['menu'][1]['parent'], 'columns' => array('id','name','title','keyword','description','link','active')));
        }

        $data['active'] = $data['menu'][1]['active'];
        if (isset($data['detail'])) {
            $rootItem = $ProductCatTb->getParent(array('child_id' => $data['detail']['cat_id'], 'level' => 1, 'columns' => array('id', 'parent','name','slug')));
            if($data['menu'][1]['level'] == 2) {
                $data['menu'][1]['link'] = $rootItem['slug'].'-'.$data['menu'][1]['link'];
            }

            $data['menu'][] = array('title' => $data['detail']['title']);
            $arrs = array(
                'name' => $data['detail']['name'],
                'title' => $data['detail']['title'],
                'keyword' => $data['detail']['keyword'],
                'description' => $data['detail']['description'],
                'image' => UPLOAD_IMAGES.date('Y/m',explode('-',$data['detail']['thumbnail'])[0]).'/'.$data['detail']['thumbnail']
            );
        } else {
            $arrs = array(
                'name' => ((!empty($params['page'])) ? 'Trang '.$params['page'].': ' : '').$data['menu'][1]['name'],
                'title' => ((!empty($params['page'])) ? 'Trang '.$params['page'].': ' : '').$data['menu'][1]['title'],
                'keyword' => ((!empty($params['page'])) ? 'Trang '.$params['page'].': ' : '').$data['menu'][1]['keyword'],
                'description' => ((!empty($params['page'])) ? 'Trang '.$params['page'].': ' : '').$data['menu'][1]['description'],
                'image' => UPLOAD_IMAGES.date('Y/m',explode('-',$data['menu'][1]['thumbnail'])[0]).'/'.$data['menu'][1]['thumbnail']
            );
        }

        if (isset($data['detail']) && empty($data['detail']['id']) || empty($data['menu'][1])) {
            $response = $this->getResponse();
            $response->setStatusCode(404);
            $response->sendHeaders();
        } else {
            // if(!$params['label_id']) {
            //     $langCurrent = str_replace(URL, '', URL_LANG);
            //     $currentSlug = $langCurrent.$params['slug'];
            //     $actualSlug = $data['detail']['slug'] ?? str_replace('-'.$link, '', end($data['menu'])['link']);
            //     if ($actualSlug != $currentSlug) {
            //         $response = $this->getResponse();
            //         $response->getHeaders()->addHeaderLine('Location', URL.$actualSlug.'-'.$params['id'].'-'.$params['format']);
            //         $response->setStatusCode(302);
            //         $response->sendHeaders();
            //     }
            // }
        }

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'name' => $arrs['name'],
            'title' => $arrs['title'],
            'keyword' => $arrs['keyword'],
            'description' => $arrs['description'],
            'image' => $arrs['image'],
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu']
        ));

        //Điều kiện active cho danh mục cấp 1
        $data['level'] = $data['menu'][1]['level'];
        $data['menu_id'] = $data['menu'][1]['level'] == 1 ? $data['menu'][1]['id'] : $data['menu'][1]['parent'];

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = isset($data['detail']) ? $data['detail']['slugLang'] : $data['menu'][1]['slugLang']; // Nếu có ngôn ngữ LANG

        return $data;
    }
}

?>