<?php
namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class DirToArray extends AbstractHelper
{
	public function __invoke($dir)
    {
		$result = array();
        $cdir = scandir($dir);
        foreach ($cdir as $value)
        {
            if (!in_array($value,array(".",".."))) {
                if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
                    $result[$value] = $this->__invoke($dir . DIRECTORY_SEPARATOR . $value);
                } else {
                    $result[] = $value;
                }
            }
        }
        return $result;
	}
}