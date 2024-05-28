<?php

// filesystem

return array(
    'caches' => array(
        'CacheFileSystem' => array(
            'adapter' => array(
                'name' => 'filesystem',
                'options' => array(
                    'ttl' => CACHE_TIME,
                    'cacheDir' => CACHE_PATH,
                    'namespace' => 'zfcache',
                    'dir_level' => 0,
                    'key_pattern' => null
                ),
            ),
            'plugins' => array('serializer'),
        ),
    ),
);


// memcache
/*
    return array(
        'caches' => array(
            'Memcached' => array(
                'adapter' => array(
                    'name' => 'memcache',
                    'options' => array(
                        'ttl' => CACHE_TIME,
                        'namespace' => DOMAIN,
                        'servers' => array(
                            'host' => '127.0.0.1',
                            'port' => '11211'
                        )
                    ),
                ),
                'plugins' => array('serializer'),
            ),
        ),
    );
*/