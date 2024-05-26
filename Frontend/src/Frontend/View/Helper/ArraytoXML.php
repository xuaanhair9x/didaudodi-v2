<?php

namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class ArraytoXML extends AbstractHelper
{
	/**
	* Lồng danh mục theo cấp liên quan
	*
	* @author Phạm Thành Thảo
	* @param (array) $array: Mảng ban đầu cần chuyển qua XML
	* @param (string) &$root_node: node gốc
	* @param (string) $root_item : node item
	*
	* KẾT QUẢ: được 1 file xml
	*/

	public function __invoke($array, &$root_node, $root_item = null)
    {
		foreach($array as $key => $value) {
	        if(is_array($value)) {
	            if(!is_numeric($key)){
	                $subnode = $root_node->addChild("$key");
	                $this->__invoke($value, $subnode, $root_item);
	            }else{
	                $subnode = $root_node->addChild("$root_item");
	                $this->__invoke($value, $subnode, $root_item);
	            }
	        }else {
	            $root_node->addChild("$key",htmlspecialchars("$value"));
	        }
	    }
	}
}