<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Controller\SubController;
use Backend\Model\MenuCodeTb;
use Backend\Model\SectionTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class SectionTbController extends AbstractActionController
{
    protected $_SectionTb;
    protected $_SubController;
    protected $_LangMultiTbController;
    protected $_Upload;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;
    protected $_menu;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'] . '-' . $this->_params['id'] ?? $this->_params['root_id']);

        $this->_Upload = new Upload();
        $this->_SectionTb = new SectionTb();
        $this->_SubController = new SubController();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');

        $MenuCodeTb = new MenuCodeTb();
        $this->_menu = $MenuCodeTb->getItem(array('id' => $this->_params['root_id'], 'columns' => array('name')));

        if ($this->_params['id']) {
            $section = $this->_SectionTb->getItem(array('id' => $this->_params['id'], 'columns' => array('id', 'menu', 'define')));
            $this->_field = array_merge(
                $section['define'],
                array(
                    'menu' => $section['menu'],
                    'note' => 'Note',
                    'listLang' => $this->identity()->langlist,
                    'codefield' => !!$this->identity()->supper,
                    'disableBtnCancel' => true,
                )
            );

            $this->_field['validate']['required'] = $this->_field['validate']['required'];
            $this->_field['validate']['translate'] = isset($this->_field['validate']['translate']) ? $this->_field['validate']['translate'] : $this->identity()->langfield;

            // Kiểm tra form nhập liệu
            foreach ($this->_field['validate']['required'] as $name => $title) {
                if ($this->_field[$name] || strpos($name, 'multi_input') > -1) {
                    $name = ($this->identity()->lang && (in_array($name, $this->_field['validate']['translate']))) ? 'translate[' . $this->identity()->lang . '][' . $name . ']' : $name;
                    $this->_params['checkForm']['required'][$name] = $this->_translator->translate($title);
                }
            }
            if ($this->_field['thumbnail']) {
                $this->_params['checkForm']['image']['single']['thumbnail'] = array($this->_translator->translate("Ảnh đại diện"), array('autox30'));
            }
            if ($this->_field['multi_image']) {
                foreach ($this->_field['multi_image'] as $i => $value) {
                    $this->_params['checkForm']['image']['multi'][$value['name']] = array($this->_translator->translate($value['label']), array('autox30'));
                }
                array_shift($this->_params['checkForm']['image']['multi']);
            }
            if ($this->_field['multi_file']) {
                $this->_params['checkForm']['file'] = $this->_field['multi_file'];
                array_shift($this->_params['checkForm']['file']);
            }
        }

        return parent::onDispatch($e);
    }

    public function fieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_menu['name'] . '/' . $this->_field['menu']);

        $data = array(
            '_field' => $this->_field,
            '_params' => array_merge($this->_params, $this->params()->fromRoute()),
            'item' => $this->_SectionTb->getItem(array('id' => $this->_params['id'])),
        );
        $data['item']['name'] = $data['item']['name'] ?? $data['item']['menu'];

        // Dữ liệu translate
        if ($this->identity()->lang) {
            $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
        }

        // Xóa phần đầu của mảng
        $this->_field = $this->_renderer->removeElementArray($this->_field, array('multi_image', 'multi_input', 'multi_file', 'multi_detail', 'sub'));

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            if ($this->identity()->lang && $this->_params['post']['translate'][$this->identity()->lang]) {
                // Map dữ liệu của ngôn ngữ mặc định
                if ($this->_params['post']['translate'][$this->identity()->lang]['multi_input']) {
                    $this->_params['post']['translate'][$this->identity()->lang]['multi_input'] = array_merge(
                        ($this->_params['post']['translate'][$this->identity()->lang]['multi_input']) ? $this->_params['post']['translate'][$this->identity()->lang]['multi_input'] : array(),
                        ($this->_params['post']['multi_input']) ? $this->_params['post']['multi_input'] : array()
                    );
                }
                if ($this->_params['post']['translate'][$this->identity()->lang]['multi_detail']) {
                    $this->_params['post']['translate'][$this->identity()->lang]['multi_detail'] = array_merge(
                        ($this->_params['post']['translate'][$this->identity()->lang]['multi_detail']) ? $this->_params['post']['translate'][$this->identity()->lang]['multi_detail'] : array(),
                        ($this->_params['post']['multi_detail']) ? $this->_params['post']['multi_detail'] : array()
                    );
                }
                if ($this->_params['post']['translate'][$this->identity()->lang]['multi_image']) {
                    $this->_params['post']['translate'][$this->identity()->lang]['multi_image'] = array_merge_recursive(
                        ($this->_params['post']['translate'][$this->identity()->lang]['multi_image']) ? $this->_params['post']['translate'][$this->identity()->lang]['multi_image'] : array(),
                        ($this->_params['post']['multi_image']) ? $this->_params['post']['multi_image'] : array()
                    );
                }

                $this->_params['post'] = array_merge($this->_params['post'], $this->_params['post']['translate'][$this->identity()->lang]);
            }

            $validate = new CheckForm($this->_params, array('translate' => $this->identity()->lang));
            if ($validate->isError() == true) {
                $data['error'] = $validate->getMessagesError();
                if ($data['item']['multi_image']) {
                    $this->_params['post']['multi_image'] = $data['item']['multi_image'];
                }
                if ($data['item']['multi_file']) {
                    $this->_params['post']['multi_file'] = $data['item']['multi_file'];
                }
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData($this->_field);

                // Xử lý ảnh
                if ($this->_params['checkForm']['image']) {
                    $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field, array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'section' . $this->_params['id']);
                }
                // Xử lý file
                if ($this->_params['checkForm']['file']) {
                    $this->_Upload->uploadFile($this->_params['post'], $this->_params['checkForm']['file']);
                }
                // Lưu dữ liệu
                $id = $this->_SectionTb->saveData($this->_params, $this->_field);
                $data['alertSuccess'] = $this->_translator->translate("Chỉnh sửa thành công!");

                // Lưu dữ liệu translate
                if ($this->identity()->lang) {
                    $this->_params['lang'] = $this->identity()->lang;
                    $this->_params['langlist'] = $this->identity()->langlist;
                    $this->_params['item_id'] = $id;
                    $this->_params['display'] = 'all';
                    $this->_LangMultiTbController->saveData($this->_params);
                }

                // Xử lý dữ liệu bài viết con
                if ($this->_field['sub']) {
                    $this->_SubController->saveData(array(
                        'field' => $this->_field,
                        'params' => $this->_params,
                        'object' => $this->_SectionTb,
                        'lang' => $this->identity()->lang,
                        'langlist' => $this->identity()->langlist,
                        'parent_id' => $id,
                        'prefix' => 'ssub',
                    ));
                }
            }

            // Load lại dữ liêu sau khi lưu
            if ($data['error']) {
                $data['item'] = $this->_params['post'];
            } else {
                $data['item'] = $this->_SectionTb->getItem(array('id' => $this->_params['id']));
                if ($this->identity()->lang) {
                    $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
                }
            }
        }

        // Bài viết con
        if ($this->_field['sub']) {
            $this->_SubController->listItem(array(
                'field' => $this->_field,
                'params' => $this->_params,
                'object' => $this->_SectionTb,
                'lang' => $this->identity()->lang,
                'langlist' => $this->identity()->langlist,
            ), $data);
        }

        // Các field và thứ tự hiển thị
        $fields = array(
            'menu' => array('label' => 'Menu', 'class' => $this->_field['allow_edit_menu'] ? 'col-md-offset-6 col-md-pull-6' : 'hidden'),
            'note' => array('class' => $this->_field['allow_edit_note'] ? 'col-md-offset-6 col-md-pull-6' : 'hidden'),
            'name', 'icon', 'desc_short', 'multi_input', 'thumbnail', 'multi_image', 'multi_file', 'detail', 'multi_detail', 'sub'
        );

        if ($this->_field['special']) {
            $checkboxes = array_filter($this->_field['special'], function($item) {
                return $item['detail'];
            });
            if (!empty($checkboxes)) {
                $fields['special']['label'] = array_map(function($item) use ($data) {
                    return array(
                        'field' => 'checkbox',
                        'name' => 'special['.$item['name'].']',
                        'label' => $item['label'],
                        'note' => $item['note'],
                        'checked' => $data['item']['special'][$item['name']],
                    );
                }, $checkboxes);
            }
        }
        foreach ($fields as $field => $value) {
            $field = is_array($value) ? $field : $value;
            if (!empty($this->_field[$field])) {
                $data['elements'][$field] = array_merge(array(
                    'label' => $this->_field[$field],
                    'name' => $field,
                    'value' => $data['item'][$field],
                ), is_array($value) ? $value : array());
            }
        }

        if (!$this->identity()->supper) {
            unset($data['elements']['note']);
        }

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/field.phtml');
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',', $this->_params['id']) as $id) {
                $this->_SectionTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',', $this->_params['id']) as $id) {
                // Xóa item || move hình ảnh qua thư mục uploads/removes
                $item = $this->_SectionTb->getItem(array('id' => $id));
                $this->_Upload->deleteImage($item, $this->_params['checkForm']['image'], $this->_field);
                $this->_SectionTb->deleteItem(array('id' => $id));
                // Xóa ngôn ngữ liên quan
                if ($this->identity()->lang) {
                    $this->_LangMultiTbController->deleteItem(array('item_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                }
                // Xóa sản phẩm phụ
                array_shift($this->_field['sub']);
                if ($this->_field['sub']) {
                    $this->_SubController->deleteItem(array(
                        'field' => $this->_field,
                        'params' => $this->_params,
                        'object' => $this->_SectionTb,
                        'lang' => $this->identity()->lang,
                    ));
                }
            }
        }
        return $this->getResponse();
    }

    public function codelistAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_menu['name']);

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'header' => array('id' => 'ID', 'name' => 'Section', 'sort' => 'Sắp xếp', 'display' => 'Hiển thị', 'func' => 'Chức năng'),
            'list' => $this->_SectionTb->listItem(array('columns' => array('id', 'menu', 'sort', 'display'))),
        );

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }

    public function codefieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_menu['name'] . '/Cấu hình dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'action' => array(),
            'allow_edit_menu' => true,
            'item' => $this->_field ? $this->_field : array(),
            'linkBack' => $this->url()->fromRoute('admincp', array('controller' => $this->_params['__CONTROLLER__'], 'action' => $this->_params['id'] ? 'field' : 'codelist', 'id' => $this->_params['id'], 'root_id' => $this->_params['root_id'])),
        );
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post']['menu'] = $this->params()->fromPost('menu');
            $this->_params['post']['define'] = $this->params()->fromPost();
            $this->_params['post']['define']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_input'], 'order');
            $this->_params['post']['define']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_image'], 'order');
            $this->_params['post']['define']['multi_file'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_file'], 'order');
            $this->_params['post']['define']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_detail'], 'order');

            $this->_params['post']['define']['validate']['required'] = array_filter($this->_params['post']['define'], function ($v, $k){
                return in_array($k, array('menu', 'name')) && $v;
            }, ARRAY_FILTER_USE_BOTH);

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['thumbnail']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['thumbnail'],
                    'sizesNews' => $this->_params['post']['define']['thumbnail'],
                    'module' => 'single_section' . $this->_params['id'],
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['multi_image']);
                array_shift($this->_params['post']['define']['multi_image']);
                foreach ($this->_field['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define']['multi_image'][$i]['size'],
                        'module' => 'multi_section' . $this->_params['id'] . $i,
                    ));
                }
                $this->_params['post']['define']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            // Bài viết con
            $this->_params['post']['define'] = array_merge(
                array_filter($this->_params['post']['define'], function ($k){
                    return $k != 'menu';
                }, ARRAY_FILTER_USE_KEY),
                $this->_SubController->codefield(array(
                    'parent' => $this->_params['root_id'],
                    'field' => $this->_field,
                    'params' => $this->_params['post']['define'],
                    'item' => $data['item'],
                    'active' => 'section_sub-' . $this->_params['root_id'],
                    'image' => 'single_ssub',
                ))
            );

            // Lưu dữ liệu
            $this->_SectionTb->saveData($this->_params);

            return $this->redirect()->toUrl($data['linkBack']);
        }

        $defines = array(
            'input' => array('note', 'name', 'desc_short', 'detail', 'icon', 'thumbnail'),
            'multi' => array('special','multi_input', 'multi_image', 'multi_detail', 'multi_file',
                'sub' => array(
                    'label' => 'Section con',
                    'field' => array('name', 'desc_short', 'detail', 'icon', 'thumbnail', 'multi_input', 'multi_image'),
                ),
            ),
        );
        foreach ($defines as $group => $fields) {
            foreach ($fields as $field => $value) {
                $field = is_array($value) ? $field : $value;
                $data['elements'][$group][] = array_merge(array(
                    'name' => $field,
                    'value' => $data['item'][$field],
                ), is_array($value) ? $value : array());
            }
        }

        $data['html'] = $this->_renderer->code($data);

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}
