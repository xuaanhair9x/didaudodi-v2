<?php
namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class FormatCurrency extends AbstractHelper
{
    public function __invoke($number, $decimal = 3) {
        return  preg_replace("/\.?0+$/", "", number_format($number, $decimal, '.', ','));
    }
}