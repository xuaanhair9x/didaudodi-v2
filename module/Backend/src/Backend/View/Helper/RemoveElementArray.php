<?php
namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class RemoveElementArray extends AbstractHelper
{
    /**
    * Xóa phần tử trong mảng
    *
    * @param (array) $arrs: Mảng ban đầu
    * @param (array) $keys: key cần thực hiện trong mảng
    * @param (array) $position: vị trí xóa first/last
    *
    * KẾT QUẢ: được 1 mảng mới.
    */
    public function __invoke($arrs, $keys, $position = 'first') {
        foreach ($keys as $key) {
            if (isset($arrs[$key])) {
                switch ($position) {
                    case 'first':
                        array_shift($arrs[$key]);
                    break;
                    case 'last':
                        array_pop($arrs[$key]);
                    break;
                }
            }
        }
        return $arrs;
    }

    /**
    * Xử lý dữ liệu theo style repeater
    *
    * @param (array) $data: Mảng dữ liệu
    * @param (array) $type: Kiểu dữ liệu
    *
    * KẾT QUẢ: Được 1 json_encode đã xóa phần tử đầu tiên nếu là rỗng
    */
    public static function repeater($data, $name, $encode = true)
    {
        $types = array(
            'text' => array('multi_input','multi_detail'),
            'image' => array('multi_image'),
            'file' => array('multi_file'),
        );
        foreach ($types as $type => $value) {
            if (in_array($name, $value)) {
                break;
            }
            $type = '';
        }

        switch ($type) {
            case 'text':
                foreach ($data as $slug => $item) {
                    if (is_array($item) && $item[0]) {
                        array_shift($data[$slug]);
                    }
                }
            break;
            case 'image':
                foreach ($data as $slug => $item) {
                    if (!array_filter($item[0])) {
                        array_shift($data[$slug]);
                    }
                }
            break;
            case 'file':
                foreach ($data as $slug => $item) {
                    if (empty($item[0]['name']) && empty($item[0]['file'])) {
                        array_shift($data[$slug]);
                    }
                }
            break;
        }

        return ($encode) ? json_encode($data, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) : $data;
    }
}