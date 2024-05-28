<?php
// Kiểm tra đang ở domain demo hay domain khách hàng để lấy thư mục và link trang chủ
$link_home = str_replace('index.php', '', $_SERVER['PHP_SELF']);
$lang = ($link_home != '/') ? explode('/', str_replace($link_home, '', $_SERVER['REQUEST_URI']))[0] : explode('/', $_SERVER['REQUEST_URI'])[1];
$slug = str_replace(array($link_home,'/'), array('','-'), $_SERVER['REQUEST_URI']);
$slug = (strpos($slug, '.html') > -1) ? ((strpos($slug, '.html?') > -1) ? '' : preg_replace('[/|.html.*]', '', $slug)) : $slug.'trang-chu';

define('API_KEY', '0bf6ae56517d11dd00f1b88c436aab7a');

// Cache || các file liên quan: module/Frontend/Module.php, config/autoload/cache.php
define('CACHE_TIME', 604800); // 604800
define('CACHE_KEY', $slug);
define('CACHE_PATH', realpath(dirname(__DIR__)) . '/data/cache');
define('CACHE_NAME', 'CacheFileSystem'); // CacheFileSystem / Memcached

// Login
define('FAIL_NUMBER', 5); // số lần đăng nhập
define('LOCK_EXPIRE', 900); // 15 phút

// Đường dẫn
define('ROOT', dirname(__DIR__));
define('ROOT_PUBLIC', realpath(dirname(__DIR__) . '/src'));
define('PUBLIC_PATH', $link_home);

define('DOMAIN', $_SERVER['SERVER_NAME']);
define('PROTOCOL', isset($_SERVER['HTTPS']) ? 'https://' : 'http://');
define('URL', PROTOCOL.DOMAIN.$link_home);

// Thiết lập biến ngôn ngữ || 'vi','en','de','fr','ja','ru','zh', default
if (!in_array($lang, array('en'))) { // Danh sách ngôn ngữ của website
    $lang = 'default'; // Ngôn ngữ hiển thị mặc định
    define('URL_LANG', URL);
} else {
    define('URL_LANG', URL.$lang.'/');
}
define('LANG', $lang);

// Upload
define('WEBP_EXT', '', true);
define('UPLOAD_FILES', 'uploads/files/');
define('UPLOAD_IMAGES', 'uploads/images/');
define('UPLOAD_REMOVES', 'uploads/removes/');

preg_match('/(admin\/en)|(admin\/vi)/', $_SERVER['REQUEST_URI'], $lang);
$lang = !empty($lang[0]) ? str_replace('admin/','', $lang[0]) : '';
define('BE_LANG_DEFAULT', 'vi'); // (en,vi) ngôn ngữ translate mặc định
define('BE_LANG', in_array($lang, array('vi','en')) ? $lang : BE_LANG_DEFAULT);
define('BE_TEMPLATE', PUBLIC_PATH.'template/backend');
define('BACKEND', 'module/Backend');

?>