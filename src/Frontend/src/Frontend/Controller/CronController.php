<?php
namespace Frontend\Controller;
use Frontend\Controller\NewsController;
use Frontend\Controller\ProductController;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsCatTb;
use Frontend\Model\NewsTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductLabelTb;
use Frontend\Model\ProductTb;
use Frontend\View\Helper\SortNestedCate;
use SimpleXMLElement;
use Zend\Mvc\Controller\AbstractActionController;

class CronController extends AbstractActionController
{
    public function sitemapAction()
    {
        $data = array();
        // Domain: 1.0, Menu: 0.9 Danh mục: 0.8, Tin: 0.7

        // Domain
        $data['sitemap'][] =  array(
            'loc' => URL,
            'changefreq' => 'daily',
            'priority' => '1.0',
        );

        // Menu
        $MenuPublicTb = new MenuPublicTb();
        $sitemap = $MenuPublicTb->listItem(array(
            'columns' => array('id','name','parent','link','active'),
            'parent' => 0,
            'deny_id' => array(1,3,121)
        ));

        foreach ($sitemap as $key => $value) {
            $data['sitemap'][] =  array(
                'loc' => URL.(end(explode(',', $value['link']))),
                'changefreq' => 'daily',
                'priority' => '0.9',
            );
        }

        //Begin code

        //lấy url danh mục sản phẩm + phân loại
        $ProductCatTb = new ProductCatTb();
        $ProductLabelTb = new ProductLabelTb();
        $SortNestedCate = new SortNestedCate();
        $sitemap = $SortNestedCate($ProductCatTb->listItem(array('root_id' => 1, 'columns' => array('id','slug','parent','list_label_id'))), array('parent' => 1));
        foreach ($sitemap as $key => $value) {
            $data['sitemap'][] =  array(
                'loc' => URL.$value['slug'],
                'changefreq' => 'daily',
                'priority' => '0.8',
            );

            if($value['parent'] == 1 && $value['list_label_id']) {
                $listLabel = $ProductLabelTb->listItem(array('list_id' => explode(',', str_replace(':','', $value['list_label_id'])), 'columns' => array('id','slug')));
                foreach ($listLabel as $label) {
                    $data['sitemap'][] =  array(
                        'loc' => URL.$value['slug'].'-'.$label['slug'],
                        'changefreq' => 'daily',
                        'priority' => '0.8',
                    );
                }
            }

            if($value['child']) {
                foreach ($value['child'] as $child) {
                    $data['sitemap'][] =  array(
                        'loc' => URL.$value['slug'].'-'.$child['slug'],
                        'changefreq' => 'daily',
                        'priority' => '0.8',
                    );
                }
            }
        }

        //lấy url danh mục kinh nghiệm
        $NewsCatTb = new NewsCatTb();
        $sitemap = $NewsCatTb->listItem(array('root_id' => 6, 'columns' => array('id','slug')));
        foreach ($sitemap as $key => $value) {
            $data['sitemap'][] =  array(
                'loc' => URL.$value['slug'],
                'changefreq' => 'daily',
                'priority' => '0.8',
            );
        }

        //lấy url danh sách sản phẩm
        $ProductTb = new ProductTb();
        $sitemap = $ProductTb->getList(array('root_id' => 1, 'columns' => array('id','slug','cat_id')));
        foreach ($sitemap as $key => $value) {
            $data['sitemap'][] =  array(
                'loc' => URL.$value['rootSlug'].'/'.$value['slug'],
                'changefreq' => 'daily',
                'priority' => '0.7',
            );
        }

        //lấy url danh sách combo
        $sitemap = $ProductTb->getList(array('cat_id' => 16, 'columns' => array('id','slug')));
        foreach ($sitemap as $key => $value) {
            $data['sitemap'][] =  array(
                'loc' => URL.'combo/'.$value['slug'],
                'changefreq' => 'daily',
                'priority' => '0.7',
            );
        }

        //lấy url danh sách kinh nghiệm
        $NewsTb = new NewsTb();
        $sitemap = $NewsTb->getList(array('root_id' => 6, 'columns' => array('id','slug','cat_id')));
        foreach ($sitemap as $key => $value) {
            $data['sitemap'][] =  array(
                'loc' => URL.$value['rootSlug'].'/'.$value['slug'],
                'changefreq' => 'daily',
                'priority' => '0.7',
            );
        }

        //lấy url danh sách hỗ trợ
        $sitemap = array_merge(
            $NewsTb->getList(array('root_id' => 1, 'columns' => array('id','slug'))),
            $NewsTb->getList(array('cat_id' => 19, 'columns' => array('id','slug')))
        );
        foreach ($sitemap as $key => $value) {
            $data['sitemap'][] =  array(
                'loc' => URL.$value['slug'],
                'changefreq' => 'daily',
                'priority' => '0.7',
            );
        }

        //End code

        $root_node = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"></urlset>');
        $ArraytoXML = new \Frontend\View\Helper\ArraytoXML();
        $ArraytoXML($data['sitemap'],$root_node, 'url');
        $root_node->asXML(ROOT_PUBLIC.'/sitemap.xml');
        return $this->response;
    }
}

