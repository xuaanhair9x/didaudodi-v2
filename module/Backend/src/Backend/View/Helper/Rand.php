<?php

namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class Rand extends AbstractHelper
{
    public static function string($length = 8, $complex = 4)
    {
        $min = "abcdefghijklmnopqrstuvwxyz";
        $num = "0123456789";
        $maj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $symb = "!@#$&*";
        $chars = $min;
        if ($complex >= 2) { $chars .= $num; }
        if ($complex >= 3) { $chars .= $maj; }
        if ($complex >= 4) { $chars .= $symb; }
        return substr( str_shuffle( $chars ), 0, $length );
    }
}
