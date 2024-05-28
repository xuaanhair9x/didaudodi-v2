<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
    error_reporting(1);
    chdir(dirname(__DIR__));
    if (php_sapi_name() === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) {
        return false;
    }
    include 'define.php';
    require 'init_autoloader.php';

    Zend\Mvc\Application::init(require 'config/application.config.php')->run();
?>
