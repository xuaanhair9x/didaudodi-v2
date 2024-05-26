<?php

namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class WriteLog extends AbstractHelper
{
	public static function Write($params)
    {
    	$data = "\n------------------------\n";
    	$data .= print_r(array('date' => date('d/m/Y H:i:s', time()), 'data' => $params), true);
    	$data .= "\n------------------------";
    	file_put_contents(ROOT_PUBLIC.'/log.txt', $data, FILE_APPEND);
	}

	public static function Read()
    {
    	echo file_get_contents(ROOT_PUBLIC.'/log.txt');
	}
}