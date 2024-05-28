<?php

namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class Crypt extends AbstractHelper
{
    public static function encodePassword($str)
    {
        return md5(sha1('dUWmorBSmX9dxYx5tynbsCsmxYxjJEchhjSCchhqfvJsKQJNchhjJEnbsCsmxYxjJEOxajSCchhjJEBSmjSCOxaFw6chhDfzsgdd4hZPAZPAttsguserthuong' . base64_encode($str)));
    }

    public static function encrypt($str)
    {
        if (OPENSSL_VERSION_NUMBER <= 268443727) {
            throw new RuntimeException('OpenSSL Version too old, vulnerability to Heartbleed');
        }

        if (count(explode(":hitech:", $str)) == 2) {
            return $str;
        }
        $iv_size        = openssl_cipher_iv_length('aes-256-cbc');
        $iv             = openssl_random_pseudo_bytes($iv_size);
        $ciphertext     = openssl_encrypt($str, 'aes-256-cbc', API_KEY, OPENSSL_RAW_DATA, $iv);
        $ciphertext_hex = bin2hex($ciphertext);
        $iv_hex         = bin2hex($iv);
        return $iv_hex.':hitech:'.$ciphertext_hex;
    }

    public static function decrypt($ciphered)
    {
        $iv_size    = openssl_cipher_iv_length('aes-256-cbc');
        $data       = explode(":hitech:", $ciphered);
        $iv         = hex2bin($data[0]);
        $ciphertext = hex2bin($data[1]);
        return openssl_decrypt($ciphertext, 'aes-256-cbc', API_KEY, OPENSSL_RAW_DATA, $iv);
    }
}

?>