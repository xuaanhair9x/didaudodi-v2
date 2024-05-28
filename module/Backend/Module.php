<?php

namespace Backend;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $serviceManager = $e->getApplication()->getServiceManager();
        $eventManager = $e->getApplication()->getEventManager();

        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        // Run
        // $eventManager->attach(MvcEvent::EVENT_ROUTE, array($this, 'checkRun'), 100);

        // Error
        // $eventManager->attach(MvcEvent::EVENT_DISPATCH_ERROR, function($e) {
        //     $e->getViewModel()->setTemplate('layout/error');
        //     $response = $e->getResponse();
        //     $response->setStatusCode(404);
        //     $response->sendHeaders();
        // }, 100);

        // View
        $eventManager->attach(MvcEvent::EVENT_DISPATCH, array($this, 'preDispatch'), 100);

        // Connect DB
        $Adapter = $serviceManager->get('Zend\Db\Adapter\Adapter');
        \Zend\Db\TableGateway\Feature\GlobalAdapterFeature::setStaticAdapter($Adapter);

        // Check webp supported
        $eventManager->attach(MvcEvent::EVENT_ROUTE, array($this, 'checkWebpSupported'), 100);
    }

    public function preDispatch($e)
    {
    	$arrParams = $e->getRouteMatch()->getParams();
        $module = substr($arrParams['__NAMESPACE__'], 0, strpos($arrParams['__NAMESPACE__'], '\\'));

        if ($module == __NAMESPACE__) {
            // Layout
            $e->getViewModel()->setTemplate('layout/backend');
            // setTitle
            $e->getApplication()->getEventManager()->attach('render',array($this, 'setTitle'));
            // Redirect
            $authService = $e->getApplication()->getServiceManager()->get('HitechAuth');
            $arrAcls = $authService->checkAcl($arrParams);
            if ($arrAcls && $arrParams['action'] != $arrAcls['action']) {
                $url = URL.'admin/'.(BE_LANG != BE_LANG_DEFAULT ? BE_LANG.'/' : '').$arrAcls['view'];
                $response = $e->getResponse();
                $response->getHeaders()->addHeaderLine('Location', $url);
                $response->setStatusCode(302);
                $response->sendHeaders();
            }
        }
    }

    public function setTitle($e)
    {
        $matches = $e->getRouteMatch()->getParams();
        $viewHelperManager = $e->getApplication()->getServiceManager()->get('viewHelperManager');
        $headTitle = $viewHelperManager->get('headTitle');
        $headTitle->append($matches['title']);
    }

    public function checkWebpSupported(MvcEvent $e) {
        $Adapter = $e->getApplication()->getServiceManager()->get('Zend\Db\Adapter\Adapter');
        $info = $Adapter->query("SELECT * FROM menu_code_tb WHERE id = 36", \Zend\Db\Adapter\Adapter::QUERY_MODE_EXECUTE)->current();
        $define = json_decode($info->define, true);
        define('WEBP_CONVERT', empty($define['webp']) ? false : true);
        define('WEBP_EXT', (WEBP_CONVERT && strpos($_SERVER['HTTP_ACCEPT'], 'image/webp') !== false) ? '.webp' : '');
    }

    public function getConfig()
    {
        return include  BACKEND.'/config/module.config.php';
    }

    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'Zend\Db\Adapter\Adapter' => function ($serviceManager) {
                    $adapterFactory = new \Zend\Db\Adapter\AdapterServiceFactory();
                    $adapter = $adapterFactory->createService($serviceManager);
                    \Zend\Db\TableGateway\Feature\GlobalAdapterFeature::setStaticAdapter($adapter);
                    return $adapter;
                },
                'AuthenticateService' => function($serviceManager) {
                    $zendDb = \Zend\Db\TableGateway\Feature\GlobalAdapterFeature::getStaticAdapter();
                    $dbTableAdapter = new \Zend\Authentication\Adapter\DbTable($zendDb);
                    $authenticateServiceObj = new \Zend\Authentication\AuthenticationService(null, $dbTableAdapter);
                    return $authenticateServiceObj;
                },
                'HitechAuth' => function($serviceManager) {
                    return new \Backend\View\Helper\System\Authenticate($serviceManager->get('AuthenticateService'));
                }
            )
        );
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => BACKEND .'/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
}
