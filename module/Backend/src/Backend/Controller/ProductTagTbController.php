<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Model\MenuCodeTb;
use Backend\Model\ProductCatTb;
use Backend\Model\ProductTagTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class ProductTagTbController extends AbstractActionController
{
    protected $_ProductTagTb;
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
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_ProductTagTb = new ProductTagTb();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field['define']['icon-link-web'] = $this->_field['define']['icon-link-web'] ?? 'none';

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

        if ($this->_field['define']['multi_file']) {
            $this->_params['checkForm']['file'] = $this->_field['define']['multi_file'];
            array_shift($this->_params['checkForm']['file']);
        }

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_ProductTagTb->listItem(array(
                'countProduct' => true,
                'language' => ($this->identity()->lang) ? true : false
            ))
        );

        if ($this->_field['define']['icon-link-web'] != 'none') {
            $ProductCatTb = new ProductCatTb();
            $tagsConfig = $ProductCatTb->listItem(array('parent' => 0, 'define_product' => array('list_tag_id', 'tags')));

            if (count($tagsConfig) == 1 || $this->_field['define']['icon-link-web'] == 'product-tag-without-category') {
                $config = $this->getServiceLocator()->get('Config');
                $router = array_shift(array_filter($config['router']['routes'], function ($v){ return $v['key'] == $this->_field['define']['icon-link-web']; }));
                if ($router) {
                    $data['router'] = array(
                        'spec' => $router['options']['spec'],
                        'params' => array('%id%' => $tagsConfig[0]['id'], '%format%' => $router['format'])
                    );
                } else {
                    $data['_field']['icon-link-web'] = 'none';
                }
            } else {
                $data['_field']['icon-link-web'] = 'none';
            }
        }

        $view = new ViewModel($data);
        return $view;
    }

    public function fieldAction()
    {
        // Điều kiện add/edit
        $data = array(
            'item' => array(),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        // Xóa phần đầu của mảng
        $this->_field['define'] = $this->_renderer->removeElementArray($this->_field['define'], array('multi_image','multi_input','multi_file','multi_detail'));

        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            $data['item'] = $this->_ProductTagTb->getItem(array('id' => $this->_params['id']));
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
            $item = $this->_ProductTagTb->getItem(array('name' => $this->_params['post']['name']));
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true || ($item && !$this->_params['id'])) {
                if ($item) {
                    $data['error'] = array('exist' => $this->_translator->translate($this->_field['name'].': đã tồn tại.'));
                } else {
                    $data['error'] = $validate->getMessagesError();
                }

                if ($data['item']['multi_image']) {
                    $this->_params['post']['multi_image'] = $data['item']['multi_image'];
                }
                if ($data['item']['multi_file']) {
                    $this->_params['post']['multi_file'] = $data['item']['multi_file'];
                }
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData($this->_field['define']);

                // Xử lý ảnh
                if ($this->_params['checkForm']['image']) {
                    $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field['define'], array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'ptag'.$this->_params['root_id']);
                }

                // Xử lý file
                if ($this->_params['checkForm']['file']) {
                    $this->_Upload->uploadFile($this->_params['post'], $this->_params['checkForm']['file']);
                }

                // Lưu dữ liệu
                $id = $this->_ProductTagTb->saveData($this->_params);

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
                    return $this->redirect()->toUrl($data['linkList']);;
                }
            }
            $data['item'] = ($data['error']) ? $this->_params['post'] : array();
        }

        // Các field và thứ tự hiển thị
        $fields = array('name','title','description','slug','desc_short','keyword','multi_input','thumbnail','multi_image','detail','multi_file','multi_detail');
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
                $this->_ProductTagTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_ProductTagTb->deleteItem(array('id' => $id));
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
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/Cấu hình dữ liệu');
        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_field['define'],
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost();

            $this->_params['post']['define']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_input'], 'order');
            $this->_params['post']['define']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_image'], 'order');
            $this->_params['post']['define']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_detail'], 'order');
            $this->_params['post']['define']['multi_file'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_file'], 'order');

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['thumbnail']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['thumbnail'],
                    'sizesNews' => $this->_params['post']['define']['thumbnail'],
                    'module' => 'single_ptag'.$this->_params['id']
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['define']['multi_image']);
                array_shift($this->_params['post']['define']['multi_image']);
                foreach ($this->_field['define']['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define']['multi_image'][$i]['size'],
                        'module' => 'multi_ptag'.$this->_params['id'].$i
                    ));
                }
                $this->_params['post']['define']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $defines = array(
            'input' => array('name','desc_short' => array('default' => 0),'detail' => array('default' => 0),'thumbnail'),
            'radio' => array('icon-link-web' => array('label' => 'Hiển thị icon link web','list' => array('none' => 'Không hiển thị', 'product-tag-width-category' => 'Định dạng url có id danh mục', 'product-tag-without-category' => 'Định dạng url không có id danh mục'))),
            'option' => array('title','description','keyword','slug'),
            'action' => array('display','add','delete','sort'),
            'multi' => array('multi_input','multi_image','multi_file','multi_detail')
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

        $data['html'] = $this->_renderer->code($data);

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}