<?php

namespace Frontend\Controller;

use Backend\View\Helper\CheckForm;
use Frontend\Controller\NewsController;
use Frontend\Model\MemberTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsCatTb;
use Frontend\Model\NewsTb;
use Frontend\View\Helper\ThumbImages\Upload;
use Zend\Authentication\AuthenticationService;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class MemberController extends AbstractActionController
{
    // protected $_session = '';

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $params = $this->params()->fromRoute();
        $this->_session = new Container('frontend');
        $url = explode('/',$_SERVER['REDIRECT_URL'])[count(explode('/',$_SERVER['REDIRECT_URL']))-1];
        if (!$this->_session->logged && !in_array($params['action'], array('login','signUp','signIn','signOut','password'))) {
            return $this->redirect()->toUrl(URL_LANG);
        }
        return parent::onDispatch($e);
    }

    public function profileAction() // 71.html
    {
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        $data = array('action' => 'member-profile');

        $session = new Container('frontend');
        // $session->offsetSet('login', ''); // Xóa session

        $MemberTb = new MemberTb();
        if($this->_session->logged['id']) {
            $data['member'] = $MemberTb->getItem(array(
                'id' => $this->_session->logged['id'],
                'columns' => array('id','email','fullname','phone','username','address','thumbnail')
            ));
        }


        if ($this->getRequest()->isPost()) {
            $params['id'] = $this->_session->logged['id'];
            $params['post'] = $this->getRequest()->getPost()->toArray();

            // lưu thumbnail
            $time = strtotime(date('Y-m-d H:i:s'));
            if (!empty($_FILES['thumbnail']['name'])) {
                $filename = $time.'-'.$_FILES['thumbnail']['name'];
                move_uploaded_file($_FILES['thumbnail']['tmp_name'], ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-', $filename)[0]).'/autox30-'.$filename);
                $params['post']['thumbnail'] = $filename;
            }

            // xóa ảnh cũ
            if($params['post']['thumbnail'] && $data['member']['thumbnail']) {
                if(file_exists(ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-', $data['member']['thumbnail'])[0]).'/autox30-'.$data['member']['thumbnail']) && is_file(ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-', $data['member']['thumbnail'])[0]).'/autox30-'.$data['member']['thumbnail'])) {
                    unlink(ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-', $data['member']['thumbnail'])[0]).'/autox30-'.$data['member']['thumbnail']);
                }
            }

            $MemberTb->saveData($params);
            $this->_session->logged = array_merge($this->_session->logged, $params['post']);

            echo json_encode(array());
            return $this->response;
        }

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array(
            $MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('title','link'))),
            array('title' => $translator->translate("Thông tin tài khoản"))
        );

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Thông tin tài khoản"),
            'keyword' => '',
            'description' => '',
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = array('vi' => 'thong-tin-tai-khoan', 'en' => 'en/account-info'); // Nếu có ngôn ngữ LANG

        return new ViewModel($data);
    }

    public function signUpAction() // 72.html
    {
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        if ($this->getRequest()->isPost()) {
            $params['post'] = $this->getRequest()->getPost()->toArray();
            $MemberTb = new MemberTb();
            $member = $MemberTb->getItem(array('email' => $params['post']['email']));
            if ($member) {
                $data['setTemplate'] = array(
                    'notify' => $translator->translate('Email đã tồn tại trên hệ thống.<br/>Vui lòng sử dụng email khác để đăng ký tài khoản!'),
                    'reload' => false
                );
            } else {
                $params['post']['status'] = 1;
                $MemberTb->saveData($params);
                $data['setTemplate'] = array(
                    'notify' => $translator->translate('Bạn đã đăng ký tài khoản thành công.<br/>Vui lòng đăng nhập để tiếp tục!'),
                    'reload' => true
                );
            }
            echo json_encode($data['setTemplate']);
        }
        return $this->getResponse();
    }

    public function loginAction() // 55.html
    {
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        $data = array('action' => 'member-login', 'active' => 'member-login');

        $session = new Container('frontend');

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        if ($session->logged) {
            return $this->redirect()->toUrl(URL);
        } else {
            // tạo link đăng nhập google
            $arrs = array(
                'post' => array(
                    'client_id' => $data['info']['multi_input']['id-gg'],
                    'secret' => $data['info']['multi_input']['secret-gg']
                )
            );
            $URL = URL.'google.php?event=getlink';

            if($_GET['code']) {
                if(isset($_GET['authuser'])) {
                    $arrs['google'] = $_GET;
                    $URL = URL.'google.php?event=authenticate';

                    $queryData = http_build_query($arrs);
                    $curl = curl_init();
                    curl_setopt_array($curl, array(
                        CURLOPT_SSL_VERIFYPEER => 0, // ????
                        CURLOPT_POST => 1, // Post
                        CURLOPT_HEADER => 0, // bao gồm tiêu đề
                        CURLOPT_RETURNTRANSFER => 1, // trả về dạng chuỗi
                        CURLOPT_URL => $URL, // URI
                        CURLOPT_POSTFIELDS => $queryData,
                    ));

                    $user = json_decode(curl_exec($curl), true);
                    curl_close($curl);

                    // xử lý lưu thông tin vào db
                    if($user['googleInfo']['id']) {
                        $MemberTb = new MemberTb();
                        $member = $MemberTb->getItem(array('email' => $user['googleInfo']['email']));

                        if ($member) {
                            // lưu session khi tạo tài khoản
                            $session->logged = $member;
                            setcookie('logged', $member['email'], time() + 360000,'/', DOMAIN);
                            return $this->redirect()->toUrl(URL);
                        } else {
                            // lưu thumbnail
                            $rawImage = file_get_contents($user['googleInfo']['picture']);
                            $time = strtotime(date('Y-m-d H:i:s'));
                            $avatar = '';
                            if($rawImage) {
                                $avatar = $time.'-avatar-'.$user['googleInfo']['id'].'.png';
                                $path = ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-', $avatar)[0]).'/autox30-'.$avatar;
                                file_put_contents($path, $rawImage);
                            }

                            $params['post'] = array(
                                'fullname' => $user['googleInfo']['name'],
                                'email' => $user['googleInfo']['email'],
                                'username' => $user['googleInfo']['id'],
                                'password' => 'Ht123456@X',
                                'thumbnail' => $avatar,
                                'date_created' => $time,
                                'status' => 1,
                                'type' => 'google'
                            );

                            $MemberTb->saveData($params);
                            $member = $MemberTb->getItem(array('email' => $user['googleInfo']['email']));

                            // lưu session khi tạo tài khoản
                            $session->logged = $member;
                            setcookie('logged', $member['email'], time() + 360000,'/', DOMAIN);

                            return $this->redirect()->toUrl(URL.'profile-71.html');
                        }
                    }
                } else {
                    $app_id = $data['info']['multi_input']['id-fb'];
                    $app_secret = $data['info']['multi_input']['secret-fb'];
                    $redirect_uri = urlencode(URL.'dang-nhap-55.html');

                    $code = $_GET['code'];

                    $fb_access_token_uri = 'https://graph.facebook.com/v2.8/oauth/access_token?client_id='.$app_id.'&redirect_uri='.$redirect_uri.'&client_secret='.$app_secret.'&code='.$code;

                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $fb_access_token_uri);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

                    $response = curl_exec($ch);
                    curl_close($ch);

                    // Get access token
                    $aResponse = json_decode($response);
                    $access_token = $aResponse->access_token;

                    // Get user infomation
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, 'https://graph.facebook.com/me?access_token='.$access_token.'&fields=id,name,email,picture');
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

                    $response = curl_exec($ch);
                    curl_close($ch);

                    $user = json_decode($response, true);

                    if($user['id']) {
                        $MemberTb = new MemberTb();
                        if($user['email']) {
                            $member = $MemberTb->getItem(array('email' => $user['email']));
                        } else {
                            $member = $MemberTb->getItem(array('username' => $user['id']));
                        }

                        if ($member) {
                            // lưu session khi tạo tài khoản
                            $session->logged = $member;
                            setcookie('logged', $member['email'], time() + 360000,'/', DOMAIN);

                            return $this->redirect()->toUrl(URL);
                        } else {
                            // lấy thumbnail
                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, 'https://graph.facebook.com/'.$user['id'].'?access_token='.$access_token.'&fields=picture.width(720).height(720)&redirect=false');
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                            $response = curl_exec($ch);
                            curl_close($ch);
                            $picture = json_decode($response, true);

                            // lưu thumbnail
                            $rawImage = file_get_contents($picture['picture']['data']['url']);
                            $time = strtotime(date('Y-m-d H:i:s'));
                            $avatar = '';

                            if($rawImage) {
                                $avatar = $time.'-avatar-'.$user['id'].'.png';
                                $path = ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-', $avatar)[0]).'/autox30-'.$avatar;
                                file_put_contents($path, $rawImage);
                            }

                            $params['post'] = array(
                                'fullname' => $user['name'],
                                'email' => $user['email'],
                                'username' => $user['id'],
                                'password' => 'Ht123456@X',
                                'thumbnail' => $avatar,
                                'date_created' => $time,
                                'status' => 1,
                                'type' => 'facebook'
                            );

                            $MemberTb->saveData($params);
                            if($user['email']) {
                                $member = $MemberTb->getItem(array('email' => $user['email']));
                            } else {
                                $member = $MemberTb->getItem(array('username' => $user['id']));
                            }

                            // lưu session khi tạo tài khoản
                            $session->logged = $member;
                            setcookie('logged', $member['email'], time() + 360000,'/', DOMAIN);

                            return $this->redirect()->toUrl(URL.'profile-71.html');
                        }
                    }
                }
            } else {
                $queryData = http_build_query($arrs);
                $curl = curl_init();
                curl_setopt_array($curl, array(
                    CURLOPT_SSL_VERIFYPEER => 0, // ????
                    CURLOPT_POST => 1, // Post
                    CURLOPT_HEADER => 0, // bao gồm tiêu đề
                    CURLOPT_RETURNTRANSFER => 1, // trả về dạng chuỗi
                    CURLOPT_URL => $URL, // URI
                    CURLOPT_POSTFIELDS => $queryData,
                ));

                $result = json_decode(curl_exec($curl), true);
                curl_close($curl);
                $data['linkGoogle'] = $result['authUrl'];
            }
        }


        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array_merge(
            array($MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('name','title','keyword','description','link','active')))),
            array(array('title' => 'Login', 'link'=> 'dang-nhap-55.html'))
        );

        $data['term'] = $MenuPublicTb->getItem(array('id' => 21, 'columns' => array('name','link')));

        // $langCurrent = str_replace(URL, '', URL_LANG);
        // $currentSlug = $langCurrent.$params['slug'];
        // $actualSlug = str_replace('-'.$params['format'], '', end($data['menu'])['link']);
        // if ($actualSlug != $currentSlug) {
        //     $response = $this->getResponse();
        //     $response->getHeaders()->addHeaderLine('Location', URL.$actualSlug.'-'.$params['format']);
        //     $response->setStatusCode(302);
        //     $response->sendHeaders();
        // }

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => 'Login',
            'keyword' => 'Login',
            'description' => 'Login',
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));
        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = $data['menu'][1]['slugLang']; // Nếu có ngôn ngữ LANG
        //
        return new ViewModel($data);
    }

    public function signInAction() // 73.html
    {
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        if ($this->getRequest()->isPost()) {
            $params['post'] = $this->getRequest()->getPost()->toArray();
            $MemberTb = new MemberTb();
            $member = $MemberTb->login($params);

            if ($member) {
                $this->_session->logged = $member;
                if (isset($params['post']['rememberPW'])) {
                    setcookie('logged', $params['post']['email'], time() + 360000,'/', DOMAIN);
                }
                $data['setTemplate'] = array(
                    'notify' => $translator->translate('Đăng nhập thành công!'),
                    'reload' => true
                );
            } else {
                $data['setTemplate'] = array(
                    'notify' => $translator->translate('Email hoặc mật khẩu không đúng!'),
                    'reload' => false
                );
            }
            echo json_encode($data['setTemplate']);
        }
        return $this->getResponse();
    }

    public function signOutAction() // 74.html
    {
        $this->_session->offsetSet('logged', '');
        if ($_COOKIE["logged"]) {
            setcookie('logged', null, time() - 1, '/', DOMAIN);
            unset($_COOKIE['logged']);
        }

        echo json_encode(array());
        return $this->redirect()->toUrl(URL);
    }

    public function passwordAction() // 75.html
    {
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        $request = $this->getRequest();
        if ($request->isPost()) {
            $params['post'] = $request->getPost()->toArray();
            $MemberTb = new MemberTb();
            if ($this->_session->logged){ // thay đổi mật khẩu khi đã đăng nhập
                $params['post']['email'] = $this->_session->logged['email'];
                $MemberTb->changePassword($params);
                echo json_encode(array());
            } else { // Thay đổi mật khẩu ngẫu nhiên khi quên mật khẩu
                $member = $MemberTb->getItem(array('email' => $params['post']['email']));
                if (!$member) {
                    $data['error'] = true;
                    echo json_encode($data['error']);
                } else if (!$params['post']['checkAjax']){
                    $params['post']['password'] = \Backend\View\Helper\Rand::string();
                    $MemberTb->changePassword($params);
                    if ($params['post']['email']) {
                        $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                        $template = $EmailTemplateTb->getItem(array('id' => 5, 'sendmail' => true));
                        $template['value'] = array(DOMAIN,$member['fullname'],$params['post']['email'],$params['post']['password']);
                        $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                            'emailTo' => $params['post']['email'],
                            'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                            'body' => str_replace($template['key'], $template['value'], $template['body'])
                        ));
                    }
                    echo json_encode(array());
                } else {
                    echo json_encode(false);
                }
            }
        }
        return $this->getResponse();
    }
}
?>