<?php

namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class CutString extends AbstractHelper
{
    public function __invoke($str, $length)
    {
        $words = preg_split("/[\n\r\t ]+/", $str, $length + 1, PREG_SPLIT_NO_EMPTY);
        if ( count($words) > $length ) {
            array_pop($words);
            $str = implode(' ', $words) . '...';
        }
        return $str;
    }
}