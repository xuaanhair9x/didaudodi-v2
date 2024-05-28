<?php
namespace Backend\Controller;

use Backend\Model\AdminRoleTb;
use Backend\Model\AdminTb;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AdminTbController extends AbstractActionController
{
	protected $_AdminTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_params;
    protected $_field;
    protected $_role;

	public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_AdminTb = new AdminTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field['define']['role'] = !empty($this->_MenuCodeTb->getItem(array('id' => 24, 'display' => 1)));

        $AdminRoleTb = new AdminRoleTb();
        $this->_role = $AdminRoleTb->listItem(array('columns' => array('id','name')));

        return parent::onDispatch($e);
    }

	public function listAction()
	{
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        // Filter
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $arrs = array('role_name' => true);
        if (!$this->identity()->supper) {
            $arrs['deny_id'] = array(1, $this->identity()->id);
        }

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'role' => $this->_role,
            'list' => $this->_AdminTb->listItem(array_merge($arrs, $this->params()->fromQuery())),
            'status' => array(
                array('value' => '0', 'text' => $this->_translator->translate("Chưa kích hoạt")),
                array('value' => '1', 'text' => $this->_translator->translate("Đã kích hoạt"))
            )
        );
        // echo '<pre style="color:#f00;font-weight:bold;">'; print_r($data); echo '</pre>';
		$view = new ViewModel($data);
		return $view;
	}

    public function fieldAction()
    {
        $isMyself = !$this->identity()->supper && $this->_params['id'] == $this->identity()->id;
        $title = $this->_translator->translate($isMyself ? "Cập nhật thông tin" : ($this->_params['id'] ? "Chỉnh sửa" : "Thêm mới"));

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$title);
        $this->_params = $this->params()->fromRoute();

        // Kiểm tra form nhập liệu
        $this->_params['checkForm'] = array(
            'required' => array('fullname' => $this->_translator->translate("Họ và tên"),'email' => 'Email'),
            'email' => array('email' => 'Email'),
            'password' => array('password' => $this->_translator->translate("Mật khẩu")),
            'confirm' => array('password_confirm' => array($this->_translator->translate("Nhập lại mật khẩu"), 'password')),
            'image' => array('single' => array('thumbnail' => array('Ảnh đại diện', array('autox30')))),
        );

        if (!$isMyself) {
            $this->_params['checkForm']['required']['username'] = $this->_translator->translate("Tài khoản");
        }

        if ($this->_params['id']) {
            $item = $this->_AdminTb->getItem(array('id' => $this->_params['id']));
        } else {
            $this->_params['checkForm']['required']['password'] = $this->_translator->translate("Mật khẩu");
            $this->_params['checkForm']['required']['password_confirm'] = $this->_translator->translate("Nhập lại mật khẩu");
        }

        $menuAdmin = $this->_MenuCodeTb->getItem(array('id' => 9));
        $data = array(
            '_params' => $this->_params,
            'item' => $item ?? array(),
            '_field' => $this->_field['define'],
            'role' => $this->_role,
            'isMyself' => $isMyself,
            'linkList' => ($menuAdmin['display'] && !$isMyself) ? $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id'])) : $this->url()->fromRoute('admincp'),
            'status' => array(
                array('value' => '0', 'text' => $this->_translator->translate("Chưa kích hoạt")),
                array('value' => '1', 'text' => $this->_translator->translate("Đã kích hoạt"))
            ),
            'elements' => array(
                array(
                    'class' => 'col-lg-4',
                    'label' => 'Họ và tên',
                    'name' => 'fullname',
                    'value' => $item['fullname'],
                    'required' => true
                ),
                array(
                    'class' => 'col-lg-4',
                    'label' => 'Email',
                    'name' => 'email',
                    'value' => $item['email'],
                    'required' => true
                ),
                array(
                    'class' => 'col-lg-4',
                    'label' => '100x100',
                    'name' => 'thumbnail',
                    'value' => $item['thumbnail']
                ),
            )
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            if ($this->_params['id']) {
                $item = $this->_AdminTb->getItem(array('getRecord' => array('id' => $this->_params['id'], 'email' => $this->_params['post']['email'])));
                $text = $this->_translator->translate("Email đã tồn tại");
            } else {
                $item = $this->_AdminTb->getItem(array('getRecord' => array('username' => $this->_params['post']['username'], 'email' => $this->_params['post']['email'])));
                $text = $this->_translator->translate("Tài khoản đã tồn tại. Vui lòng kiểm tra lại Tài khoản hoặc Email");
            }
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true || $item) {
                $data['error'] = ($validate->getMessagesError()) ? $validate->getMessagesError() : array($text);
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData();

                $Upload = new Upload();
                $Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang, 'thumbnail' => '100x100'), $data['item']);

                // Lưu dữ liệu
                $this->_AdminTb->saveData($this->_params);
                if ($this->_params['post']['continue']) {
                    $data['continue'] = $this->_params['post']['continue'];
                } else {
                    return $this->redirect()->toUrl($data['linkList']);
                }
            }
            $data['item'] = ($data['error']) ? $this->_params['post'] : array();
        }

        return new ViewModel($data);
    }

    public function passAction()
    {
        // Kiểm tra form nhập liệu
        $this->_params['checkForm'] = array(
            'required' => array('password' => $this->_translator->translate("Mật khẩu")),
            'password' => array('password' => $this->_translator->translate("Mật khẩu"))
        );
        $data = array('item' => $this->_AdminTb->getItem(array('id' => $this->_params['id'])));

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true) {
                $data['error'] = $validate->getMessagesError();
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData();

                // Lưu dữ liệu
                $this->_AdminTb->saveData($this->_params);
                $data['success'] = $this->_translator->translate("Đổi mật khẩu thành công");
            }
            $data['item'] = ($data['success'] || $data['error']) ? $this->_params['post'] : array();
        }

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Thay đổi mật khẩu"));
        $data['_params'] = $this->params()->fromRoute();

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view;
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_AdminTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_AdminTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }
}