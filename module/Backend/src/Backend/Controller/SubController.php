<?php

namespace Backend\Controller;
use Backend\Controller\LangMultiTbController;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class SubController extends AbstractActionController
{
    protected $_Object;
    protected $_LangMultiTbController;
    protected $_Upload;
    protected $_params;
    protected $_field;
    protected $_columns;

    public function listItem($params, &$data = array())
    {
        $this->setParams($params);

        foreach ($this->_field['sub'] as $vl_field) {
            $data['item']['sub'][$vl_field['key']] = $this->_Object->listItem(array(
                'menu_code_id' => $vl_field['sub_id'],
                'parent' => $this->_params['id'],
                'orderby' => array('id ASC'),
                'columns' => $this->_columns,
            ));
        }

        if ($this->_lang) {
            foreach ($this->_field['sub'] as $vl_field) {
                foreach ($this->_langlist as $lang) {
                    foreach ($data['item']['sub'][$vl_field['key']] as $i => $vl_sub) {
                        $data['item']['translate'][$lang[0]]['sub'][$vl_field['key']][$i] = $this->_LangMultiTbController->listItem(array(
                            'id' => $vl_sub['id'],
                            'language' => $lang[0],
                            '__CONTROLLER__' => $this->_params['__CONTROLLER__']
                        ))[$lang[0]];
                    }
                }
            }
        }
    }

    public function deleteItem($params)
    {
        $this->setParams($params);

        foreach ($this->_field['sub'] as $vl_field) {
            $subs = $this->_Object->listItem(array(
                'menu_code_id' => $vl_field['sub_id'],
                'parent' => $this->_params['id']
            ));
            foreach ($subs as $vl_sub) {
                $this->_Object->deleteItem(array('id' => $vl_sub['id']));
                if ($vl_sub['thumbnail']) {
                    $this->_Upload->moveImage($vl_sub['thumbnail'], array('size' => array_merge(explode(',',$vl_field['define']['thumbnail']), array('autox30'))));
                }
                // Xóa ngôn ngữ
                if ($this->_lang) {
                    $this->_LangMultiTbController->deleteItem(array('item_id' => $vl_sub['id'], 'type' => $this->_params['__CONTROLLER__']));
                }
            }
        }
    }

    public function saveData($params)
    {
        $this->setParams($params);
        $list_sub = ($this->_params['id']) ? $this->_Object->listItem(array(
            'parent' => $this->_params['id'],
            'orderby' => array('id ASC'),
            'columns' => $this->_columns,
        )) : array();

        foreach ($this->_field['sub'] as $j => $vl_field) {
            array_shift($this->_params['post']['sub'][$vl_field['key']]);
            foreach ($this->_params['post']['sub'][$vl_field['key']] as $i => $vl_sub) {
                unset($this->_params['post']['sub'][$vl_field['key']][$i]['translate']);
                if ($this->_params['post']['sub'][$vl_field['key']][$i]) {
                    $i++;
                    // Xử lý dữ liệu
                    if ($this->_lang && $vl_sub['translate'][$this->_lang]) {
                        $vl_sub['translate'][$this->_lang] = array_merge($vl_sub['translate'][$this->_lang] ?? array(), $vl_sub ?? array());
                        $vl_sub = array_merge($vl_sub, $vl_sub['translate'][$this->_lang]);
                    }
                    $vl_sub['menu_code_id'] = $vl_field['sub_id'];
                    $vl_sub['parent'] = $params['parent_id'];

                    // Xử lý hình ảnh
                    $defaultSize = array(1 => array('autox30'));
                    $prefix = $params['prefix'].$vl_field['sub_id'].$j;

                    if ($vl_field['define']['thumbnail']) {
                        $name = 'thumbnail';
                        $hasTranslate = array_filter($this->_field['validate']['translate'], function($val) use ($name) { return $val == $name; });
                        if ($this->_lang && $hasTranslate) {
                            foreach ($this->_langlist as $lang) {
                                $file = array_reduce(array_keys($_FILES['sub']), function($acc = array(), $key) use ($vl_field, $i, $name, $lang) {
                                    $acc[$key] = $_FILES['sub'][$key][$vl_field['key']][$i]['translate'][$lang[0]][$name];
                                    return $acc;
                                });

                                $filename = \Backend\View\Helper\ThumbImages\Upload::renameExtension(\Backend\View\Helper\System\Check::stripUnicode($file['name']));
                                $vl_sub['translate'][$lang[0]][$name] = $this->_Upload->uploadSingleImage($file, $filename, $vl_sub['translate'][$lang[0]][$name], $vl_field['define'][$name], $defaultSize[1], 'single_'.$prefix);
                            }
                        } else {
                            $file = array_reduce(array_keys($_FILES['sub']), function($acc = array(), $key) use ($vl_field, $i, $name) {
                                $acc[$key] = $_FILES['sub'][$key][$vl_field['key']][$i][$name];
                                return $acc;
                            });

                            $filename = \Backend\View\Helper\ThumbImages\Upload::renameExtension(\Backend\View\Helper\System\Check::stripUnicode($file['name']));
                            $vl_sub[$name] = $this->_Upload->uploadSingleImage($file, $filename, $vl_sub[$name], $vl_field['define'][$name], $defaultSize[1], 'single_'.$prefix);
                        }

                        if ($this->_lang && $vl_sub['translate'][$this->_lang][$name]) {
                            $vl_sub[$name] = $vl_sub['translate'][$this->_lang][$name];
                        }
                    }
                    if ($vl_field['define']['multi_image']) {
                        if ($i == 1) {
                            array_shift($vl_field['define']['multi_image']);
                        }
                        foreach ($vl_field['define']['multi_image'] as $defineMultiImage) {
                            $name = $defineMultiImage['name'];

                            if ($defineMultiImage['translate'] || $defineMultiImage['translate_image']) {
                                foreach ($this->_langlist as $lang) {
                                    $files = array_reduce(array_keys($_FILES['sub']), function ($acc = array(), $key) use ($vl_field, $i, $name, $lang) {
                                        $acc[$key] = $_FILES['sub'][$key][$vl_field['key']][$i]['translate'][$lang[0]]['multi_image'][$name]['thumbnail'];
                                        return $acc;
                                    });

                                    foreach ($files['name'] as $file) {
                                        $vl_sub['translate'][$lang[0]]['multi_image'][$name]['thumbnail'][] = \Backend\View\Helper\ThumbImages\Upload::renameExtension(\Backend\View\Helper\System\Check::stripUnicode($file));
                                    }

                                    $vl_sub['translate'][$lang[0]]['multi_image'][$name] = $this->_Upload->uploadMultiImage($files, $vl_sub['translate'][$lang[0]]['multi_image'][$name], $defineMultiImage['size'], $defaultSize, 'multi_'.$prefix);
                                }
                            } else {
                                $files = array_reduce(array_keys($_FILES['sub']), function ($acc = array(), $key) use ($vl_field, $i, $name) {
                                    $acc[$key] = $_FILES['sub'][$key][$vl_field['key']][$i]['multi_image'][$name]['thumbnail'];
                                    return $acc;
                                });

                                foreach ($files['name'] as $file) {
                                    $vl_sub['multi_image'][$name]['thumbnail'][] = \Backend\View\Helper\ThumbImages\Upload::renameExtension(\Backend\View\Helper\System\Check::stripUnicode($file));
                                }
                                $vl_sub['multi_image'][$name] = $this->_Upload->uploadMultiImage($files, $vl_sub['multi_image'][$name], $defineMultiImage['size'], $defaultSize, 'multi_'.$prefix);
                            }
                        }

                        if ($this->_lang && $vl_sub['translate'][$this->_lang]['multi_image']) {
                            $vl_sub['multi_image'] = array_merge(
                                $vl_sub['multi_image'] ?? array(),
                                $vl_sub['translate'][$this->_lang]['multi_image']
                            );
                        }
                    }

                    $arrs = array(
                        'id' => $vl_sub['id'],
                        'user_created' => $this->_params['user'],
                        'post' => $vl_sub
                    );

                    // Lưu dữ liệu
                    $sub_id = $this->_Object->saveData($arrs, $vl_field['define']);

                    // Lưu dữ liệu translate
                    if ($this->_lang) {
                        $arrs['lang'] = $this->_lang;
                        $arrs['langlist'] = $this->_langlist;
                        $arrs['item_id'] = $sub_id;
                        $arrs['__CONTROLLER__'] =$this->_params['__CONTROLLER__'];
                        $arrs['display'] = 'all';
                        $this->_LangMultiTbController->saveData($arrs);

                        // Xóa ngôn ngữ
                        foreach ($this->_langlist as $lang) {
                            if (!$vl_sub['translate'][$lang[0]]) {
                                $this->_LangMultiTbController->deleteItem(array(
                                    'item_id' => $vl_sub['id'],
                                    'language' => $lang[0],
                                    'type' => $this->_params['__CONTROLLER__']
                                ));
                            }
                        }
                    }

                    // Ghi lại định nghĩa size cho bước xóa dữ liệu
                    foreach ($list_sub as $j => $vl_list_sub) {
                        if ($vl_sub['id'] == $vl_list_sub['id']) {
                            unset($list_sub[$j]);
                        } else {
                            $list_sub[$j]['size'] = $vl_field['define']['thumbnail'];
                        }
                    }
                }
            }
        }

        // Xóa dữ liệu
        foreach ($list_sub as $vl_sub) {
            $this->_Object->deleteItem(array('id' => $vl_sub['id']));
            if ($vl_sub['thumbnail']) {
                $this->_Upload->moveImage($vl_sub['thumbnail'], array('size' => array_merge(explode(',',$vl_sub['size']), array('autox30'))));
            }

            // Xóa ngôn ngữ
            if ($this->_lang) {
                $this->_LangMultiTbController->deleteItem(array('item_id' => $vl_sub['id'], 'type' => $this->_params['__CONTROLLER__']));
            }
        }
    }

    public function codefield($params)
    {
        $this->setParams($params);
        $MenuCodeTb = new MenuCodeTb();

        // Thêm sub
        if (count($this->_params['sub']) > 1) {
            $sub = $this->_params['sub'];
            $list_id = array();
            foreach ($sub as $i => $value) {
                if ($i > 0) {
                    $menu_code_id = $MenuCodeTb->saveData(array(
                        'id' => $value['sub_id'],
                        'post' => array(
                            'parent' => $params['parent'],
                            'active' => $params['active'],
                            'name' => $value['label'],
                        )
                    ));

                    if ($value['sub_id'] && ($key = array_search($value['sub_id'], $params['item']['list_sub_id'])) !== false) {
                        unset($params['item']['list_sub_id'][$key]);
                    }

                    $sub[$i]['sub_id'] = $menu_code_id;
                    $params['list_sub_id'][] = $menu_code_id;
                }
            }

            $this->_params['sub'] = $sub;
        }

        // Xóa sub
        if ($params['item']['list_sub_id']) {
            foreach ($params['item']['list_sub_id'] as $id) {
                $MenuCodeTb->deleteItem(array('id' => $id));
            }
        }

        // Sửa hình
        if ($params['item']['sub']) {
            array_shift($this->_field['sub']);
            array_shift($this->_params['sub']);
            foreach ($this->_field['sub'] as $i => $vl_field) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $vl_field['define']['thumbnail'],
                    'sizesNews' => $this->_params['sub'][$i]['define']['thumbnail'],
                    'module' => $params['image'].$vl_field['sub_id'].$i
                ));
            }
            $this->_params['sub'] = $sub;
        }

        return array('sub' => $this->_params['sub'], 'list_sub_id' => $params['list_sub_id']);
    }

    public function setParams($params)
    {
        $this->_field = $params['field'];
        $this->_params = $params['params'];
        $this->_columns = array_filter(array_merge(array('id','sort'), array_keys($params['field']['sub'][0]['define'])), function($column) {
            return !in_array($column, array('detail_size'));
        });
        $this->_Object = $params['object'];
        $this->_lang = $params['lang'];
        $this->_langlist = $params['langlist'];
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_Upload = new Upload();
    }
}