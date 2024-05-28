<?php

namespace Frontend\Controller;

use Frontend\Model\CommentTb;
use Frontend\Model\ContactTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MemberTb;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\SubscriberTb;
use Frontend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;

class ContactController extends AbstractActionController
{
	public function indexAction() // 51.html
    {
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        $data = array('action' => 'contact-index', 'active' => 'contact-index');

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();
        $mailer = $InfoTb->getItem(array('id' => $branch[1], 'columns' => array('mailer')))['mailer'];

		if ($this->getRequest()->isPost()) {
			$params['post'] = $this->getRequest()->getPost()->toArray();
			$params['checkform'] = array(
				'required' => array('fullname','phone','email'),
				'number' => array('phone'),
				'email' => array('email')
			);
			$CheckForm = new CheckForm($params);
			if ($CheckForm->isError() == true) {
				$data['error'] = $CheckForm->getMessagesError();
				$data['item'] = $params['post'];
			} else {
				$params['post']['root_id'] = 12;
				if (!empty($_FILES['file']['name'])) {
					$params['post']['file'] = $_FILES['file']['name'];
					move_uploaded_file($_FILES['file']['tmp_name'], ROOT_PUBLIC.'/'.UPLOAD_FILES.$params['post']['file']);
				}

				$ContactTb = new ContactTb();
				$ContactTb->saveData($params);

                if ($data['info']['email']) {
                    $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                    $template = $EmailTemplateTb->getItem(array('id' => 1, 'sendmail' => true, 'display' => 1));
                    if($template) {
                        $template['value'] = array(DOMAIN,$params['post']['fullname'],$params['post']['phone'],$params['post']['email'],URL.'admin');
                        $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                            'emailTo' => $data['info']['email'],
                            'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                            'body' => str_replace($template['key'], $template['value'], $template['body'])
                        ));
                    }
                }

                return $this->getResponse();
			}
		}

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array_merge(
            array($MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('name','title','keyword','description','link','active')))),
            array($MenuPublicTb->getItem(array('active' => $data['active'], 'columns' => array('name','title','keyword','description','link','active','multi_image'))))
        );

        $langCurrent = str_replace(URL, '', URL_LANG);
        $currentSlug = $langCurrent.$params['slug'];
        $actualSlug = str_replace('-'.$params['format'], '', end($data['menu'])['link']);
        if ($actualSlug != $currentSlug) {
            $response = $this->getResponse();
            $response->getHeaders()->addHeaderLine('Location', URL.$actualSlug.'-'.$params['format']);
            $response->setStatusCode(302);
            $response->sendHeaders();
        }

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $data['menu'][1]['title'],
            'keyword' => $data['menu'][1]['keyword'],
            'description' => $data['menu'][1]['description'],
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = $data['menu'][1]['slugLang']; // Nếu có ngôn ngữ LANG

		return new ViewModel($data);
	}

    public function registerAction() // 52.html
    {
        $params = $this->params()->fromRoute();
        if ($this->getRequest()->isPost()) {
            $params['post'] = $this->getRequest()->getPost()->toArray();
            $params['post']['root_id'] = 53;

            // $type = $params['post']['type'];
            // $params['post']['type'] = '<a target="_blank" href="'.PUBLIC_PATH.'admin/product_tb/field/id='.$params['post']['product_id'].'/root_id=1'.'">'.$type.'</a>';

            $ContactTb = new ContactTb();
            $ContactTb->saveData($params);
            $InfoTb = new InfoTb();
            $data['info'] = $InfoTb->getItem();
            if ($data['info']['email']) {
                $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                $template = $EmailTemplateTb->getItem(array('id' => 9, 'sendmail' => true, 'display' => 1)); // Truyền id

                if($template) {
                    $template['value'] = array(
                        DOMAIN,
                        $params['post']['fullname'],
                        $params['post']['phone'],
                        URL.'admin'
                    );

                    $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                        'emailTo' => $data['info']['email'],
                        'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                        'body' => str_replace($template['key'], $template['value'], $template['body'])
                    ));
                }
            }

            echo json_encode(array());
        }
        return $this->getResponse();
    }

    public function subscriberAction() // 53.html
    {
        $data = array();
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        if ($this->getRequest()->isPost()) {
            $params['post'] = $this->getRequest()->getPost()->toArray();
            $SubscriberTb = new SubscriberTb();
            $SubscriberTb->saveData($params);
            $data['setTemplate'] = array(
                'notify' => $translator->translate('Đăng ký thành công'),
                'reload' => true
            );
            echo json_encode($data['setTemplate']);
        }
        return $this->getResponse();
    }

    public function commentAction() // 54.html
    {
        $params = $this->params()->fromRoute();
        $MemberTb = new MemberTb();
        $session = new Container('frontend');

        if($session->logged) {
            $data['logged'] = $MemberTb->getItem(array('id' => $session->logged['id']));
        }

        if ($this->getRequest()->isPost()) {
            $params['post'] = $this->getRequest()->getPost()->toArray();
            if (!isset($params['post']['id'])) {
                $params['post'] = array_merge($params['post'], json_decode($params['post']['multi_data'], true));
                $params['post']['member_id'] = $data['logged']['id'];

                $time = strtotime(date('Y-m-d H:i:s'));
                if (!empty($_FILES['video']['name'])) {
                    $fileVideoName = $time.'-'.$_FILES['video']['name'];
                    move_uploaded_file($_FILES['video']['tmp_name'], ROOT_PUBLIC.'/'.UPLOAD_FILES.$fileVideoName);
                    $params['post']['video'] = $fileVideoName;
                }

                if (!empty($_FILES['images']['name'][0])) {
                    $arrsFileName = array();
                    foreach (array_unique($_FILES['images']['name']) as $i => $value) {
                        $fileImgName = $time.'-'.$value;
                        move_uploaded_file($_FILES['images']['tmp_name'][$i], ROOT_PUBLIC.'/'.UPLOAD_FILES.$fileImgName);
                        $arrsFileName[] = $fileImgName;
                    }
                    $params['post']['multi_image'] = array_unique($arrsFileName);
                }

                $InfoTb = new InfoTb();
                $data['info'] = $InfoTb->getItem();
                if ($data['info']['email']) {
                    $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                    $template = $EmailTemplateTb->getItem(array('id' => 3, 'sendmail' => true, 'display' => 1));
                    if($template) {
                        $template['value'] = array(DOMAIN, $params['post']['fullname'], $data['logged']['email'], $params['post']['comment'],$params['post']['article_name'],$params['post']['article_link'],URL.'admin');
                        $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                            'emailTo' => $data['info']['email'],
                            'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                            'body' => str_replace($template['key'], $template['value'], $template['body'])
                        ));
                    }
                }

                $CommentTb = new CommentTb();
                $CommentTb->saveData($params);
                echo json_encode(array());
            } else {
                if(in_array($params['post']['type'], array('like','dislike')) && $data['logged']['id']) {
                    $listLike = $listDislike = array();
                    switch ($params['post']['type']) {
                        case 'like':
                            if(empty($data['logged']['like'])) {
                                $listLike[] = $params['post']['id'];
                            } else {
                                $listLike = json_decode($data['logged']['like'], true);
                                if(in_array($params['post']['id'], $listLike)) {
                                    $indexLike = array_search($params['post']['id'], $listLike);
                                    unset($listLike[$indexLike]);
                                    $listLike = array_values($listLike);
                                } else {
                                    $listLike[] = $params['post']['id'];
                                }

                                // xóa id bên cột dislike
                                if(!empty($data['logged']['dislike'])) {
                                    $listDislike = json_decode($data['logged']['dislike'], true);
                                    if(in_array($params['post']['id'], $listDislike)) {
                                        $indexDislike = array_search($params['post']['id'], $listDislike);
                                        unset($listDislike[$indexDislike]);
                                        $listDislike = array_values($listDislike);
                                    }
                                }
                            }
                            break;
                        default:
                            if(empty($data['logged']['dislike'])) {
                                $listDislike[] = $params['post']['id'];
                            } else {
                                $listDislike = json_decode($data['logged']['dislike'], true);
                                if(in_array($params['post']['id'], $listDislike)) {
                                    $index = array_search($params['post']['id'], $listDislike);
                                    unset($listDislike[$index]);
                                    $listDislike = array_values($listDislike);
                                } else {
                                    $listDislike[] = $params['post']['id'];
                                }

                                // xóa id bên cột like
                                if(!empty($data['logged']['like'])) {
                                    $listLike = json_decode($data['logged']['like'], true);
                                        if(in_array($params['post']['id'], $listLike)) {
                                        $indexLike = array_search($params['post']['id'], $listLike);
                                        unset($listLike[$indexLike]);
                                        $listLike = array_values($listLike);
                                    }
                                }
                            }
                            break;
                    }

                    $arrayData = array(
                        'id' => $data['logged']['id'],
                        'post' => array(
                            'like' => $listLike,
                            'dislike' => $listDislike
                        )
                    );
                    $MemberTb->saveData($arrayData);

                    $listMember = $MemberTb->listItem(array('columns' => array('id','like','dislike')));
                    $countLike = $countDislike = 0;
                    foreach ($listMember as $value) {
                        if(!empty($value['like'])) {
                            $like = json_decode($value['like'], true);
                            if(in_array($params['post']['id'], $like)) {
                                $countLike++;
                            }
                        } if(!empty($value['dislike'])) {
                            $dislike = json_decode($value['dislike'], true);
                            if(in_array($params['post']['id'], $dislike)) {
                                $countDislike++;
                            }
                        }
                    }

                    echo json_encode(array('like' => $countLike, 'dislike' => $countDislike));
                } else {
                    echo json_encode(array());
                }
            }
        }
        return $this->getResponse();
    }

    public function thankyouAction() // 55.html
    {
        $params = $this->params()->fromRoute();
        $translator = $this->getServiceLocator()->get('translator');
        $data = array('action' => 'contact-thankyou', 'active' => 'contact-thankyou');

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array_merge(
            array($MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('name','title','keyword','description','link','active')))),
            array(array('title' => $translator->translate("Cám ơn Quý khách"), 'link'=> 'cam-on-55.html'))
        );

        $langCurrent = str_replace(URL, '', URL_LANG);
        $currentSlug = $langCurrent.$params['slug'];
        $actualSlug = str_replace('-'.$params['format'], '', end($data['menu'])['link']);
        if ($actualSlug != $currentSlug) {
            $response = $this->getResponse();
            $response->getHeaders()->addHeaderLine('Location', URL.$actualSlug.'-'.$params['format']);
            $response->setStatusCode(302);
            $response->sendHeaders();
        }

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Cám ơn Quý khách"),
            'keyword' => $translator->translate("Cám ơn Quý khách"),
            'description' => $translator->translate("Cám ơn Quý khách"),
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
        ));
        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = $data['menu'][1]['slugLang']; // Nếu có ngôn ngữ LANG
        //
        return new ViewModel($data);
    }
}