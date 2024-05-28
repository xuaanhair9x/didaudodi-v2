<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Model\InfoTb;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class InfoTbController extends AbstractActionController
{
    protected $_InfoTb;
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
        $this->_InfoTb = new InfoTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field['define']['validate']['required'] = array_merge(
            array('name' => $this->_field['define']['name']),
            $this->_field['define']['validate']['required'] ? $this->_field['define']['validate']['required'] : array()
        );
        $this->_field['define']['validate']['translate'] = isset($this->_field['define']['validate']['translate']) ? $this->_field['define']['validate']['translate'] : $this->identity()->langfield;
        // Kiểm tra form nhập liệu
        foreach ($this->_field['define']['validate']['required'] as $name => $title) {
            if ($this->_field['define'][$name] || strpos($name, 'multi_input') > -1) {
                $name = ($this->identity()->lang && (in_array($name, $this->_field['define']['validate']['translate']))) ? 'translate['.$this->identity()->lang.']['.$name.']' : $name;
                $this->_params['checkForm']['required'][$name] = $this->_translator->translate($title);
            }
        }
        if ($this->_field['define']['logo']) {
            $this->_params['checkForm']['image']['single']['logo'] = array('Logos', array('autox30'));
        }
        if ($this->_field['define']['favicon']) {
            $this->_params['checkForm']['image']['single']['favicon'] = array('Favicon', array('autox30'));
        }
        if ($this->_field['define']['image']) {
            $this->_params['checkForm']['image']['single']['image'] = array('Ảnh chia sẻ MXH', array('autox30'));
        }
        if ($this->_field['define']['multi_file']) {
            $this->_params['checkForm']['file'] = $this->_field['define']['multi_file'];
            array_shift($this->_params['checkForm']['file']);
        }
        if ($this->_field['define']['multi_image']) {
            foreach ($this->_field['define']['multi_image'] as $i => $value) {
                $this->_params['checkForm']['image']['multi'][$value['name']] = array($this->_translator->translate($value['label']), array('autox30'));
            }
            array_shift($this->_params['checkForm']['image']['multi']);
        }

        return parent::onDispatch($e);
    }

    public function fieldAction()
    {
        $data = array(
            '_field' => $this->_field['define'],
            'item' => $this->_InfoTb->getItem(array('id' => $this->_params['id']))
        );

        // Dữ liệu translate
        if ($this->identity()->lang) {
            $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
        }

        // Xóa phần đầu của mảng
        $this->_field['define'] = $this->_renderer->removeElementArray($this->_field['define'], array('multi_image','multi_input','multi_detail','multi_file'));

        // Show error convert webp
        if (!defined('WEBP_CONVERT') && $this->_field['define']['webp']) {
            $data['error'] = array('Website đang bật tính năng '.$this->_field['define']['webp'].'. Bạn chưa thiết lập đầy đủ tính năng. <a href="https://drive.google.com/drive/u/1/folders/1AfOaIjDt-sD-OdPgNDpTOwu1VdEX44Xa" target="blank">Xem hướng dẫn!</a>');
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
                $this->_params = $validate->getData($this->_field['define']);

                // Xử lý ảnh
                if ($this->_params['checkForm']['image']) {
                    $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field['define'], array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'info'.$this->_params['root_id']);
                }
                // Xử lý file
                if ($this->_params['checkForm']['file']) {
                    $this->_Upload->uploadFile($this->_params['post'], $this->_params['checkForm']['file']);
                }
                // Lưu dữ liệu
                $id = $this->_InfoTb->saveData($this->_params, $this->_field['define']);
                $data['success'] = $this->_translator->translate("Bạn đã chỉnh sửa thành công!");

                // Lưu dữ liệu translate
                if ($this->identity()->lang) {
                    $this->_params['lang'] = $this->identity()->lang;
                    $this->_params['langlist'] = $this->identity()->langlist;
                    $this->_params['item_id'] = $id;
                    $this->_params['display'] = 'all';
                    $this->_LangMultiTbController->saveData($this->_params);
                }
            }

            // Load lại dữ liêu sau khi lưu
            if ($data['error']) {
                $data['item'] = $this->_params['post'];
            } else {
                $data['item'] = $this->_InfoTb->getItem(array('id' => $this->_params['id']));
                if ($this->identity()->lang) {
                    $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
                }
            }
        }

        // Các field và thứ tự hiển thị
        $fields = array('name','address','email','logo' => array('text' => 'Logo'),'favicon' => array('text' => 'Favicon'),'image' => array('text' => 'Ảnh chia sẻ MXH', 'note' => 'Hình ảnh hiển thị khi share link website trên facebook, zalo,…'),'multi_image','multi_input','map' => array('label' => 'Mã nhúng bản đồ'),'embed' => array('position' => array('head' => $this->_translator->translate("Trong").' <head>','btop' => $this->_translator->translate("Dưới").' <body>','bbot' => $this->_translator->translate("Trên").' </body>', 'off' => $this->_translator->translate("Tắt"))),'multi_file','multi_detail');
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
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));
        $data['_params'] = array_merge($this->_params, $this->params()->fromRoute());

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view;
    }

    public function headlineAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            '_params' => $this->params()->fromRoute(),
            '_field' => $this->identity()->lang ? $this->identity()->langlist : array(array('default','Headline')),
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            if ($this->identity()->lang) {
                $this->_params['post']['headline']['default'] = $this->_params['post']['headline'][$this->identity()->lang];
            }
            $this->_InfoTb->saveData($this->_params);
            $data['success'] = $this->_translator->translate("Bạn đã chỉnh sửa thành công!");
        }

        $data['class'] = array('col-md-12','col-md-6','col-md-4','col-md-3')[$this->identity()->supper ? count($data['_field']) : count($data['_field']) - 1];
        $data['item'] = $this->_InfoTb->getItem(array('id' => $this->_params['id']))['headline'];

        $data['item']['slug'] = ($data['item']['slug']) ? $data['item']['slug'] : array('slug-0');
        if ($this->identity()->lang && $data['item']['default']) {
            $data['item'][$this->identity()->lang] = $data['item']['default'];
        }

        return new ViewModel($data);
    }

    public function mailerAction()
    {
        unset($this->_field['define']['validate']);

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));
        $data = array(
            '_params' => $this->params()->fromRoute(),
            'services' => $this->_field['define']
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post']['mailer'] = array();
            switch ($this->params()->fromPost('service')) {
                case 'notifyit369': break;
                case 'amazon':
                    $this->_params['post']['mailer'] = $this->params()->fromPost();
                    $this->_params['post']['mailer']['mailer_id'] = 3;
                break;
                default:
                    $this->_params['post']['mailer'] = $this->params()->fromPost();
                    $this->_params['post']['mailer']['auth']['pass'] = $this->_params['post']['mailer']['auth']['pass'];
                break;
            }
            $this->_InfoTb->saveData($this->_params);
            $data['success'] = $this->_translator->translate("Bạn đã chỉnh sửa thành công!");
        }

        $data['item'] = $this->_InfoTb->getItem(array('id' => $this->_params['id']));
        if ($data['item']['mailer']) {
            $index = array_search($data['item']['mailer']['service'], array_column($data['services'], 'service'));
            $data['services'][$index] = array_merge($data['services'][$index], $data['item']['mailer']);
        }

        return new ViewModel($data);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_InfoTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
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
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'field','id' => $this->_params['id'],'root_id' => $this->_params['root_id']))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost();
            $this->_params['post']['define']['validate'] = $this->_field['define']['validate'] ? $this->_field['define']['validate'] : array();
            $this->_params['post']['define']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_input'], 'order');
            $this->_params['post']['define']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_image'], 'order');
            $this->_params['post']['define']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_detail'], 'order');
            $this->_params['post']['define']['multi_file'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_file'], 'order');

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['logo']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['logo'],
                    'sizesNews' => $this->_params['post']['define']['logo'],
                    'module' => 'single_info'.$this->_params['root_id']
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['define']['multi_image']);
                array_shift($this->_params['post']['define']['multi_image']);
                foreach ($this->_field['define']['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define']['multi_image'][$i]['size'],
                        'module' => 'multi_info'.$this->_params['root_id'].$i
                    ));
                }
                $this->_params['post']['define']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            if ($this->_params['post']['define']['webp']) {
                \Backend\View\Helper\ThumbImages\WebpConvert::convertAll();
            }

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $defines = array(
            'input' => array('name','address','email','logo','favicon' => array('note' => '<a href="javascript:;" class="mt-sweetalert-note" data-html="false" data-message="Chỉ nhập kích thước 16x16"><i class="fa fa-question-circle" aria-hidden="true"></i></a>'),'image' => array('label' => 'Ảnh chia sẻ MXH','note' => '<a href="javascript:;" class="mt-sweetalert-note" data-html="false" data-message="Chỉ nhập kích thước 560x292"><i class="fa fa-question-circle" aria-hidden="true"></i></a>')),
            'option' => array('map','embed','display' => array('label' => 'On/Off website', 'note' => '<a href="javascript:;" class="mt-sweetalert-note" data-message="Chức năng bật/tắt website, không hiển thị nội dung website."><i class="fa fa-question-circle" aria-hidden="true"></i></a>'), 'confirmExit' => array('label' => 'Confirm exit'), 'webp' => array('label' => 'Support Webp')),
            'multi' => array('multi_input','multi_image','multi_detail','multi_file')
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

    public function codevalidateAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_field['name'].'/Cấu hình dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'field','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
            'required' => array(
                'rules' => $this->_field['define']['validate']['required'],
                'fields' => array(
                    'address' => $this->_field['define']['address'],
                    'map' => $this->_field['define']['map']
                )
            )
        );

        foreach ($this->_field['define']['multi_input'] as $value) {
            if ($value['label'] && !isset($value['auto'])) {
                $data['required']['fields']['multi_input{'.$value['name'].'}'] = $value['label'];
            }
        }

        if ($this->identity()->lang) {
            $data['translate'] = array(
                'rules' => $this->_field['define']['validate']['translate'],
                'fields' => array(
                    'name' => $this->_field['define']['name'],
                    'address' => $this->_field['define']['address'],
                    'detail' => $this->_field['define']['detail']
                )
            );
        }
        // Thực thi ghi dữ liệu
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