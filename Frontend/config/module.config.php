<?php

$arrConfig = array(
    'service_manager' => array(
        'aliases' => array(
            'translator' => 'MvcTranslator',
        )
    ),
    'translator' => array(
        'locale' => LANG,
        'translation_file_patterns' => array(
            array(
                'type'     => 'phpArray',
                'base_dir' => ROOT_PUBLIC.'/Frontend/language',
                'pattern'  => '%s.php',
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Frontend\Controller\Ajax'          => 'Frontend\Controller\AjaxController',
            'Frontend\Controller\Contact'       => 'Frontend\Controller\ContactController',
            'Frontend\Controller\Cron'          => 'Frontend\Controller\CronController',
            'Frontend\Controller\Html'          => 'Frontend\Controller\HtmlController',
            'Frontend\Controller\Index'         => 'Frontend\Controller\IndexController',
            'Frontend\Controller\Member'        => 'Frontend\Controller\MemberController',
            'Frontend\Controller\News'          => 'Frontend\Controller\NewsController',
            'Frontend\Controller\Order'         => 'Frontend\Controller\OrderController',
            'Frontend\Controller\Product'       => 'Frontend\Controller\ProductController',
            'Frontend\Controller\Search'        => 'Frontend\Controller\SearchController',
            'Frontend\Controller\Vnpay'        => 'Frontend\Controller\VnpayController',
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason'    => true,
        'display_exceptions'          => true,
        'doctype'                     => 'HTML5',
        'not_found_template'          => 'error/404',
        'exception_template'          => 'error/index',
        'template_map' => array(
            include(__DIR__ . '/../template_map.php')
            // 'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            // 'error/404'               => __DIR__ . '/../view/error/404.phtml',
            // 'error/index'             => __DIR__ . '/../view/error/index.phtml',
            // 'block/pagination'        => __DIR__ . '/../view/block/pagination.phtml',
        ),
        'template_path_stack' => array(__DIR__ . '/../view')
    ),
    'view_helpers' => array(
        'invokables' => array(
            'block1'                => 'Frontend\Block\Block1',
            'block2'                => 'Frontend\Block\Block2',
            'block3'                => 'Frontend\Block\Block3',
            'block4'                => 'Frontend\Block\Block4',
            'block5'                => 'Frontend\Block\Block5',
            'blockVideo'            => 'Frontend\Block\BlockVideo',
            'blockSlideCate'        => 'Frontend\Block\BlockSlideCate',
            'bgHeader'              => 'Frontend\Block\bgHeader',
            'header'                => 'Frontend\Block\Header',
            'footer'                => 'Frontend\Block\Footer',
            'sidebar'               => 'Frontend\Block\Sidebar',
            'sidebarNews'           => 'Frontend\Block\SidebarNews',
            'sidebarNewsFilter'     => 'Frontend\Block\SidebarNewsFilter',
            'sidebarProductFilter'           => 'Frontend\Block\SidebarProductFilter',
            'commentNormal'         => 'Frontend\Block\CommentNormal',
            'commentProduct'        => 'Frontend\Block\CommentProduct',
            'head'                  => 'Frontend\Block\Head',
            'breadcrumb'            => 'Frontend\Block\Breadcrumb',
            'toSlug'                => 'Frontend\View\Helper\ToSlug',
            'cutString'             => 'Frontend\View\Helper\CutString',
            'getYT'                 => 'Frontend\View\Helper\YoutubeID',
            'sortByColumn'          => 'Frontend\View\Helper\SortByColumn',
            'sortNestedCate'        => 'Frontend\View\Helper\SortNestedCate',
            'counter'               => 'Frontend\View\Helper\Counter\Counter',
            'convertWebpEditor'     => 'Frontend\View\Helper\ConvertWebpEditor',
            'timeElapsedString'     => 'Frontend\View\Helper\TimeElapsedString',
            'writeLog'              => 'Frontend\View\Helper\WriteLog',
        ),
    ),
    'router' => array(
        'routes' => array(
            'frontend' => array(
                'type'    => 'Literal',
                'options' => array(
                    'route'    => '/frontend',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Frontend\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route' => '/[/:module][:controller][/:action][/id=:id]',
                            'constraints' => array(
                                '__NAMESPACE__' => 'Frontend\Controller',
                                'controller'  => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'id'          => '[0-9,]+'
                            ),
                            'defaults' => array(),
                        ),
                    ),
                ),
            ),
        ),
    )
);
$list_lang = array(''); // '/vi','/en','/de','/fr','/ja','/ru','/zh'
// Tạo link list module
$arrModule = array(
    // cũ
    'no_action_number' => array('Cron' => array('sitemap')),
    'no_id' => array(
        'Ajax' => array('ajax81' => 81, 'ajax82' => 82, 'ajax83' => 83, 'ajax84' => 84, 'ajax85' => 85, 'ajax86' => 86, 'ajax87' => 87, 'ajax88' => 88),
        'Member' => array('login' => 55, 'profile' => 71,'signUp' => 72,'signIn' => 73,'signOut' => 74, 'password' => 75, 'post' => 76, 'list' => 77, 'detail' => 78),
        'Order' => array('cart' => 61, 'booking' => 62, 'list' => 63, 'detail' => 64, 'discount' => 65, 'payment' => 66), // 'list' => 63, 'detail' => 64, 'discount' => 65
        'Search' => array('search:ispaging' => 99),
        'Contact' => array('index' => 51, 'register' => 52, 'comment' => 54) // 'register' => 52, 'subscriber' => 53, 'comment' => 54
    ),

    // mới
    'menu' => array(
        'Product' => array(
            array('slug' => 'san-pham', 'id' => 1, 'action_number' => 11),
            array('slug' => 'combo', 'id' => 16, 'action_number' => 12),
        ),
        'News' => array(
            array('slug' => 'kinh-nghiem', 'id' => 6, 'action_number' => 21),
        ),
        'Html' => array(
            array('slug' => 've-chung-toi', 'id' => 1, 'action_number' => 31, 'action' => 'page'),
            array('slug' => 'cam-ket', 'id' => 2, 'action_number' => 32, 'action' => 'page'),
        )
    ),
    'filter' => array(
        'Product' => array(
            array('slug' => 'sale', 'menu_id' => 39, 'root_id' => 1, 'action_number' => 11, 'shortcut' => 'mn'),
        ),
        'News' => array(
            array('slug' => 'tong-hop-chu-de', 'menu_id' => 42, 'root_id' => 6, 'action_number' => 21, 'shortcut' => 'mn'),
        )
    ),
);

