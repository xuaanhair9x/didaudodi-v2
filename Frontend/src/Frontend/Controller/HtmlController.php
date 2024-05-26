<?php

namespace Frontend\Controller;

use Frontend\Model\HtmlTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MenuPublicTb;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class HtmlController extends AbstractActionController
{

    public function page31Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDetail($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function page32Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDetail($params);

        //Begin code

        $HtmlTb = new HtmlTb();
        $data['content'] = $HtmlTb->listItem(array('parent' => $params['id'], 'columns' => array('name','thumbnail','detail')));

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function page33Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDetail($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function page34Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDetail($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    public function page35Action()
    {
        if ($this->getResponse()->getContent()) {
            return new ViewModel($this->getResponse()->getContent());
        }

        $params = $this->params()->fromRoute();
        $data = $this->getDetail($params);

        //Begin code

        // Xóa dòng này và code ở đây

        //End code

        $this->getResponse()->setContent($data);
        return new ViewModel($data);
    }

    private function getDetail ($params = null)
    {
        $data = array('action' => 'html-'.$params['action'], 'active' => 'html-page-'.$params['id']);

        $HtmlTb = new HtmlTb();
        $data['detail'] = $HtmlTb->getItem(array('id' => $params['id']));
        $data['slug'] = $params['slug'].'-'.$params['id'].'-'.$params['format'];

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array_merge(
            array($MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('name','title','keyword','description','link','active')))),
            array($MenuPublicTb->getItem(array('active' => $data['active'], 'columns' => array('name','title','keyword','description','link','active','multi_image','desc_short','thumbnail'))))
        );

        if (empty($data['detail'])) {
            $response = $this->getResponse();
            $response->setStatusCode(404);
        } else {
            // $link = $params['id'].'-'.$params['format'];
            // $langCurrent = str_replace(URL, '', URL_LANG);
            // $currentSlug = $langCurrent.$params['slug'];
            // $actualSlug = str_replace('-'.$link, '', end($data['menu'])['link']);
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
            'name' => $data['menu'][1]['name'],
            'title' => $data['menu'][1]['title'],
            'keyword' => $data['menu'][1]['keyword'],
            'description' => $data['menu'][1]['description'],
            'image' => UPLOAD_IMAGES.date('Y/m',explode('-',$data['detail']['thumbnail'])[0]).'/'.$data['detail']['thumbnail'],
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu']
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = $data['menu'][1]['slugLang']; // Nếu có ngôn ngữ LANG

        return $data;
    }
}

?>