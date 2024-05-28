<?php

return array(
    'db' => array(
        'driver'         => 'Pdo',
        'driver_options' => array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''),
        'dsn'            => 'mysql:dbname=thieuthi_yuzi;host=localhost',
    ),
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        )
    )
);

?>