$dbconfig = include 'config/autoload/local.php';
$conn = new mysqli('localhost', $dbconfig['db']['username'], $dbconfig['db']['password'], $dbconfig['db']['database']);
$conn->set_charset("utf8");

// tạo link chi tiết + danh mục Sản phẩm list11 - detail15
$ProductCatLv1 = $conn->query('SELECT id, slug, list_label_id FROM product_cat_tb WHERE parent = 1 AND display = 1');
while($cateLv1 = $ProductCatLv1->fetch_assoc()) {
    //tạo link danh mục cấp 1
    $arrModule['menu']['Product'][] = array('slug' => $cateLv1['slug'], 'id' => $cateLv1['id'], 'action_number' => 11);

    //tạo link phân loại
    if($cateLv1['list_label_id']) {
        $listLabelId = str_replace(':','\'', $cateLv1['list_label_id']);
        $listLabel = $conn->query('SELECT id, slug FROM product_label_tb WHERE id IN ('.$listLabelId.') AND display = 1');
        while($labelItem = $listLabel->fetch_assoc()) {
            $arrModule['menu']['Product'][] = array('slug' => $cateLv1['slug'].'-'.$labelItem['slug'], 'id' => $cateLv1['id'], 'action_number' => 11, 'label_id' => $labelItem['id'], 'shortcut' => 'lb');
        }
    }

    // tạo link chi tiết sản phẩm nếu map với danh mục cấp 1
    $listProductLv1 = $conn->query('SELECT id, slug, cat_id FROM product_tb WHERE cat_id = '.$cateLv1['id'].' AND display = 1');
    while($product = $listProductLv1->fetch_assoc()) {
        $arrModule['detail']['Product'][] = array('slug' => $cateLv1['slug'].'/'.$product['slug'], 'id' => $product['id'], 'cat_id' => $product['cat_id'], 'action_number' => 15);
    }

    // tạo link danh mục cấp 2
    $listCatLv2 = $conn->query('SELECT id, slug FROM product_cat_tb WHERE parent = '.$cateLv1['id'].' AND display = 1');
    while($cateLv2 = $listCatLv2->fetch_assoc()) {
        $arrModule['menu']['Product'][] = array('slug' => $cateLv1['slug'].'-'.$cateLv2['slug'], 'id' => $cateLv2['id'], 'action_number' => 11);

        // tạo link chi tiết sản phẩm nếu map với danh mục cấp 2
        $listProductLv2 = $conn->query('SELECT id, slug, cat_id FROM product_tb WHERE cat_id = '.$cateLv2['id'].' AND display = 1');
        while($product = $listProductLv2->fetch_assoc()) {
            $arrModule['detail']['Product'][] = array('slug' => $cateLv1['slug'].'/'.$product['slug'], 'id' => $product['id'], 'cat_id' => $product['cat_id'], 'action_number' => 15);
        }
    }
}

