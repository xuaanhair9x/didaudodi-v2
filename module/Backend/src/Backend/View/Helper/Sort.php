<?php
namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class Sort extends AbstractHelper
{
    /**
    * Sort data multi input
    *
    * @param (array) $data
    * @param (array) $config
    *
    */
    public static function multiData(&$data, $config)
    {
        $sorts = array_reduce($config, function($carry = array(), $item) {
            if (!empty($item['sort'])) {
                $carry[] = $item['name'];
            }

            return $carry;
        });

        foreach ($sorts as $item) {
            usort($data[$item], function($a, $b) {
                return $a['sort'] <=> $b['sort'];
            });
        }
    }

    public static function sortByKey($data, $sortKey = 'sort', $sortDefault = 100)
    {
        usort($data, function ($item1, $item2) use ($sortKey, $sortDefault) {
            $val1 = $item1[$sortKey];
            $val2 = $item2[$sortKey];
            $val1 = $val1 == '' ? $sortDefault : $val1;
            $val2 = $val2 == '' ? $sortDefault : $val2;
            return $val1 <=> $val2;
        });

        return $data;
    }
}