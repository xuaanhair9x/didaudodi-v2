<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Model\MenuCodeTb;
use Backend\Model\MenuPublicTb;
use Backend\Model\HtmlTb;
use Backend\Model\NewsCatTb;
use Backend\Model\ProductCatTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class MenuPublicTbController extends AbstractActionController
{
    protected $_MenuPublicTb;
    protected $_MenuCodeTb;
    protected $_LangMultiTbController;
    protected $_Upload;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_Upload = new Upload();
        $this->_MenuPublicTb = new MenuPublicTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        if ($this->_params['id']) {
            $define = $this->_MenuPublicTb->getItem(array('id' => $this->_params['id'],'columns' => array('define')))['define'];
            $this->_field['define'] = array_merge(
                $this->_field['define'] ?? array(),
                $define ?? array(),
                empty($this->identity()->supper) || $this->_params['action'] == 'codefield' ? array() : array('link' => 'Link')
            );
        }
        // Kiểm tra form nhập liệu
        $this->_params['checkForm'] = array('required' => array('name' => $this->_translator->translate($this->_field['define']['name'])));
        if ($this->_field['define']['thumbnail']) {
            $this->_params['checkForm']['image']['single']['thumbnail'] = array($this->_translator->translate("Ảnh đại diện"), array('autox30'));
        }
        if ($this->_field['define']['multi_image']) {
            foreach ($this->_field['define']['multi_image'] as $i => $value) {
                $this->_params['checkForm']['image']['multi'][$value['name']] = array($this->_translator->translate($value['label']), array('autox30'));
            }
            array_shift($this->_params['checkForm']['image']['multi']);
        }

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $arrs = array(
            'fixed' => 0,
            'deny_increment' => true,
            'language' => ($this->identity()->lang) ? true : false
        );
        if (empty($this->identity()->supper)) {
            $arrs['display'] = 1;
        }

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_renderer->cateSortNested($this->_MenuPublicTb->listItem($arrs), array('parent' => 0,'type' => 'sort'))
        );
        $data['_field']['special'] = array_filter($data['_field']['special'], function($item) { return $item['name'] && ($item['list'] || (!$item['list'] && !$item['detail'])); });

        $view = new ViewModel($data);
        return $view;
    }

    public function fieldAction()
    {
        $this->_field['define'] = $this->_renderer->removeElementArray($this->_field['define'], array('multi_image','multi_input','multi_detail'));
        $data = array(
            'item' => array(),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );
        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            $data['item'] = $this->_MenuPublicTb->getItem(array('id' => $this->_params['id']));
            if(!$this->identity()->supper) {
                //$data['item']['link'] = end(explode(',', $data['item']['link']));
            }

            // Dữ liệu translate
            if ($this->identity()->lang) {
                $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
            }
        }

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
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true) {
                $data['error'] = $validate->getMessagesError();
                if ($data['item']['multi_image']) {
                    $this->_params['post']['multi_image'] = $data['item']['multi_image'];
                }
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData($this->_field['define']);

                // Xử lý ảnh
                if ($this->_params['checkForm']['image']) {
                    $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field['define'], array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'menu'.$this->_params['root_id']);
                }

                // Xử lý dữ liệu
                if ($this->_params['post']['parent']) {
                    $item = $this->_MenuPublicTb->getItem(array('id' => $this->_params['post']['parent']));
                    $this->_params['post']['level'] = $item['level'] + 1;
                }

                // Lưu dữ liệu
                $id = $this->_MenuPublicTb->saveData($this->_params, $this->_field['define']);

                // Lưu dữ liệu translate
                if ($this->identity()->lang) {
                    $this->_params['lang'] = $this->identity()->lang;
                    $this->_params['langlist'] = $this->identity()->langlist;
                    $this->_params['item_id'] = $id;
                    $this->_LangMultiTbController->saveData($this->_params);
                }

                // Update menu config
                preg_match('/(^.*)-(\d+)-(\d+\.html)$/', $this->_params['post']['link'], $matches);
                $moduleSlug = $matches[1];
                $moduleId = $matches[2];
                $module = str_replace('-'.$moduleId, '', $this->_params['post']['active']);

                if ($matches && $moduleSlug == $this->_renderer->toSlug($this->_params['post']['name'])) {
                    switch ($module) {
                        case 'html-page':
                            $HtmlTb = new HtmlTb();
                            $item = $HtmlTb->getItem(array('id' => $moduleId));
                            if ($item) {
                                $moduleDefine = $item['define'];
                                $moduleDefine['menu'] = $this->_params['post']['name'];
                                $HtmlTb->saveData(array('id' => $moduleId, 'post' => array('define' => $moduleDefine)));
                            }
                            break;
                        case 'news-list':
                            $NewsCatTb = new NewsCatTb();
                            $item = $NewsCatTb->getItem(array('id' => $moduleId));
                            if ($item) {
                                $moduleDefine = $item['define_item'];
                                $moduleDefine['menu'] = $this->_params['post']['name'];
                                $NewsCatTb->saveData(array('id' => $moduleId, 'post' => array('name' => $this->_params['post']['name'], 'slug' => $this->_renderer->toSlug($this->_params['post']['name']), 'define_item' => $moduleDefine)));
                            }
                            break;
                        case 'product-list':
                            $ProductCatTb = new ProductCatTb();
                            $item = $ProductCatTb->getItem(array('id' => $moduleId));
                            if ($item) {
                                $moduleDefine = $item['define_item'];
                                $moduleDefine['menu'] = $this->_params['post']['name'];
                                $ProductCatTb->saveData(array('id' => $moduleId, 'post' => array('name' => $this->_params['post']['name'], 'slug' => $this->_renderer->toSlug($this->_params['post']['name']), 'define_item' => $moduleDefine)));
                            }
                            break;
                    }
                }

                return $this->redirect()->toUrl($data['linkList']);
            }
            $data['item'] = ($data['error']) ? $this->_params['post'] : array();
        }

        $data['list'] = $this->_renderer->cateSortNested(
            $this->_MenuPublicTb->listItem(array(
                'level' => '< '.($data['item']['level'] ? $data['item']['level'] : 2), // Danh mục 3 cấp (0 1 2)
                'deny_id' => ($this->_params['id']) ? array($this->_params['id']) : '',
                'deny_increment' => true
            )),
            array('parent' => 0, 'type' => 'sort')
        );

        // Các field và thứ tự hiển thị
        $fields = array(
            'name' => array(),
            'title',
            'description',
            'link' => array(),
            'desc_short',
            'keyword',
            'multi_input',
            'thumbnail',
            'multi_image',
            'detail',
            'multi_detail',
            'embed' => array('position' => array(
                'bbot' => $this->_translator->translate("Trên").' </body>',
                'off' => $this->_translator->translate("Tắt")
            ))
        );
        if ($this->_field['define']['special']) {
            $checkboxes = array_filter($this->_field['define']['special'], function($item) {
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
        if ($this->identity()->supper) {
            $fields['link']['note'] = '<a href="javascript:;" class="mt-sweetalert-note" data-message="
            <div class=\'text-left\'>Cú pháp mặc định: <b>[slug]-[id]-[action(number)].html</b></div>
            <div class=\'text-left\'>Cú pháp theo ngôn ngữ: <b>[language]/[cú pháp mặc định]</b></div>
            <div class=\'text-left\'><b>slug</b>: tên menu không dấu, không viết hoa, dấu <b>cách</b> thay bằng dấu <b>–</b></div>
            <div class=\'text-left\'><b>id</b>: Theo id của danh sách code</div>
            <div class=\'text-left\'><b>action</b>: 11,12,13,14 - 21,22,23,24 - 31,32,33,34,35 - 51,52</div>
            <div class=\'text-left\'><b>language:</b> vi, en, fr, ja, ru, zh, de, ko</div>"><i class="fa fa-question-circle" aria-hidden="true"></i></a>';
        } else {
            $fields['link']['attr'] = 'readonly';
        }
        foreach ($fields as $field => $value) {
            $field = is_array($value) ? $field : $value;
            if (!empty($this->_field['define'][$field])) {
                $data['elements'][$field] = array_merge(array(
                    'label' => $this->_field['define'][$field],
                    'name' => $field,
                    'value' => $data['item'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$title);
        $data['_params'] = $this->params()->fromRoute();

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view;
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_MenuPublicTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                if ($this->_params['post']['check']) {
                    echo (count($this->_MenuPublicTb->listItem(array('parent' => $id))) == 0) ? false : true;
                } else {
                    // Xóa item || move hình ảnh qua thư mục uploads/removes
                    $item = $this->_MenuPublicTb->getItem(array('id' => $id));
                    $this->_Upload->deleteImage($item, $this->_params['checkForm']['image'], $this->_field['define']);
                    $this->_MenuPublicTb->deleteItem(array('id' => $id));
                    // Xóa ngôn ngữ
                    if ($this->identity()->lang) {
                        $this->_LangMultiTbController->deleteItem(array('item_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                    }
                }
            }
        }
        return $this->getResponse();
    }

    public function codefieldAction()
    {
        $data = array(
            'item' => $this->_field['define'],
            'linkBack' => $this->url()->fromRoute('admincp', array_merge(
                array(
                    'controller' => $this->_params['__CONTROLLER__'],
                    'action' => 'list',
                    'root_id' => $this->_params['root_id']
                ),
                $this->_params['id'] ? array('action' => 'field', 'id' => $this->_params['id']) : array()
            ))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            // Set default value for options
            $options = array('link' => '', 'title' => '' ,'description' => '' ,'keyword' => '' ,'embed' => '');

            $this->_params['post']['define'] = array_merge($options, $this->params()->fromPost());
            $this->_params['post']['define']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_input'], 'order');
            $this->_params['post']['define']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_image'], 'order');
            $this->_params['post']['define']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_detail'], 'order');
            if ($this->_params['id']) {
                $this->_MenuPublicTb->saveData($this->_params);
            } else {
                $this->_params['post']['define']['special'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['special'], 'order');
                $this->_params['id'] = $this->_params['root_id'];
                $this->_MenuCodeTb->saveData($this->_params);
            }

            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $defines = array(
            'input' => array('name','desc_short','detail','thumbnail'),
            'option' => array('link' => array('label' => 'Link','note' => '<a href="javascript:;" class="mt-sweetalert-note" data-message="Trường bắt buộc <b>BẬT</b>"><i class="fa fa-question-circle" aria-hidden="true"></i></a>'),'title','description','keyword','embed'),
            'multi' => array('multi_input','multi_image','multi_detail')
        );
        if (empty($this->_params['id'])) {
            array_unshift($defines['multi'], 'special');
        }
        foreach ($defines as $group => $fields) {
            foreach ($fields as $field => $value) {
                $field = is_array($value) ? $field : $value;
                $data['elements'][$group][] = array_merge(array(
                    'name' => $field,
                    'value' => $data['item'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/Cấu hình dữ liệu');
        $data['_params'] = $this->params()->fromRoute();

        $data['html'] = $this->_renderer->code($data);

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}