// tạo link chi tiết Combo list12 - detail16
$listCombo = $conn->query('SELECT id, slug, cat_id FROM product_tb WHERE cat_id = 16 AND display = 1');
while($combo = $listCombo->fetch_assoc()) {
    $arrModule['detail']['Product'][] = array('slug' => 'combo/'.$combo['slug'], 'id' => $combo['id'], 'cat_id' => $combo['cat_id'], 'action_number' => 16);
}

// tạo link chi tiết Tin khuyến mãi - detail26
$newsSale = $conn->query('SELECT id, slug, cat_id FROM news_tb WHERE cat_id = 19 AND display = 1');
while($news = $newsSale->fetch_assoc()) {
    $arrModule['detail']['News'][] = array('slug' => $news['slug'], 'id' => $news['id'], 'cat_id' => $news['cat_id'], 'action_number' => 26);
}

// tạo link chi tiết Tin chính sách - detail26
$listCatRules = $conn->query('SELECT id, slug FROM news_cat_tb WHERE parent = 1 AND display = 1');
while($cateRules = $listCatRules->fetch_assoc()) {
    // tạo link chi tiết sản phẩm nếu map với danh mục cấp 1
    $listRules = $conn->query('SELECT id, slug, cat_id FROM news_tb WHERE cat_id = '.$cateRules['id'].' AND display = 1');
    while($rules = $listRules->fetch_assoc()) {
        $arrModule['detail']['News'][] = array('slug' => $rules['slug'], 'id' => $rules['id'], 'cat_id' => $rules['cat_id'], 'action_number' => 26);
    }
}

// tạo link chi tiết + danh mục Kinh nghiệm list21 - detail25
$NewsCatLv1 = $conn->query('SELECT id, slug FROM news_cat_tb WHERE parent = 6');
while($cateLv1 = $NewsCatLv1->fetch_assoc()) {
    //tạo link danh mục cấp 1
    $arrModule['menu']['News'][] = array('slug' => $cateLv1['slug'], 'id' => $cateLv1['id'], 'action_number' => 21);

    // tạo link chi tiết sản phẩm nếu map với danh mục cấp 1
    $listNewsLv1 = $conn->query('SELECT id, slug, cat_id FROM news_tb WHERE cat_id = '.$cateLv1['id'].' AND display = 1');
    while($news = $listNewsLv1->fetch_assoc()) {
        $arrModule['detail']['News'][] = array('slug' => $cateLv1['slug'].'/'.$news['slug'], 'id' => $news['id'], 'cat_id' => $news['cat_id'], 'action_number' => 25);
    }

    // tạo link danh mục cấp 2
    $NewsCatLv2 = $conn->query('SELECT id, slug FROM news_cat_tb WHERE parent = '.$cateLv1['id'].' AND display = 1');
    while($cateLv2 = $NewsCatLv2->fetch_assoc()) {
        $arrModule['menu']['News'][] = array('slug' => $cateLv2['slug'], 'id' => $cateLv2['id'], 'action_number' => 21);

        // tạo link chi tiết sản phẩm nếu map với danh mục cấp 2
        $listNewsLv2 = $conn->query('SELECT id, slug, cat_id FROM news_tb WHERE cat_id = '.$cateLv2['id'].' AND display = 1');
        while($news = $listNewsLv2->fetch_assoc()) {
            $arrModule['detail']['News'][] = array('slug' => $cateLv1['slug'].'/'.$news['slug'], 'id' => $news['id'], 'cat_id' => $news['cat_id'], 'action_number' => 25);
        }
    }
}

// đóng connect db
$conn->close();

