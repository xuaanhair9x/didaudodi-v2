<?php

namespace Frontend\Controller;

use Frontend\Model\CommentTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsCatTb;
use Frontend\Model\NewsTagTb;
use Frontend\Model\NewsTb;
use Frontend\Model\SectionTb;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;

class NewsController extends AbstractActionController
{
	public function list21Action()
	{
        // if ($this->getResponse()->getContent()) {
        //     return new ViewModel($this->getResponse()->getContent());
        // }

		$params = $this->params()->fromRoute();
        $data = $this->getDefault($params);

        //Begin code

        $MenuPublicTb = new MenuPublicTb();
        $NewsCatTb = new NewsCatTb();
        $SectionTb = new SectionTb();

        $data['content'] = $MenuPublicTb->getItem(array('id' => 9, 'columns' => array('detail')));
        $data['topic'] = $MenuPublicTb->getItem(array('id' => 42, 'columns' => array('name','link','multi_image')));
        $data['topic']['list'] = $NewsCatTb->listItem(array('root_id' => 6, 'columns' => array('id','name','slug'), 'special' => 'hot'));

        $limit = 12;

        if($params['id'] == 6) {
            if($params['menu_id']) {
                $listCat = $this->listCatPage(array(
                    'root_id' => $params['id'],
                    'columns' => array('id','name','slug','thumbnail'),
                    'countItem' => true,
                    'limit' => 18,
                    'page' => isset($params['page']) ? $params['page'] : '',
                ));
                $data['listCat'] = $listCat['list'];
                $data['listCatPaginator'] = $listCat['paginator'];
            } else {
                $listNews = $this->listItem(array(
                    'root_id' => $params['id'],
                    'columns' => array('id','name','slug','thumbnail','desc_short','date_published','user_created'),
                    // 'date_published' => date('Y-m-d H:i:s', time() - 259200) // lấy bài viết gần nhất 4 ngày
                ));

                $num = count($listNews) > 7 ? 7 : count($listNews);
                $random = $num > 1 ? $this->arrayRandom($listNews, $num) : $listNews;
                shuffle($random);
                $data['listNewsHot'] = $random;
                $limit = 20;

                $data['banner'] = $SectionTb->getItem(array('id' => 5, 'columns' => array('multi_image')));
            }
        }

        $session = new Container('frontend'); // Khai báo thư viện: "Zend\Session\Container;"

        // Xóa session khi truy cập vào link
        if (!$params['page']) {
            $session->offsetSet('filter', '');
        }

        $list = $this->listPage(array(
            'root_id' => $params['id'],
            'columns' => array('id','name','slug','thumbnail','desc_short','user_created','date_published','view'),
            'limit' => $limit,
            'page' => isset($params['page']) ? $params['page'] : '',
        ));
        $data['list'] = $list['list'];
        $data['listArray'] = $list['listArray'];
        $data['paginator'] = $list['paginator'];
        $data['params'] = array_merge($data['params'], $list['params']);

        //End code

		// $this->getResponse()->setContent($data);
        return new ViewModel($data);
	}

	public function list22Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDefault($params);

        //Begin code

        // Code here

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function list23Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDefault($params);

        //Begin code

