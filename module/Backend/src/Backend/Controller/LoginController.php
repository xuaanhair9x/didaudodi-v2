<?php

namespace Backend\Controller;

use Backend\Model\AdminRoleTb;
use Backend\Model\AdminSessionTb;
use Backend\Model\AdminTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class LoginController extends AbstractActionController
{
    protected $_params;
    protected $_translator;
    protected $_renderer;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        return parent::onDispatch($e);
    }

    public function loginAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title',$this->_translator->translate("Đăng nhập") . (($this->_params['supper']) ? ' ADMIN' : ''));

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'translate' => array(
                'tai_khoan' => $this->_translator->translate("Tài khoản"),
                'mat_khau' => $this->_translator->translate("Mật khẩu"),
                'ghi_nho_mat_khau' => $this->_translator->translate("Ghi nhớ mật khẩu"),
                'quen_mat_khau' => $this->_translator->translate("Quên mật khẩu"),
                'dang_nhap' => $this->_translator->translate("Đăng nhập"),
                'thong_tin_bat_buoc' => $this->_translator->translate("Thông tin bắt buộc")

            )
        );

        $authService = $this->getServiceLocator()->get('HitechAuth');
        // Không cần đăng nhập khi đang trong phiên đăng nhập
        if ($this->identity()->id) {
            return $this->redirect()->toRoute('admincp');
        }

        // Không cần đăng nhập khi có ghi nhớ mật khẩu
        if ($_COOKIE['authID']) {
            $arrParams = array(
                'supper'    => $_COOKIE['supper'],
                'id'        => $_COOKIE['authID'],
                'table' => 'admin_tb'
            );
            $itemUser = $authService->getUser($arrParams);

            if ($itemUser->password == $_COOKIE['authValue']) {
                unset($itemUser->password);
                $authService->setInfo($itemUser);
                return $this->redirect()->toRoute('admincp');
            }
        }

        // Đăng nhập
        if ($this->getRequest()->isPost() == true) {
            $this->_params['post'] = $this->params()->fromPost();
            $this->_params['checkForm'] = array('required' => array('username' => 'Username','password' => 'Password'));
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true) {
                $data['error_input'] = $validate->getMessagesError();
            } else {
                $this->_params = $validate->getData();
                $arrParams = array(
                    'username' => $this->_params['post']['username'],
                    'password' => $this->_params['post']['password'],
                    'table' => 'admin_tb',
                    'rememberPW' => isset($this->_params['post']['rememberPW']) ? true : false,
                );
                if ($authService->login($arrParams, $this->_params) == true) {
                    // Ghi lại thời gian đăng nhập
                    if (!$this->identity()->supper && !$this->identity()->seo) {
                        $AdminSessionTb = new AdminSessionTb();
                        $AdminSessionTb->saveData(array('admin_id' => $this->identity()->id));

                        $AdminTb = new AdminTb();
                        $AdminTb->saveData(array('id' => $this->identity()->id, 'post' => array('sessionLogin' => session_id())));

                        if ($this->identity()->force_reset) {
                            return $this->redirect()->toRoute('admincp',array('controller' => 'change.html'));
                        }
                    }
                    return $this->redirect()->toRoute('admincp');
                } else {
                    $data['error_login'] = $authService->getError().'<br>'.$this->_translator->translate("Bạn còn").' '.(FAIL_NUMBER - $_COOKIE['fail_number']).' '.$this->_translator->translate("lần đăng nhập");
                }
            }
        }

        $data['html'] = $this->_renderer->code($data);

        $this->layout('layout/login');
        return new ViewModel($data);
    }

    public function logoutAction()
    {
        if ($this->identity()->supper || $this->identity()->seo) {
            $redirect = 'ht-login.html';
        } else {
            $AdminSessionTb = new AdminSessionTb();
            $itemSession = $AdminSessionTb->getItemLast(array('admin_id' => $this->identity()->id));
            if ($itemSession) {
                $AdminSessionTb->saveData(array('id' => $itemSession['id']));
            }
            $redirect = 'login.html';
        }
        $this->getServiceLocator()->get('HitechAuth')->logout();
        return $this->redirect()->toRoute('admincp',array('controller' => $redirect));
    }

    public function resetAction()
    {
        $data = array();

        if ($this->identity()->id) {
            return $this->redirect()->toRoute('admincp');
        }
        if ($this->getRequest()->isPost() == true) {
            $this->_params['post'] = $this->params()->fromPost();
            $AdminTb = new AdminTb();
            $itemUser = $AdminTb->getItem(array('getRecord' => array('email' => $this->_params['post']['email']), 'columns' => array('id','email','username','status')));
            if ($itemUser) {
                if ($itemUser['status'] == 0) {
                    $data['error_reset'] = $this->_translator->translate("Tài khoản của email").' '.$this->_params['post']['email'].' '.$this->_translator->translate("đang bị vô hiệu hóa. Vui lòng liên hệ người quản trị");
                } else {
                    $password = \Backend\View\Helper\Rand::string();
                    $this->_params['post']['password'] = \Backend\View\Helper\Crypt::encodePassword($password);
                    $this->_params['post']['force_reset'] = 1;
                    $this->_params['id'] = $itemUser['id'];
                    $AdminTb->saveData($this->_params);

                    $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                    $template = $EmailTemplateTb->getItem(array('id' => 4, 'sendmail' => true));
                    $template['value'] = array(DOMAIN,$itemUser['username'],$password);
                    $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                        'emailTo' => $itemUser['email'],
                        'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                        'body' => str_replace($template['key'], $template['value'], $template['body'])
                    ));

                    $data['success'] = $this->_translator->translate("Vui lòng kiểm tra email để nhận mật khẩu mới");
                }
            } else {
                $data['error'] = $this->_translator->translate("Email không tồn tại. Vui lòng kiểm tra lại!");
            }
        }

        $this->getEvent()->getRouteMatch()->setParam('title',$this->_translator->translate("Quên mật khẩu"));
        $data['_params'] = $this->params()->fromRoute();
        $data['_params']['post'] = $this->_params['post'];
        $data['linkLogin'] = $this->url()->fromRoute('admincp',array('controller' => 'login.html'));

        $this->layout('layout/login');
        $view = new ViewModel($data);
        return $view;
    }

    public function changeAction()
    {
        $data = array();

        if ($this->getRequest()->isPost() == true) {
            $this->_params['post'] = $this->params()->fromPost();
            $this->_params['checkForm'] = array(
                'required' => array('password' => $this->_translator->translate("Mật khẩu"),'password_confirm' => $this->_translator->translate("Nhập lại mật khẩu")),
                'password' => array('password' => $this->_translator->translate("Mật khẩu"))
            );
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true) {
                $data['error_input'] = $validate->getMessagesError();
            } else {
                $this->_params = $validate->getData();
                $AdminTb = new AdminTb();
                $AdminTb->saveData(array('id' => $this->identity()->id, 'post' => $this->_params['post']));
                $data['success'] = $this->_translator->translate("Đổi mật khẩu thành công");
            }
        }

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Đổi mật khẩu"));
        $data['_params'] = $this->params()->fromRoute();

        $this->layout('layout/login');
        $view = new ViewModel($data);
        return $view;
    }

    public function blockedAction()
    {
        $data = array();
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Đăng nhập").' - blocked');
        if ($this->identity()->id) {
            return $this->redirect()->toRoute('admincp');
        }
        $data['lock_expire_real'] = LOCK_EXPIRE - (time() - $_COOKIE['time_last_fail']);
        $this->layout('layout/login');
        $view = new ViewModel($data);
        return $view;
    }
}
