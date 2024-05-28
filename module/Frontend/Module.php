<?php

namespace Frontend;

use Zend\Mvc\MvcEvent;
use Zend\Mvc\ModuleRouteListener;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $serviceManager = $e->getApplication()->getServiceManager();
        $eventManager = $e->getApplication()->getEventManager();

        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        // Redirect
        $eventManager->attach(MvcEvent::EVENT_ROUTE, array($this, 'checkRedirect'), 100);

        // Error
        $eventManager->attach(array(MvcEvent::EVENT_DISPATCH_ERROR, MvcEvent::EVENT_DISPATCH), array($this,'onDispatchError'), -100);

        // View
        $eventManager->attach(MvcEvent::EVENT_DISPATCH, array($this,'setLayout'), 100);

        // Cache
        $eventManager->attach(MvcEvent::EVENT_RENDER, function($e) use ($serviceManager) {
            $params = $e->getRouteMatch()->getParams();
            $module = substr($params['__NAMESPACE__'], 0, strpos($params['__NAMESPACE__'], '\\'));
            if ($module == __NAMESPACE__) {
                $response = $e->getResponse();
                $cache = $serviceManager->get(CACHE_NAME);
                $cache->clearExpired();
                if (!empty(CACHE_KEY) && $response->getContent()) {
                    $cache->setItem(CACHE_KEY, $response->getContent());
                }
            } else {
                // Xóa cache || Chọn 1 trong 3 kiểu
                $serviceManager->get(CACHE_NAME)->clearByNamespace('zfcache'); // Xóa cache filesystem
                // $serviceManager->get(CACHE_NAME)->flush(true); // Xóa cache mencached
                // array_map('unlink', glob(CACHE_PATH.'/cached-*')); // Xóa cache html
            }
        }, -100);
    }

    public function setLayout($e)
    {
        $serviceManager = $e->getApplication()->getServiceManager();
        $eventManager = $e->getApplication()->getEventManager();

        $params = $e->getRouteMatch()->getParams();
        $module = substr($params['__NAMESPACE__'], 0, strpos($params['__NAMESPACE__'], '\\'));
        if ($module == __NAMESPACE__) {
            // Layout
            $e->getViewModel()->setTemplate('layout/layout');
            // setTitle
            $eventManager->attach('render',array($this, 'setTitle'));
            // Cache
            $cache = $serviceManager->get(CACHE_NAME);
            if (!empty(CACHE_KEY) && $cache->hasItem(CACHE_KEY)) {
                $response = $e->getResponse();
                $response->setContent($cache->getItem(CACHE_KEY));
            }
        }
    }

    public function setTitle(MvcEvent $e)
    {
        $view = $e->getParam('application')->getMvcEvent()->getViewModel()->getChildren()[0];
        $image = $view->info['image'] ? $view->info['image'] : $view->info['logo'];
        $SEO = $view->params['seo'] ? $view->params['seo'] : $e->getRouteMatch()->getParam('seo');
        $SEO['image'] = (file_exists(ROOT_PUBLIC.'/'.$SEO['image']) && is_file(ROOT_PUBLIC.'/'.$SEO['image']))
                        ? URL.$SEO['image']
                        : URL.UPLOAD_IMAGES.date('Y/m',explode('-',$image)[0]).'/'.$image;

        $viewHelperManager = $e->getApplication()->getServiceManager()->get('viewHelperManager');
        $headTitle = $viewHelperManager->get('headTitle');
        $headTitle->append($SEO['title']);

        $parts = parse_url($SEO['url']);
        $url = $parts['scheme'] . '://' . $parts['host'] . $parts['path'];

        $headMeta = $viewHelperManager->get('headMeta');
        $headMeta()->appendName('description', $SEO['description'])
                    ->appendName('keywords', $SEO['keyword'])
                    ->appendName('web_author', 'IT - 369')
                    ->appendItemprop('name', $SEO['title'])
                    ->appendItemprop('image', $SEO['image'])
                    ->appendItemprop('description', $SEO['description'])
                    ->appendProperty('og:locale', 'vi_VN')
                    ->appendProperty('og:type', 'website')
                    ->appendProperty('og:url', $url)
                    ->appendProperty('og:title', $SEO['title'])
                    ->appendProperty('og:description', $SEO['description'])
                    ->appendProperty('og:image', $SEO['image'])
                    ->appendProperty('og:image:alt', $SEO['description'])
                    ->appendProperty('og:site_name', $SEO['site_name'])
                    ->appendName('twitter:card', 'summary')
                    ->appendName('twitter:title', $SEO['title'])
                    ->appendName('twitter:description', $SEO['description'])
                    ->appendName('twitter:image', $SEO['image'])
                    ->appendName('twitter:image:alt', $SEO['description']);

        if ($SEO['snippet']) {
            $snippet = array(
                "@context" => "http://schema.org",
                "name" => $view->info['name'],
                "@type" => "BreadcrumbList"
            );

            foreach ($SEO['snippet'] as $i => $value) {
                $snippet['itemListElement'][] = array_merge(
                    array(
                        '@type' => "ListItem",
                        'position' => $i + 1,
                        'name' => $value['title']
                    ),
                    // isset($value['link']) ? array('item' => URL.$value['link']) : array()
                    isset($value['link']) ? array('item' => URL.(preg_replace('/(-[0-9]+-[0-9]+\.html)$/', '', (end(explode(',',$value['link'])))))) : array()
                );
            }

            // Hiển thị trong tag <head>
            /*
                $headScript = $viewHelperManager->get('headScript');
                $headScript->appendScript(
                    json_encode($snippet, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ),
                    'application/ld+json',
                    array('noescape' => true)
                );
            */
            // Hiển thị trên tag </body>
            $inlineScript = $viewHelperManager->get('InlineScript');
            $inlineScript->captureStart('','application/ld+json');
            echo json_encode($snippet, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
            $inlineScript->captureEnd();
        }
    }

    public function checkRedirect(MvcEvent $e) {
        $Adapter = $e->getApplication()->getServiceManager()->get('Zend\Db\Adapter\Adapter');
        $redirect = $Adapter->query("SELECT * FROM redirect_tb WHERE url_old = '".str_replace(substr(PUBLIC_PATH, 0, -1), '', $_SERVER['REQUEST_URI'])."'", \Zend\Db\Adapter\Adapter::QUERY_MODE_EXECUTE)->current();

        if ($redirect) {
            $parse = parse_url($redirect->url_new);
            $response = $e->getResponse();
            $response->getHeaders()->addHeaderLine('Location', ($parse['host'] ? $redirect->url_new : substr(URL, 0, -1).$redirect->url_new));
            $response->setStatusCode(301);
            $response->sendHeaders();

            return $response;
        }
    }

    public function onDispatchError(MvcEvent $e)
    {
        $response = $e->getResponse();
        if ($response->getStatusCode() === 404) {
            foreach (file(ROOT_PUBLIC.'/404.html') as $value) { echo $value; }
            $response->setStatusCode(404);
            $response->sendHeaders();
            return $response;
        }
    }

    public function getConfig()
    {
        return include ROOT_PUBLIC.'/Frontend/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                ROOT_PUBLIC.'/Frontend/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => ROOT_PUBLIC.'/Frontend/src/'.__NAMESPACE__,
                ),
            ),
        );
    }
}
