<?php

namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class Sqlinjection extends AbstractHelper
{
    public static function string($string = NULL)
    {
        $kq = htmlspecialchars($string);
        if(is_string($string)){
            $kq = str_replace('"','',$string);
            $kq = str_replace("'","",$string);
        }
        return $kq;
    }
}