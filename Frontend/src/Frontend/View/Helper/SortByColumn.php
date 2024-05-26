<?php

namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class SortByColumn extends AbstractHelper
{
    /**
    * Sắp xếp mảng dữ liệu theo column
    *
    * @author SaigonGroup
    * @param (array) $arrs: Mảng ban đầu cần sắp xếp
    * @param (string) $col: key trong mảng muốn sắp xếp theo value
    * @param (string) $dir: SORT_ASC/SORT_DESC
    *
    * KẾT QUẢ: được 1 mảng đã được sắp xếp
    *
    * Cách gọi
    * - Controller: $this->getServiceLocator()->get('Zend\View\Renderer\PhpRenderer')->sortByColumn();
    * - Block: $this->getView()->getHelperPluginManager()->getServiceLocator()->get('Zend\View\Renderer\PhpRenderer')->sortByColumn();
    * - view: $this->sortByColumn();
    *
    */
    public function __invoke(&$arrs, $col, $dir = 'SORT_ASC') {
        $sort_col = array();
        foreach ($arrs as $key => $row) {
            $sort_col[$key] = $row[$col];
        }
        array_multisort($sort_col, constant($dir), $arrs);
        return $arrs;
    }
}