foreach ($list_lang as $vl_lang) {
    foreach ($arrModule['no_action_number'] as $module => $arrAction) {
        foreach ($arrAction as $action_name) {
            $arrConfig['router']['routes'][] = array(
                'type' => 'Literal',
                'options' => array (
                    'route' => '/'.$action_name.'.html',
                    'defaults' => array (
                        '__NAMESPACE__' => 'Frontend\Controller',
                        'controller' => 'Frontend\Controller\\'.$module,
                        'action' => $action_name,
                    ),
                )
            );
        }
    }
    foreach ($arrModule['no_id'] as $module => $arrAction) {
        foreach ($arrAction as $action_name => $action_number) {
            $arr = explode(':', $action_name);
            $action_name = $arr[0];
            $arrConfig['router']['routes'][] = array(
                'type' => 'regex',
                'options' => array (
                    'regex' => $vl_lang.'/(?<slug>[a-zA-Z0-9-]+)-(?<format>('.$action_number.'.html))?',
                    'defaults' => array (
                        '__NAMESPACE__' => 'Frontend\Controller',
                        'controller' => 'Frontend\Controller\\'.$module,
                        'action' => $action_name,
                    ),
                    'spec' => '%slug%-%format%'
                )
            );
        }
    }
    foreach ($arrModule['menu'] as $module => $arrAction) {
        foreach ($arrAction as $value) {
            $defaults = array (
                '__NAMESPACE__' => 'Frontend\Controller',
                'controller' => 'Frontend\Controller\\'.$module,
                'id' => $value['id'],
                'slug' => $value['slug'],
                'action' => $value['action'] ? $value['action'].($module != "Contact" ? $value['action_number']:'') : 'list'.$value['action_number'],
                'format' => $value['action_number']
            );

            if($value['label_id']) {
                $defaults['label_id'] = $value['label_id'];
                $defaults['shortcut'] = $value['shortcut'];
            }

            $arrConfig['router']['routes'][] = array(
                'type' => 'Literal',
                'options' => array (
                    'route' => $vl_lang.'/'.$value['slug'],
                    'defaults' => $defaults
                )
            );
        }
    }
    foreach ($arrModule['detail'] as $module => $arrAction) {
        foreach ($arrAction as $value) {
            $arrConfig['router']['routes'][] = array(
                'type' => 'Literal',
                'options' => array (
                    'route' => $vl_lang.'/'.$value['slug'],
                    'defaults' => array (
                        '__NAMESPACE__' => 'Frontend\Controller',
                        'controller' => 'Frontend\Controller\\'.$module,
                        'id' => $value['id'],
                        'cat_id' => $value['cat_id'],
                        'slug' => $value['slug'],
                        'action' => 'detail'.$value['action_number'],
                        'format' => $value['action_number']
                    )
                )
            );
        }
    }
    foreach ($arrModule['filter'] as $module => $arrAction) {
        foreach ($arrAction as $value) {
            $arrConfig['router']['routes'][] = array(
                'type' => 'Literal',
                'options' => array (
                    'route' => $vl_lang.'/'.$value['slug'],
                    'defaults' => array (
                        '__NAMESPACE__' => 'Frontend\Controller',
                        'controller' => 'Frontend\Controller\\'.$module,
                        'id' => $value['root_id'],
                        'slug' => $value['slug'],
                        'action' => $value['action'] ? $value['action'].($module != "Contact" ? $value['action_number']:'') : 'list'.$value['action_number'],
                        'menu_id' => $value['menu_id'],
                        'shortcut' => $value['shortcut'],
                        'format' => $value['action_number']
                    )
                )
            );
        }
    }
}

// Tạo link trang chủ
foreach (array_filter($list_lang) as $vl_lang) {
    $arrConfig['router']['routes'][] = array(
        'type'    => 'Zend\Mvc\Router\Http\Literal',
        'options' => array(
            'route' => $vl_lang,
            'defaults' => array(
                '__NAMESPACE__' => 'Frontend\Controller',
                'controller'    => 'Frontend\Controller\Index',
                'action'        => 'index',
            ),
        ),
    );
    $arrConfig['router']['routes'][] = array(
        'type' => 'Zend\Mvc\Router\Http\Literal',
        'options' => array(
            'route'    => $vl_lang.'/',
            'defaults' => array(
                '__NAMESPACE__' => 'Frontend\Controller',
                'controller'    => 'Frontend\Controller\Index',
                'action'        => 'index',
            ),
        ),
    );
}
$arrConfig['router']['routes'][] = array(
    'type' => 'Zend\Mvc\Router\Http\Literal',
    'options' => array(
        'route'    => '/',
        'defaults' => array(
            '__NAMESPACE__' => 'Frontend\Controller',
            'controller'    => 'Frontend\Controller\Index',
            'action'        => 'index',
        ),
    ),
);
$arrConfig['router']['routes'][] = array(
    'type' => 'Zend\Mvc\Router\Http\Literal',
    'options' => array(
        'route'    => '/vnpayipn',
        'defaults' => array(
            '__NAMESPACE__' => 'Frontend\Controller',
            'controller'    => 'Frontend\Controller\vnpay',
        ),
    ),
);
return $arrConfig;

?>