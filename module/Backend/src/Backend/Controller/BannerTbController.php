<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Model\BannerTb;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class BannerTbController extends AbstractActionController
{
    protected $_Upload;
    protected $_BannerTb;
    protected $_MenuCodeTb;
    protected $_LangMultiTbController;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_Upload = new Upload();
        $this->_BannerTb = new BannerTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));

        $this->_field['define']['validate']['required'] = array_merge(
            array('name' => $this->_field['define']['name']),
            $this->_field['define']['validate']['required'] ?? array()
        );
        $this->_field['define']['validate']['translate'] = isset($this->_field['define']['validate']['translate']) ? $this->_field['define']['validate']['translate'] : $this->identity()->langfield;

        foreach ($this->_field['define']['validate']['required'] as $name => $title) {
            if ($this->_field['define'][$name]) {
                $name = ($this->identity()->lang && (in_array($name, $this->_field['define']['validate']['translate']))) ? 'translate['.$this->identity()->lang.']['.$name.']' : $name;
                $this->_params['checkForm']['required'][$name] = $this->_translator->translate($title);
            }
        }

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
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_BannerTb->listItem(array('menu_code_id' => $this->_params['root_id'], 'language' => ($this->identity()->lang) ? true : false))
        );

        $data['_field']['special'] = array_filter($data['_field']['special'], function($item) { return $item['name'] && ($item['list'] || (!$item['list'] && !$item['detail'])); });

        $view = new ViewModel($data);
        return $view;
    }

    public function fieldAction()
    {
        $data = array(
            '_field' => $this->_field['define'],
            'item' => array(),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        // Xóa phần đầu của mảng
        array_shift($this->_field['define']['multi_image']);

        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            $data['item'] = $this->_BannerTb->getItem(array('id' => $this->_params['id']));
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
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData($this->_field['define']);
                $this->_params['post']['menu_code_id'] = $this->_params['root_id'];

                // Xử lý ảnh
                if ($this->_params['checkForm']['image']) {
                    $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field['define'], array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'banner'.$this->_params['root_id']);
                }

                // Lưu dữ liệu
                $id = $this->_BannerTb->saveData($this->_params);

                // Lưu dữ liệu translate
                if ($this->identity()->lang) {
                    $this->_params['lang'] = $this->identity()->lang;
                    $this->_params['langlist'] = $this->identity()->langlist;
                    $this->_params['item_id'] = $id;
                    $this->_LangMultiTbController->saveData($this->_params);
                }

                if ($this->_params['post']['continue']) {
                    $data['continue'] = $this->_params['post']['continue'];
                } else {
                    return $this->redirect()->toUrl($data['linkList']);
                }
            }
            $data['item'] = ($data['error']) ? $this->_params['post'] : array();
        }

        // Các field và thứ tự hiển thị
        $fields = array('name','link','desc_short','thumbnail','multi_image');
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
        $data['_params'] = array_merge($this->_params, $this->params()->fromRoute());

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/field.phtml');
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_BannerTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                // Xóa item || move hình ảnh qua thư mục uploads/removes
                $item = $this->_BannerTb->getItem(array('id' => $id));
                $this->_Upload->deleteImage($item, $this->_params['checkForm']['image'], $this->_field['define']);
                $this->_BannerTb->deleteItem(array('id' => $id));
                // Xóa ngôn ngữ
                if ($this->identity()->lang) {
                    $this->_LangMultiTbController->deleteItem(array('item_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                }
            }
        }
        return $this->getResponse();
    }

    public function codefieldAction()
    {
        $data = array(
            'item' => $this->_field['define'],
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost();
            $this->_params['post']['define']['validate'] = $this->_field['define']['validate'] ?? array();
            $this->_params['post']['define']['special'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['special'], 'order');
            $this->_params['post']['define']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_image'], 'order');

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['thumbnail']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['thumbnail'],
                    'sizesNews' => $this->_params['post']['define']['thumbnail'],
                    'module' => 'single_banner'.$this->_params['id']
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['define']['multi_image']);
                array_shift($this->_params['post']['define']['multi_image']);
                foreach ($this->_field['define']['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define']['multi_image'][$i]['size'],
                        'module' => 'multi_banner'.$this->_params['id'].$i
                    ));
                }
                $this->_params['post']['define']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $defines = array(
            'input' => array('name','link','desc_short' => array('default' => 0),'thumbnail'),
            'action' => array('display','add-delete','sort'),
            'multi' => array('special','multi_image')
        );
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

    public function codevalidateAction()
    {
        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Danh sách").' '.$this->_translator->translate($this->_field['name']).'/Định nghĩa dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id'])),
            'required' => array(
                'rules' => $this->_field['define']['validate']['required'] ?? array(),
                'fields' => array(
                    'link' => $this->_field['define']['link'],
                    'desc_short' => $this->_field['define']['desc_short'],
                    'thumbnail' => ($this->_field['define']['thumbnail']) ? 'Ảnh đại diện' : ''
                )
            ),
        );

        if ($this->identity()->lang) {
            $data['translate'] = array(
                'rules' => $this->_field['define']['validate']['translate'] ?? array(),
                'fields' => array(
                    'name' => $this->_field['define']['name'],
                    'link' => $this->_field['define']['link'],
                    'desc_short' => $this->_field['define']['desc_short'],
                    'thumbnail' => $this->_field['define']['thumbnail'] ? 'Ảnh đại diện' : ''
                )
            );
        }

        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->_field['define'];
            $this->_params['post']['define']['validate'] = $this->params()->fromPost();
            $this->_params['post']['define']['validate']['translate'] = array_key_exists('translate', $this->params()->fromPost()) ?  $this->params()->fromPost('translate') : array();

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}
