<?php
namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class TimeElapsedString extends AbstractHelper
{
	public function __invoke($datetime, $full = false)
    {
    	$now = new \DateTime;
	    $ago = new \DateTime($datetime);
	    $diff = $now->diff($ago);

	    $diff->w = floor($diff->d / 7);
	    $diff->d -= $diff->w * 7;

	    $string = array(
	        'y' => 'năm',
	        'm' => 'tháng',
	        'w' => 'tuần',
	        'd' => 'ngày',
	        'h' => 'giờ',
	        'i' => 'phút',
	        's' => 'giây',
	    );
	    foreach ($string as $k => &$v) {
	        if ($diff->$k) {
	            $v = $diff->$k . ' ' . $v;
	        } else {
	            unset($string[$k]);
	        }
	    }

	    if (!$full) $string = array_slice($string, 0, 1);
	    return $string ? implode(', ', $string) . ' trước' : '1 phút trước';
	}
}
