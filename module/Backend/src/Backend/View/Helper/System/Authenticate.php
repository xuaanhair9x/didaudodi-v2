<?php

namespace Backend\View\Helper\System;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Helper\AbstractHelper;

class Authenticate extends AbstractHelper
{
    protected $_authService;
    protected $_serviceManager;
    protected $_msgError;

    public function __construct(\Zend\Authentication\AuthenticationService $authService) {
        $this->_authService = $authService;
    }

    public function checkAcl($arrParams = null)
    {
        if (isset($arrParams['__NAMESPACE__']) && ($arrParams['__NAMESPACE__'] == 'Backend\Controller')) {
            if ($_COOKIE['fail_number'] >= FAIL_NUMBER) {
                return array('action' => 'blocked', 'view' => 'blocked.html');
            }
            if (!$this->_authService->getIdentity()->id) {
                if ($arrParams['controller'] != 'Backend\Controller\login' || $arrParams['action'] == 'blocked') {
                    $action = 'login';
                    $view = 'login.html';
                } else {
                    $action = $arrParams['action'];
                    $view = $arrParams['action'].'.html';
                    if ($arrParams['supper']) {
                        $view = 'ht-'.$arrParams['action'].'.html';
                    }
                }
                return array('action' => $action, 'view' => $view);
            } else {
                // $AdminTb = new \Backend\Model\AdminTb();
                // $check = $AdminTb->getItem(array('id' => $this->_authService->getIdentity()->id, 'columns' => array('id','email','username','status','sessionLogin')));

                // if($check['sessionLogin'] && $check['sessionLogin'] != session_id()) {
                //     $this->logout();
                //     header('Location: ' . URL.'admin/login.html');
                //     die();
                // }

                $migrationDatabase = new \Backend\Model\MigrationDatabase();
                $migrationDatabase->all();
            }
        }
        return false;
    }

    public function login($arrParams = null, $options = array())
    {
        $translator = new \Zend\I18n\Translator\Translator();
        $translator->addTranslationFile('phpArray',ROOT.'/module/Backend/language/'.BE_LANG.'.php','default');

        $collums = array_keys($arrParams);
        $password = \Backend\View\Helper\Crypt::encodePassword($arrParams[$collums[1]]);
        $flag = false;
        if ($options['supper']) {
            $Auth = new \Backend\View\Helper\Api\Auth(array(
                'username' => $arrParams[$collums[0]],
                'password' => $password,
                'role' => json_encode(array(1,2))
            ));
            $itemUser = $Auth->getResult();
        } else {
            $this->_authService->getAdapter()->setTableName($arrParams['table'])
                                            ->setIdentityColumn($collums[0])->setIdentity($arrParams[$collums[0]]) // column xác thực (username/email)
                                            ->setCredentialColumn($collums[1])->setCredential($password); // column xác thực (password)
            if ($this->_authService->authenticate()->isValid()) {
                $itemUser = $this->_authService->getAdapter()->getResultRowObject(null, 'password');
            }
            $itemUser->login = $this->_authService->authenticate()->isValid();
        }

        if (!$itemUser->login) {
            $this->_msgError = $translator->translate($itemUser->messenge ? $itemUser->messenge : "Thông tin đăng nhập chưa đúng");
        } else if ($itemUser->status == 0 && empty($itemUser->supper)) {
            $this->_msgError = $translator->translate("Tài khoản đang Inactive. Vui lòng liên hệ người quản trị");
        } else {
            $flag = true;
            $this->setInfo($itemUser);
        }

        // setCookie
        if ($flag == true) {
            if ($arrParams['rememberPW']) {
                setcookie('authID', $itemUser->id, time() + 86400, '/', DOMAIN);
                setcookie('authValue', $password, time() + 86400, '/', DOMAIN);
                if ($itemUser->supper) {
                    setcookie('supper', $itemUser->supper, time() + 86400, '/', DOMAIN);
                }
            }
            setcookie('time_last_fail', null, time() - 1, '/', DOMAIN); // thời gian fail lần cuối
            setcookie('fail_number', null, time() - 1, '/', DOMAIN); // Số lần fail
        } else {
            setcookie('time_last_fail', time(), time() + LOCK_EXPIRE, '/', DOMAIN); // thời gian fail lần cuối
            setcookie('fail_number', ($_COOKIE['fail_number']) ? $_COOKIE['fail_number'] + 1 : 1, time() + LOCK_EXPIRE, '/', DOMAIN); // Số lần fail
        }

        return $flag;
    }

    public function logout()
    {
        if ($_COOKIE['authID']) {
            setcookie('authID', null, time() - 1, '/', DOMAIN); // id của user
            setcookie('authValue', null, time() - 1, '/', DOMAIN); // password user đã mã hóa
        }
        $this->_authService->clearIdentity();
    }

    public function getError()
    {
        return $this->_msgError;
    }

    public function setInfo($arrParams = null)
    {
        $arrParams = (is_object($arrParams)) ? $arrParams : (object) $arrParams;
        $arrParams->permission = 1;
        if ($arrParams->supper == 2) {
            $arrParams->seo = $arrParams->supper;
            unset($arrParams->supper);
        }

        // Kiểm tra có chức năng Quản trị viên hay không.
        $this->_authService->getAdapter()->setTableName('menu_code_tb')
                                        ->setIdentityColumn('id')->setIdentity(9)
                                        ->setCredentialColumn('display')->setCredential(1);
        if ($this->_authService->authenticate()->isValid() && empty($arrParams->supper)) {
            $arrParams->permission = 0;
            if ($arrParams->role_id) {
                $this->_authService->getAdapter()->setTableName('admin_role_tb')
                                        ->setIdentityColumn('id')->setIdentity($arrParams->role_id)
                                        ->setCredentialColumn('id')->setCredential($arrParams->role_id);
                if ($this->_authService->authenticate()->isValid()) {
                    $arrParams->permission = json_decode($this->_authService->getAdapter()->getResultRowObject('permission')->permission, true);
                }
            }
        }

        // Set config
        $MenuCodeTb = new \Backend\Model\MenuCodeTb();
        $define = $MenuCodeTb->getItem(array('id' => 36, 'display' => 1, 'columns' => array('define')))['define'];
        $arrParams->config = array(
            'confirmExit' => !!$define['confirmExit']
        );

        // Thiết lập thông tin user
        $this->_authService->getStorage()->write($arrParams);
    }

    public function getUser($arrParams = null)
    {
        $itemUser = array();
        if ($arrParams['supper']) {
            $Auth = new \Backend\View\Helper\Api\Auth(array('id' => $arrParams['id']));
            $itemUser = $Auth->getResult();
        } else {
            $this->_authService->getAdapter()->setTableName($arrParams['table'])
                                            ->setIdentityColumn('id')->setIdentity($arrParams['id'])
                                            ->setCredentialColumn('id')->setCredential($arrParams['id']);
            if ($this->_authService->authenticate()->isValid()) {
                $itemUser = $this->_authService->getAdapter()->getResultRowObject(null);
            }
        }
        return $itemUser;
    }
}