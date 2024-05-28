<?php

namespace Frontend\Controller;

use Frontend\Controller\NewsController;
use Frontend\Controller\ProductController;
use Frontend\Model\InfoTb;
use Frontend\Model\MenuPublicTb;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;

class SearchController extends AbstractActionController
{
    public function searchAction()
    {
        // $session = new Container('frontend');
        // if($_POST['keysearch']) {
        //     $keysearch = \Frontend\View\Helper\Sqlinjection::string($_POST['keysearch']);
        //     $session->keysearch = $keysearch;
        // } else {
        //     $keysearch = $session->keysearch ? $session->keysearch : '';
        // }
        $translator = $this->getServiceLocator()->get('translator');
        // $url = explode('/',$_SERVER['REDIRECT_URL'])[count(explode('/',$_SERVER['REDIRECT_URL']))-1];
        // if($url == $translator->translate('ket-qua-tim-kiem-99.html')) {
        //     $session->offsetSet('keysearch', ''); // Xóa session
        //     $keysearch = $_POST['keysearch'] ? $_POST['keysearch'] : '';
        //     $session->keysearch = $keysearch;
        // }

        $params = $this->params()->fromRoute();
        $params['id'] = 1; // Thay đổi giá trị id muốn tìm kiếm
        $params['query_string'] = $_GET['keysearch'];
        $data = array('action' => 'search', 'active' => 'search', 'params' => $params);

        $array = array(
            'root_id' => $params['id'],
            'columns' => array('id','name','slug','thumbnail','price_market','price_discount','price_percent'),
            'keysearch' => \Frontend\View\Helper\Sqlinjection::string($_GET['keysearch']),
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

        // Chọn controller để lấy dữ liệu
        if($_GET['type'] == 'blog') {
            $params['id'] = 6;
            $array['root_id'] = $params['id'];
            $array['columns'] = array('id','name','slug','thumbnail','desc_short','user_created','date_published','view');
            $array['limit'] = 18;

            $NewsController = new NewsController();
            $list = $NewsController->listPage($array);
        } else {
            $ProductController = new ProductController();
            $list = $ProductController->listPage($array);
        }

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

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array(
            $MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('name','title','link'))),
            array(
                'name' => $translator->translate("Kết quả tìm kiếm"),
                'title' => $translator->translate("Kết quả tìm kiếm"),
                'multi_image' => $MenuPublicTb->getItem(array('id' => 23, 'columns' => array('multi_image')))['multi_image']
            )
        );

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Kết quả tìm kiếm"),
            'keyword' => '',
            'description' => '',
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));

        $data['params'] = array_merge($data['params'], $this->params()->fromRoute());
        // $data['params']['slugLang'] = array('vi' => '','en' => 'en/'); // Nếu có ngôn ngữ LANG

        return new ViewModel($data);
    }
}

