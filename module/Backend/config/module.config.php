<?php
    $lang = (BE_LANG != BE_LANG_DEFAULT) ? '/'.BE_LANG : '';
    return array(
        'service_manager' => array(
            'aliases' => array(
                'translator' => 'MvcTranslator',
            ),
            'invokables' => array(
                'Zend\Authentication\AuthenticationService' => 'Zend\Authentication\AuthenticationService'
            )
        ),
        'translator' => array(
            'locale' => BE_LANG,
            'translation_file_patterns' => array(
                array(
                    'type'     => 'phpArray',
                    'base_dir' =>  ROOT.'/module/Backend/language',
                    'pattern'  => '%s.php'
                ),
            ),
        ),
        'view_manager' => array(
            'display_not_found_reason'  => true,
            'display_exceptions'        => true,
            'doctype'                   => 'HTML5',
            'not_found_template'        => 'error/404',
            'exception_template'        => 'error/index',
            'template_map' => array(
                'layout/login'          => BACKEND . '/view/layout/login.phtml',
                'layout/backend'        => BACKEND . '/view/layout/layout.phtml',
                'layout/error'          => BACKEND . '/view/layout/error.phtml',
                'backend/index/index'   => BACKEND . '/view/backend/index/index.phtml',
                'error/404'             => BACKEND . '/view/error/404.phtml',
                'error/index'           => BACKEND . '/view/error/index.phtml',
            ),
            'template_path_stack' => array(BACKEND . '/view'),
        ),
        'view_helpers' => array(
            'invokables' => array(
                'code'                  => 'Backend\View\Helper\Api\Code',
                'cateSortNested'        => 'Backend\View\Helper\CateSortNested',
                'removeElementArray'    => 'Backend\View\Helper\RemoveElementArray',
                'formatCurrency'           => 'Backend\View\Helper\FormatCurrency',
                'sortByColumn'          => 'Backend\View\Helper\SortByColumn',
            ),
        ),
        'controllers' => array(
            'invokables' => array(
                'Backend\Controller\AdminRoleTb'        => 'Backend\Controller\AdminRoleTbController',
                'Backend\Controller\AdminSessionTb'     => 'Backend\Controller\AdminSessionTbController',
                'Backend\Controller\AdminTb'            => 'Backend\Controller\AdminTbController',
                'Backend\Controller\BannerTb'           => 'Backend\Controller\BannerTbController',
                'Backend\Controller\CommentTb'          => 'Backend\Controller\CommentTbController',
                'Backend\Controller\ContactTb'          => 'Backend\Controller\ContactTbController',
                'Backend\Controller\EmailTemplateTb'    => 'Backend\Controller\EmailTemplateTbController',
                'Backend\Controller\HtmlTb'             => 'Backend\Controller\HtmlTbController',
                'Backend\Controller\InfoTb'             => 'Backend\Controller\InfoTbController',
                'Backend\Controller\LangMultiTb'        => 'Backend\Controller\LangMultiTbController',
                'Backend\Controller\MemberTb'           => 'Backend\Controller\MemberTbController',
                'Backend\Controller\MenuCodeTb'         => 'Backend\Controller\MenuCodeTbController',
                'Backend\Controller\MenuPublicTb'       => 'Backend\Controller\MenuPublicTbController',
                'Backend\Controller\NewsCatTb'          => 'Backend\Controller\NewsCatTbController',
                'Backend\Controller\NewsLabelTb'        => 'Backend\Controller\NewsLabelTbController',
                'Backend\Controller\NewsTagTb'          => 'Backend\Controller\NewsTagTbController',
                'Backend\Controller\NewsSelectTb'       => 'Backend\Controller\NewsSelectTbController',
                'Backend\Controller\NewsTb'             => 'Backend\Controller\NewsTbController',
                'Backend\Controller\OrderTb'            => 'Backend\Controller\OrderTbController',
                'Backend\Controller\ProductBrandTb'     => 'Backend\Controller\ProductBrandTbController',
                'Backend\Controller\ProductCatTb'       => 'Backend\Controller\ProductCatTbController',
                'Backend\Controller\ProductDiscountTb'  => 'Backend\Controller\ProductDiscountTbController',
                'Backend\Controller\ProductLabelTb'     => 'Backend\Controller\ProductLabelTbController',
                'Backend\Controller\ProductSelectTb'    => 'Backend\Controller\ProductSelectTbController',
                'Backend\Controller\ProductTagTb'       => 'Backend\Controller\ProductTagTbController',
                'Backend\Controller\ProductTb'          => 'Backend\Controller\ProductTbController',
                'Backend\Controller\RedirectTb'         => 'Backend\Controller\RedirectTbController',
                'Backend\Controller\SectionTb'          => 'Backend\Controller\SectionTbController',
                'Backend\Controller\SubscriberTb'       => 'Backend\Controller\SubscriberTbController',
                'Backend\Controller\Index'              => 'Backend\Controller\IndexController',
                'Backend\Controller\Login'              => 'Backend\Controller\LoginController',
            ),
        ),
        'router' => array(
            'routes' => array(
                'admincp' => array(
                    'type'    => 'segment',
                    'options' => array(
                        'route' => '/admin'.$lang.'[/:controller][/:action][/id=:id][/root_id=:root_id]',
                        'constraints' => array(
                            'controller'  => '[a-zA-Z][a-zA-Z0-9_-.]*',
                            'action'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                            'id'          => '[0-9,]+',
                            'root_id'     => '[0-9]+'
                        ),
                    ),
                ),
                'login' => array(
                    'type' => 'Literal',
                    'options' => array (
                        'route' => '/admin'.$lang.'/login.html',
                        'defaults' => array (
                            '__NAMESPACE__' => 'Backend\Controller',
                            'controller'    => 'Backend\Controller\login',
                            'action'        => 'login',
                        ),
                    )
                ),
                'ht-login' => array(
                    'type' => 'Literal',
                    'options' => array (
                        'route' => '/admin'.$lang.'/ht-login.html',
                        'defaults' => array (
                            '__NAMESPACE__' => 'Backend\Controller',
                            'controller'    => 'Backend\Controller\login',
                            'action'        => 'login',
                            'supper'        => 1
                        ),
                    )
                ),
                'change' => array(
                    'type' => 'Literal',
                    'options' => array (
                        'route' => '/admin'.$lang.'/change.html',
                        'defaults' => array (
                            '__NAMESPACE__' => 'Backend\Controller',
                            'controller'    => 'Backend\Controller\login',
                            'action'        => 'change',
                        ),
                    )
                ),
                'reset' => array(
                    'type' => 'Literal',
                    'options' => array (
                        'route' => '/admin'.$lang.'/reset.html',
                        'defaults' => array (
                            '__NAMESPACE__' => 'Backend\Controller',
                            'controller'    => 'Backend\Controller\login',
                            'action'        => 'reset',
                        ),
                    )
                ),
                'blocked' => array(
                    'type' => 'Literal',
                    'options' => array (
                        'route' => '/admin'.$lang.'/blocked.html',
                        'defaults' => array (
                            '__NAMESPACE__' => 'Backend\Controller',
                            'controller'    => 'Backend\Controller\login',
                            'action'        => 'blocked',
                        ),
                    )
                ),
                'backend' => array(
                    'type'    => 'Literal',
                    'options' => array(
                        'route'    => '/admin'.$lang,
                        'defaults' => array(
                            '__NAMESPACE__' => 'Backend\Controller',
                            'controller'    => 'Backend\Controller\index',
                            'action'        => 'index',
                        ),
                    ),
                    'may_terminate' => true,
                    'child_routes' => array(
                        'default' => array(
                            'type'    => 'Segment',
                            'options' => array(
                                'route' => '/[/:module][:controller][/:action][/id=:id][/root_id=:root_id]',
                                'constraints' => array(
                                    'controller'  => '[a-zA-Z][a-zA-Z0-9_-]*',
                                    'action'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                                    'id'          => '[0-9,]+',
                                    'root_id'     => '[0-9]+'
                                ),
                                'defaults' => array(),
                            ),
                        ),
                    ),
                ),
            ),
        ),
    );

?>
