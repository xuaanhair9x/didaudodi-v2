<?php
namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class ArrayFlatten extends AbstractHelper
{
	public function __invoke($array)
    {
		$result = array();
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $result = array_merge($result, $this->__invoke($value));
            }
            else {
                $result[$key] = $value;
            }
        }
        return $result;
	}
}