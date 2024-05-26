<?php

namespace Frontend\Block;
use Zend\View\Helper\AbstractHelper;

class Head extends AbstractHelper
{
    public function __invoke($action, $position)
    {
        $data = array('data' => array('action' => $action, 'position' => $position));
        /**
         * Vị trí hiển thị css, js
         *     top: hiển thị ở thẻ <head>
         *     bot: hiển thị trước thẻ đóng </body>
         * File yêu cầu đặt trong thư mục "template/frontend/"
         * Cú pháp tạo mảng:
         *         '<Vị trí hiển thị>' => array(
         *           '<action>' => array(
         *               'css' => array(<file css>), // chú ý vị trí trước sau các file
         *               'js' => array(<file js>) // chú ý vị trí trước sau các file
         *             ),
         *         )
         */
        $data['head'] = array(
            'top' => array(
                'global' => array(
                    'css' => array('global.css'),
                    'js' => array('global.js')
                ),
                // Page theo yêu cầu
                'home' => array(
                    'css' => array('page_home.css'),
                    'js' => array('v_wow.js','page_home.js')
                ),
                'html-page32' => array('css' => 'page_cam-ket.css'),
                'news-list21' => array('css' => 'page_news.css'),
                'news-detail25' => array(
                    'css' => array('page_news.css','page_news-detail.css'),
                    'js' => 'page_autoContent.js'
                ),
                'product-list11' => array('css' => 'page_product-list.css', 'js' => 'page_product-list.js'),
                'product-list12' => array('css' => 'page_combo.css'),
                'product-detail15' => array(
                    'css' => array('v_lightgallery.css','v_fancybox.css','v_image-uploader.css','page_product-detail.css'),
                    'js' => array('v_lightgallery.js','v_fancybox.js','v_image-uploader.js','page_product-detail.js')
                ),
                'product-detail16' => array('css' => 'page_combo.css', 'js' => 'page_combo.js'),
                'search' => array(
                    'css' => 'page_product-list.css',
                    'js' => 'page_product-list.js'
                ),
                'order-cart' => array('css' => 'page_cart.css', 'js' => 'page_cart.js'),
                'order-detail' => array('css' => 'page_order-detail.css'),
                'order-booking' => array('css' => 'page_cart.css', 'js' => 'page_booking.js'),
                'payment-booking' => array('css' => 'page_thank-you.css'),
                'member-profile' => array('css' => 'page_customer.css'),
            ),
            'bot' => array(

            )
        );
        // $data = $this->view->partial('block/head/head-src.phtml',$data); // Code
        // $data = $this->view->partial('block/head/head-internal-page.phtml',$data); // External(global), Internal(page) (*)
        $data = $this->view->partial('block/head/head-internal-all.phtml',$data); // Internal(global, page)
        echo $data;
    }
}