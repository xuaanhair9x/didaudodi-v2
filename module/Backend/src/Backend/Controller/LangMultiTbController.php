<?php

namespace Backend\Controller;

use Backend\Model\LangMultiTb;
use Backend\Model\MenuCodeTb;
use Backend\Model\MenuPublicTb;
use Frontend\View\Helper\ToSlug;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class LangMultiTbController extends AbstractActionController
{
    protected $_LangMultiTb;

    public function __construct()
    {
        $this->_LangMultiTb = new LangMultiTb();
    }

    public function saveData($params)
    {
        $ToSlug = new ToSlug();
        $except = array('ja','zh','cn','ko'); // Ngôn ngữ chữ tượng hình
        $MenuCodeTb = new MenuCodeTb();
        $langSlug = $MenuCodeTb->getItem(array('id' => 11))['define']['slug'];
        $langSlug = $langSlug ? $langSlug : $params['lang'];
        foreach ($params['post']['translate'] as $lang => $data) {
            // Tạo slug chuyển ngôn ngữ
            foreach ($params['langlist'] as $vl) {
                $l_name = (in_array($vl[0], $except) && $params['post']['translate'][$vl[0]]['name']) ? $params['post']['translate'][$langSlug]['name'] : $params['post']['translate'][$vl[0]]['name'];
                $l_slug = $params['post']['translate'][$vl[0]]['slug'] ?? $ToSlug($l_name);
                $data['slugLang'][$vl[0]] = ($l_name) ? (($params['lang'] != $vl[0]) ? $vl[0].'/' : '').$l_slug : '';
            }

            // Tạo slug ngôn ngữ
            if ($data['name']) {
                $l_name = (in_array($lang, $except) && $data['name']) ? $params['post']['translate'][$langSlug]['name'] : $data['name'];
                $l_slug = $data['slug'] ?? $ToSlug($l_name);
                $data['slug'] = ($l_name) ? (($lang == $params['lang']) ? '' : $lang.'/').$l_slug : '';
            }

            if ($params['post']['action'] && $data['slug']) {
                $data['link'] = $data['slug'].'-'.($params['menu_link_id'] ? $params['menu_link_id'] : $params['item_id']).'-'.$params['post']['action'];
            }

            // Xử lý dữ liệu
            foreach (array('multi_input','multi_detail','multi_image','multi_file') as $name) {
                if (isset($data[$name])) {
                    $data[$name] = \Backend\View\Helper\RemoveElementArray::repeater($data[$name], $name, false);
                }
            }
            $arrs = array();
            $arrs['post'] = array(
                'name' => $data['name'],
                'item_id' => $params['item_id'],
                'translate' => json_encode($data, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE),
                'language' => $lang,
                'type' => $params['__CONTROLLER__']
            );

            // Điều kiện add/edit
            $item = $this->_LangMultiTb->getItem(array('item_id' => $params['id'],'type' => $params['__CONTROLLER__'], 'language' => $lang));
            if ($params['id'] && $item) {
                $arrs['id'] = $item['id'];
            }

            // Điều kiện display
            if (($lang == $params['lang']) && !$item || $params['display'] == 'all') {
                $arrs['post']['display'] = 1;
            }

            // Lưu dữ liệu
            $this->_LangMultiTb->saveData($arrs);
        }
    }

    public function deleteItem($params = null)
    {
        $this->_LangMultiTb->deleteItem($params);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            $params = $this->params()->fromRoute();
            $params['post'] = $this->params()->fromPost();
            foreach (explode(',',$params['id']) as $id) {
                $this->_LangMultiTb->saveData(array('id' => $id, 'post' => $params['post']));
                if ($params['post']['menu']) {
                    $MenuPublicTb = new MenuPublicTb();
                    $item = $this->_LangMultiTb->getItem(array(
                        'item_id' => $MenuPublicTb->getItem($params['post']['menu'])['id'],
                        'type' => 'menu_public_tb',
                        'language' => $params['post']['menu']['language']
                    ));
                    if ($item) { $this->_LangMultiTb->saveData(array('id' => $item['id'], 'post' => $params['post'])); }
                }
            }
        }
        return $this->getResponse();
    }

    public function listItem($params = null)
    {
        $array = array(
            'item_id' => $params['id'],
            'type' => $params['__CONTROLLER__'],
            'language' => $params['language']
        );
        foreach ($this->_LangMultiTb->listItem($array) as $value) {
            $data[$value['language']] = json_decode($value['translate'], true);
            $data[$value['language']]['display'] = $value['display'];
        }
        return $data;
    }
}