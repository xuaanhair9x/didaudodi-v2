<?php
namespace Backend\Controller;

use Backend\Model\MemberTb;
use Backend\Model\MenuCodeTb;
use Backend\Model\OrderTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class MemberTbController extends AbstractActionController
{
	protected $_MemberTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_params;
    protected $_field;

	public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_MemberTb = new MemberTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field['define'] = array(
            'email' => 'Email',
            'fullname' => 'Họ và tên',
            'phone' => 'Điện thoại',
            'address' => 'Địa chỉ',
            'note' => 'Ghi chú',
            'thumbnail' => '100x100',
            'hasOrder' => !!$this->_MenuCodeTb->getItem(array('id' => 3, 'display' => 1))
        );

        return parent::onDispatch($e);
    }

	public function listAction()
	{
        // Filter
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'list' => $this->_MemberTb->listItem(array_merge(array('count' => true), $this->params()->fromQuery())),
            'status' => array(
                array('value' => '0', 'text' => 'Inactive'),
                array('value' => '1', 'text' => 'Active')
            )
        );

		$view = new ViewModel($data);
		return $view;
	}

    public function fieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.($this->_params['id'] ? 'Chỉnh sửa' : 'Thêm mới'));
        $this->_params = $this->params()->fromRoute();

        $this->_params['checkForm'] = array(
            'required' => array(
                'fullname' => $this->_field['define']['fullname'],
                'email' => $this->_field['define']['email']
            ),
            'email' => array('email' => $this->_field['define']['email']),
            'image' => array(
                'single' => array(
                    'thumbnail' => array($this->_translator->translate("Ảnh đại diện"), array('autox30'))
                )
            )
        );

        $query = array();
        if ($this->_params['id']) {
            $item = $this->_MemberTb->getItem(array('id' => $this->_params['id']));
            $query['deny_id'] = array($this->_params['id']);
        }

        $data = array(
            '_params' => $this->_params,
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id'])),
            'item' => $item ?? array(),
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            if (isset($this->_params['post']['fullname'])) {
                // Update info member
                $query['email'] = $this->_params['post']['email'];
                $item = $this->_MemberTb->listItem($query);
                $validate = new CheckForm($this->_params);
                if ($validate->isError() == true || $item) {
                    $data['error'] = ($validate->getMessagesError()) ? $validate->getMessagesError() : array($this->_translator->translate("Email đã tồn tại"));
                } else {
                    // Lấy giá trị trả về.
                    $this->_params = $validate->getData();

                    $Upload = new Upload();
                    $Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field['define'], array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item']);
                    if ($this->_params['post']['send'] && !$this->_params['id']) {
                        $this->_params['post']['status'] = 1;
                    }
                    // Lưu dữ liệu
                    $this->_MemberTb->saveData($this->_params);

                    if ($this->_params['post']['send']) {
                        $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                        if (!$this->_params['id']) {
                            $template = $EmailTemplateTb->getItem(array('id' => 7, 'sendmail' => true, 'display' => 1));
                            if($template) {
                                $template['value'] = array(DOMAIN, $this->_params['post']['fullname'], $this->_params['post']['email']);
                                new \Backend\View\Helper\Api\SendMail(array(
                                    'emailTo' => $this->_params['post']['email'],
                                    'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                                    'body' => str_replace($template['key'], $template['value'], $template['body'])
                                ));
                            }
                        }
                        $template = $EmailTemplateTb->getItem(array('id' => 5, 'sendmail' => true, 'display' => 1));
                        if($template) {
                            $template['value'] = array(DOMAIN,$this->_params['post']['fullname'],$this->_params['post']['email'],$this->_params['post']['password']);

                            new \Backend\View\Helper\Api\SendMail(array(
                                'emailTo' => $this->_params['post']['email'],
                                'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                                'body' => str_replace($template['key'], $template['value'], $template['body'])
                            ));
                        }
                    }

                    return $this->redirect()->toUrl($data['linkList']);
                }
                $data['item'] = $data['error'] ? $this->_params['post'] : array();
            } else {
                // Update status member
                $this->_MemberTb->saveData($this->_params);
                $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                if ($this->_params['post']['status'] == 1) {
                    $data['success'] = $this->_translator->translate("Kích hoạt tài khoản thành công");
                    $template = $EmailTemplateTb->getItem(array('id' => 7, 'sendmail' => true, 'display' => 1));
                    if($template) {
                        $template['value'] = array(DOMAIN,$data['item']['fullname'],$data['item']['email']);
                    }
                }
                if ($this->_params['post']['status'] == 0) {
                    $data['success'] = $this->_translator->translate("Vô hiệu hóa tài khoản thành công");
                    $template = $EmailTemplateTb->getItem(array('id' => 6, 'sendmail' => true, 'display' => 1));
                    if($template) {
                        $template['value'] = array(DOMAIN,$data['item']['fullname'],$data['item']['email']);
                    }
                }
                if ($this->_params['post']['send'] && $template) {
                    new \Backend\View\Helper\Api\SendMail(array(
                        'emailTo' => $data['item']['email'],
                        'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                        'body' => str_replace($template['key'], $template['value'], $template['body'])
                    ));
                }
                return $this->redirect()->toUrl($this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'field','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])));
            }
        }

        // Các field và thứ tự hiển thị
        $fields = array('fullname','phone','email','address','thumbnail' => array('class' => 'pull-right'));
        foreach ($fields as $field => $value) {
            $field = is_array($value) ? $field : $value;
            if (!empty($this->_field['define'][$field])) {
                $data['elements'][$field] = array_merge(array(
                    'label' => $this->_field['define'][$field],
                    'name' => $field,
                    'value' => $data['item'][$field],
                    'required' => !!$this->_params['checkForm']['required'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        return new ViewModel($data);
    }

    public function viewAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title',$this->_translator->translate($this->_field['name']).'/'.$this->_translator->translate("Thông tin chi tiết"));
        $OrderTb = new OrderTb();
        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id'])),
            'item' => $this->_MemberTb->getItem(array('id' => $this->_params['id'])),
            'list' => $OrderTb->listItem(array('member_id' => $this->_params['id']))
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            $this->_MemberTb->saveData($this->_params);
            $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
            // Gửi mail thông báo cho khách hàng
            if ($this->_params['post']['status'] == 1) {
                $data['success'] = $this->_translator->translate("Kích hoạt tài khoản thành công");
                $template = $EmailTemplateTb->getItem(array('id' => 7, 'sendmail' => true, 'display' => 1));
                if($template) {
                    $template['value'] = array(DOMAIN,$data['item']['fullname'],$data['item']['email']);
                }
            }
            if ($this->_params['post']['status'] == 0) {
                $data['success'] = $this->_translator->translate("Vô hiệu hóa tài khoản thành công");
                $template = $EmailTemplateTb->getItem(array('id' => 6, 'sendmail' => true, 'display' => 1));
                if($template) {
                    $template['value'] = array(DOMAIN,$data['item']['fullname'],$data['item']['email']);
                }
            }
            if ($this->_params['post']['password']) {
                $data['success'] = $this->_translator->translate("Đổi mật khẩu thành công");
                $template = $EmailTemplateTb->getItem(array('id' => 5, 'sendmail' => true, 'display' => 1));
                if($template) {
                    $template['value'] = array(DOMAIN,$data['item']['fullname'],$data['item']['email'],$this->_params['post']['password']);
                }
            }
            if ($this->_params['post']['send'] && $template) {
                $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                    'emailTo' => $data['item']['email'],
                    'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                    'body' => str_replace($template['key'], $template['value'], $template['body'])
                ));
            }
        }

        return new ViewModel($data);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            $postData = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_MemberTb->saveData(array('id' => $id, 'post' => $postData));

                if (isset($postData['status']) && $postData['send']) {
                    $item = $this->_MemberTb->getItem(array('id' => $id));
                    $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
                    if ($postData['status'] == 1) {
                        $data['success'] = $this->_translator->translate("Kích hoạt tài khoản thành công");
                        $template = $EmailTemplateTb->getItem(array('id' => 7, 'sendmail' => true, 'display' => 1));
                        if($template) {
                            $template['value'] = array(DOMAIN,$item['fullname'],$item['email']);
                        }
                    }
                    if ($postData['status'] == 0) {
                        $data['success'] = $this->_translator->translate("Vô hiệu hóa tài khoản thành công");
                        $template = $EmailTemplateTb->getItem(array('id' => 6, 'sendmail' => true, 'display' => 1));
                        if($template) {
                            $template['value'] = array(DOMAIN,$item['fullname'],$item['email']);
                        }
                    }
                    if($template) {
                        new \Backend\View\Helper\Api\SendMail(array(
                            'emailTo' => $item['email'],
                            'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                            'body' => str_replace($template['key'], $template['value'], $template['body'])
                        ));
                    }
                }
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_MemberTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }
}