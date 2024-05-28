<?php

namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class SortNestedCate extends AbstractHelper
{
    /**
    * Sắp xếp danh mục theo cấp liên quan
    *
    * @author SaigonGroup
    * @param (array) $arrs: Mảng ban đầu
    * @param (array) $params: điều kiện sắp xếp/lồng, vd:  array('cat_id/parent' => 0, 'type' => 'sort/nested')
    *
    * KẾT QUẢ: được 1 mảng sắp xếp theo danh mục liên quan. Dễ dàng trong quá trình hiển thị cho HTML
    *
    * Cách gọi
    * - Controller: $this->getServiceLocator()->get('Zend\View\Renderer\PhpRenderer')->sortNestedCate();
    * - Block: $this->getView()->getHelperPluginManager()->getServiceLocator()->get('Zend\View\Renderer\PhpRenderer')->sortNestedCate();
    * - view: $this->sortNestedCate();
    *
    */
    public function __invoke($arrs, $params) {
        switch ($params['type']) {
            case 'sort':
                return $this->sort($arrs, $params);
            break;
            case 'nested':
                return $this->nested($arrs, $params);
            break;
            default:
                return $this->nested($arrs, $params);
            break;
        }
    }

    public function sort($arrs, $params, &$result = array()) {
        foreach ($arrs as $i => $element) {
            if ($element[array_keys($params)[0]] == array_values($params)[0]) {
                $result[] = $element;
                unset($arrs[$i]);
                $this->sort($arrs, array(array_keys($params)[0] => $element['id']), $result);
            }
        }
        return $result;
    }

    public function nested($arrs, $params) {
        $result = array();
        $i = 0;
        foreach ($arrs as $j => $element) {
            if ($element[array_keys($params)[0]] == array_values($params)[0]) {
                $result[$i] = $element;
                $child = $this->nested($arrs, array(array_keys($params)[0] => $element['id']));
                if (empty($element['skip']) && $child) {
                    $result[$i]['child'] = ($result[$i]['child']) ? array_merge($result[$i]['child'], $child) : $child;
                }
                $i++;
                unset($arrs[$j]);
            }
        }
        return $result;
    }
}