        // Code here

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function list24Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDefault($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

	public function detail25Action()
    {
        $params = $this->params()->fromRoute();
        $params['root'] = '21.html'; // n: action list number || Sử dụng khi menu có danh mục
        // $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        //Begin code

        $NewsCatTb = new NewsCatTb();
        $data['catParentID'] = $NewsCatTb->getParent(array('parent' => 6, 'child_id' => $data['detail']['cat_id'], 'columns' => array('id','parent','name')));

        $data['n_other'] = $this->listItem(array(
            'cat_id'  => $data['detail']['cat_id'],
            'columns' => array('id','name','slug','thumbnail','desc_short','user_created','date_published','view'),
            'limit'   => 18,
        ));

        $SectionTb = new SectionTb();
        $data['banner'] = $SectionTb->getItem(array('id' => 5, 'columns' => array('multi_image')));

        $CommentTb = new CommentTb();
        $data['commentList'] = $CommentTb->listItem(array('article_id' => $data['detail']['id'], 'type' => 'news_tb'));

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

        //End code

        return new ViewModel($data);
	}

	public function detail26Action()
    {
        $params = $this->params()->fromRoute();
        $params['root'] = '21.html'; // n: action list number || Sử dụng khi menu có danh mục
        // $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        // Begin code

        // Xóa dòng này và code ở đây

        // End code

        return new ViewModel($data);
    }

    public function detail27Action()
    {
        $params = $this->params()->fromRoute();
        // $params['root'] = '<n>.html'; // n: action list number || Sử dụng khi menu có danh mục
        $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        return new ViewModel($data);
    }

    public function detail28Action()
    {
        $params = $this->params()->fromRoute();
        // $params['root'] = '<n>.html'; // n: action list number || Sử dụng khi menu có danh mục
        $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        return new ViewModel($data);
    }

    public function detail29Action()
    {
        $params = $this->params()->fromRoute();
        // $params['root'] = '<n>.html'; // n: action list number || Sử dụng khi menu có danh mục
        $params['root'] = array('<id>' => '<n>.html'); // id: root_id || Sử dụng khi menu không có danh mục
        $data = $this->getDefault($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        return new ViewModel($data);
    }

	// Lấy danh sách dữ liệu không phân trang
    public function listItem($params = null)
    {
        if (empty($params['columns'])) {
            $params['columns'] = array('id','name','slug','desc_short','thumbnail','date_created');
        }
        $NewsTb = new NewsTb();
        return $NewsTb->getList($params);
    }

    // Lấy dang sách dữ liệu có phân trang
	public function listPage($params = null)
	{
	    if (empty($params['limit'])) {
	        $params['limit'] = 10;
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
            'list' => $paginator->getCurrentItems(),
            'listArray' => \Zend\Stdlib\ArrayUtils::iteratorToArray($paginator->getCurrentItems())
        );
	}

    // Lấy dang sách dữ liệu danh mục có phân trang
    public function listCatPage($params = null)
    {
        if (empty($params['limit'])) {
            $params['limit'] = 10;
        }
        if (empty($params['number_page'])) {
            $params['number_page'] = 5;
        }
        if ($params['page']) {
            $params['offset'] = ($params['page'] - 1) * $params['limit'];
        } else {
            $params['page'] = 1;
        }

        $NewsCatTb = new NewsCatTb();
        $paginator = new \Zend\Paginator\Paginator(new \Zend\Paginator\Adapter\ArrayAdapter($NewsCatTb->listItem(array_merge($params, array('limit' => 0)))));
        $paginator->setCurrentPageNumber($params['page']);
        $paginator->setItemCountPerPage($params['limit']);
        $paginator->setPageRange($params['number_page']);

        return array(
            'params' => $params,
            'paginator' => $paginator,
            'list' => $paginator->getCurrentItems(),
            'listArray' => \Zend\Stdlib\ArrayUtils::iteratorToArray($paginator->getCurrentItems())
        );
    }

    // Thiết lập giá trị mặc đinh
    private function getDefault($params = null)
    {
        $data = array('action' => 'news-'.$params['action']);
        $link = ($params['menu_id'] ? 'mn'.$params['menu_id'].'-':'').$params['id'].'-'.$params['format'];

        $NewsCatTb = new NewsCatTb();
        preg_match('/[a-z]*/', $params['action'], $action);
        if ($action[0] == 'detail') {
            $NewsTb = new NewsTb();
            $data['detail'] = $NewsTb->getItem(array('id' => $params['id']));
            $data['slug'] = $params['slug'].'-'.$params['id'].'-'.$params['format'];
            $NewsTb->change(array('id' => $data['detail']['id'], 'post' => array('view' => $data['detail']['view'])));

            $rootItem = $NewsCatTb->getParent(array('parent' => 0, 'child_id' => $data['detail']['cat_id'], 'columns' => array('id','parent','name')));
            $link = $data['detail']['cat_id'].'-'.(is_array($params['root']) ? $params['root'][$rootItem['id']] : $params['root']);
        }

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array_merge(
            array($MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('name','title','keyword','description','link','active')))),
            array($MenuPublicTb->getItem(array('link' => '-'.$link, 'columns' => array('name','parent','name','title','keyword','description','link','active','thumbnail','multi_image','desc_short')))) // link: -<id>-<action(number)>.html
        );

        if (isset($params['tag_id'])) {
            $NewsTagTb = new NewsTagTb();
            $data['menu'][1] = $NewsTagTb->getItem(array('id' => $params['tag_id'], 'columns' => array('id','name','slug','title','keyword','description')));
            $data['menu'][1]['link'] = $data['menu'][1]['slug'].'-tg'.$data['menu'][1]['id'].'-'.$params['id'].'-'.$params['format'];
        } elseif ($data['menu'][1]['parent'] > 0) {
            $data['breadcrumb'] = $MenuPublicTb->getItem(array('id' => $data['menu'][1]['parent'], 'columns' => array('id','name','title','keyword','description','link','active')));
        }

        $data['active'] = $data['menu'][1]['active'];
        if (isset($data['detail'])) {
            $data['menu'][] = array(
                'name' => $data['menu'][1]['name'],
                'title' => $data['detail']['title'],
                'multi_image' => $data['menu'][1]['multi_image']
            );
            $arrs = array(
                'name' => $data['detail']['name'],
                'title' => $data['detail']['title'],
                'keyword' => $data['detail']['keyword'],
                'description' => $data['detail']['description'],
                'image' => UPLOAD_IMAGES.date('Y/m',explode('-',$data['detail']['thumbnail'])[0]).'/'.$data['detail']['thumbnail']
            );

            if(in_array($rootItem['id'], array(1,19))) {
                if($rootItem['id'] == 1) {
                    $data['menu'][2]['multi_image'] = $MenuPublicTb->getItem(array('id' => 3, 'columns' => array('multi_image')))['multi_image'];
                }
                unset($data['menu'][1]);
                $data['menu'] = array_values($data['menu']);
            }
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
            // $langCurrent = str_replace(URL, '', URL_LANG);
            // $currentSlug = $langCurrent.$params['slug'];
            // $actualSlug = $data['detail']['slug'] ?? str_replace('-'.$link, '', end($data['menu'])['link']);
            // if ($actualSlug != $currentSlug) {
            //     $response = $this->getResponse();
            //     $response->getHeaders()->addHeaderLine('Location', URL.$actualSlug.'-'.$params['id'].'-'.$params['format']);
            //     $response->setStatusCode(302);
            //     $response->sendHeaders();
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

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = (isset($data['detail'])) ? $data['detail']['slugLang'] : $data['menu'][1]['slugLang']; // Nếu có ngôn ngữ LANG

        return $data;
    }

    public function arrayRandom($array, $amount = 1)
    {
        $keys = array_rand($array, $amount);

        if ($amount == 1) {
            return $array[$keys];
        }

        $results = [];
        foreach ($keys as $key) {
            $results[] = $array[$key];
        }

        return $results;
    }
}

?>