<?php
namespace Backend\Controller;

use Backend\Model\EmailTemplateTb;
use Backend\Model\MenuCodeTb;
use Backend\Model\OrderTb;
use Backend\Model\ProductBrandTb;
use Backend\Model\ProductCatTb;
use Backend\Model\ProductDiscountTb;
use Backend\Model\ProductLabelTb;
use Backend\Model\ProductTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class ProductDiscountTbController extends AbstractActionController
{
    protected $_ProductDiscountTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_ProductDiscountTb = new ProductDiscountTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));

        // Kiểm tra form nhập liệu
        $this->_params['checkForm'] = array('required' => array(
            'sku' => $this->_translator->translate($this->_field['define']['sku']),
            'discount_value' => $this->_translator->translate($this->_field['define']['discount'])
        ));

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));
        $linkList = $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']));
        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'active' => $this->params()->fromQuery('status') ?? 1,
            'list' => $this->_ProductDiscountTb->listItem(array('status' => $this->params()->fromQuery('status') ?? 1)),
            'status' => array(
                1 => array('name' => 'Áp dụng', 'link' => $linkList.'?status=1'),
                2 => array('name' => 'Tạm ngưng', 'link' => $linkList.'?status=2'),
                0 => array('name' => 'Hết hiệu lực', 'link' => $linkList.'?status=0')
            )
        );

        return new ViewModel($data);
    }

    public function fieldAction()
    {
        $data = array(
            '_field' => $this->_field['define'],
            'item' => array(),
            'order_id' => $this->params()->fromQuery('order_id'),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array('status' => $this->params()->fromQuery('status')), 'strlen'))
        );
        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            $data['item'] = $this->_ProductDiscountTb->getItem(array('id' => $this->_params['id']));
        }
        if ($data['order_id']) {
            $data['linkList'] = $this->url()->fromRoute('admincp',array('controller' => 'order_tb','action' => 'view','id' => $data['order_id'],'root_id' => 3));
        }
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = array_merge(array_filter($this->params()->fromQuery()), $this->params()->fromPost());
            $error = $this->isError(array_merge($data, $this->_params));
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true || $error) {
                $data['error'] = $error ? $error : $validate->getMessagesError();
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData();

                // Lưu dữ liệu
                $id = $this->_ProductDiscountTb->saveData($this->_params, $this->_field['define']);

                if ($this->_params['post']['continue']) {
                    $data['continue'] = $this->_params['post']['continue'];
                } else {
                    return $this->redirect()->toUrl($data['linkList']);
                }
            }
            $data['item'] = $data['error'] ? $this->_params['post'] : array();
        }

        // Các field và thứ tự hiển thị
        $fields = array('sku','discount_value','expired_number','expired_date','order_value','status' => array(),'allowed_value');

        if ($this->_field['define']['discount']) {
            $fields['discount_value'] = array(
                'attr' => 'ht-trigger="number"',
                'addon' => array(
                    'name' => 'discount_type',
                    'value' => isset($data['item']['discount_type']) ? $data['item']['discount_type'] : 1,
                    'list' => $this->_field['define']['discount']
                )
            );
        }
        if ($this->_field['define']['allowed']) {
            $fields['allowed_value'] = array(
                'type' => 'multi',
                'value' => explode(',', str_replace(':','', $data['item']['allowed_value'])),
                'list' => $this->listType($data['item']['allowed_type']),
                'cate' => array(
                    'placeholder' => 'Áp dụng cho',
                    'name' => 'allowed_type',
                    'value' => $data['item']['allowed_type'] ? $data['item']['allowed_type'] : 0,
                    'list' => $this->_field['define']['allowed'],
                    'attr' => 'onchange="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'allowed','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
                                'position' => 'allowed_value',
                            ), JSON_UNESCAPED_SLASHES)).', _HTChange.selectDiscount(this, \'allowed_value\'));"'
                )
            );
            $this->_field['define']['allowed_value'] = 'Danh sách áp dụng';
        }
        if ($this->_field['define']['status']) {
            $fields['status'] = array(
                'value' => array(1,2),
                'checked' => ($data['item']['status'] == 1 || empty($this->_params['id'])) ? true : false,
                'disabled' => (isset($data['item']['status']) && $data['item']['status'] == 0) ? true : false,
                'data' => array(
                    'on-text' => (isset($data['item']['status']) && $data['item']['status'] == 0) ? '' : 'Áp dụng',
                    'off-text' => (isset($data['item']['status']) && $data['item']['status'] == 0) ? '' : 'Tạm ngưng',
                    'label-text' => (isset($data['item']['status']) && $data['item']['status'] == 0) ? 'Hết hiệu lực' : '&nbsp;',
                    'handle-width' => 100,
                )
            );
        }
        if ($this->_field['define']['expired_date'] && $data['item']['expired_date']) {
            $data['item']['expired_date'] = date('d-m-Y H:i', strtotime($data['item']['expired_date']));
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
        return new ViewModel($data);
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                if ($this->_params['post']['check']) {
                    $check = $this->_ProductDiscountTb->getItem(array('id' => $id));
                    echo empty($check['o.order_id']) ? 0 : 2;
                } else {
                    $this->_ProductDiscountTb->deleteItem(array('id' => $id));
                }
            }
        }
        return $this->getResponse();
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_ProductDiscountTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function allowedAction()
    {
        $data = $this->params()->fromPost();
        $data['list'] =  $this->listType($data['allowed_type']);
        $data['selected'] =  $this->_ProductDiscountTb->getItem(array('id' => $this->_params['id'], 'allowed_type' => $data['allowed_type'], 'columns' => array('allowed_value')))['allowed_value'];
        $data['selected'] = $data['selected'] ? explode(',', str_replace(':','',$data['selected'])) : array();

        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function sendMailAction()
    {
        $item = $this->_ProductDiscountTb->getItem(array('id' => $this->_params['id']));

        $OrderTb = new OrderTb();
        $order = $OrderTb->getItem(array('id' => $this->params()->fromQuery('order_id')));

        $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
        $template = $EmailTemplateTb->getItem(array('id' => 8, 'sendmail' => true));
        $template['value'] = array(DOMAIN,$item['sku']);
        $SendMail = new \Backend\View\Helper\Api\SendMail(array(
            'emailTo' => $order['email'],
            'subject' => str_replace($template['key'], $template['value'], $template['subject']),
            'body' => str_replace($template['key'], $template['value'], $template['body'])
        ));
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

        $allType = array(1 => 'Sản phẩm', 2 => 'Danh mục', 3 => 'Thương hiệu', 4 => 'Phân loại');
        $allDiscount = array(1 => 'Phần trăm', 2 => 'Tiền mặt');
        $allExpired = array('expired_date' => 'Ngày hết hạn', 'expired_number' => 'Số lần áp dụng');

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost();

            if ($this->_params['post']['define']['allowed']) {
                foreach ($this->_params['post']['define']['allowed'] as $i => $id) {
                    $this->_params['post']['define']['allowed'][$i] = array('id' => $id,'name' => $allType[$id]);
                }
                $this->_params['post']['define']['allowed'] = array_merge(array(array('id' => 0, 'name' => 'Đơn hàng')), $this->_params['post']['define']['allowed']);
            }
            if ($this->_params['post']['define']['discount']) {
                $this->_params['post']['define']['discount_value'] = 'Mức giảm';
                foreach ($this->_params['post']['define']['discount'] as $i => $id) {
                    $this->_params['post']['define']['discount'][$i] = array('id' => $id,'name' => $allDiscount[$id]);
                }
            }
            if ($this->_params['post']['define']['expired']) {
                foreach ($this->_params['post']['define']['expired'] as $name) {
                    $this->_params['post']['define'][$name] = $allExpired[$name];
                }
            }

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $defines = array(
            'input' => array('sku' => array('label' => 'Mã giảm giá'), 'order_value' => array('label' => 'Giá trị đơn hàng')),
            'radio' => array('unit' => array('label' => 'Đơn vị giá', 'list' => array('vnd' => 'VND', 'dollar' => 'Dollar'))),
            'select' => array(
                'allowed' => array('type' => 'multiple','label' => 'Danh sách áp dụng','list' => $allType),
                'expired' => array('type' => 'multiple','label' => 'Có hiệu lực','list' => $allExpired),
                'discount' => array('type' => 'multiple','label' => 'Mức giảm','list' => $allDiscount),
            ),
            'action' => array('status' => array('label' => 'Trạng thái'),'add-delete','auto' => array('label' => 'Tự động áp dụng'), 'order_id' => array('label' => 'Phát sinh theo đơn hàng')),
        );
        foreach ($defines as $group => $fields) {
            foreach ($fields as $field => $value) {
                $field = is_array($value) ? $field : $value;
                if (in_array($field, array('allowed','discount'))) {
                    $data['item'][$field] = array_column($data['item'][$field], 'id');
                }
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

    public function listType($type)
    {
        $list = array();
        switch ($type) {
            case 1:
                $ProductTb = new ProductTb();
                $list =  $ProductTb->listItem(array('columns' => array('id','name')));
            break;
            case 2:
                $ProductCatTb = new ProductCatTb();
                $ids = array_column($ProductCatTb->listItem(array('parent' => 0, 'columns' => array('id'))), 'id');
                $list =  $ProductCatTb->listItem(array('deny_id' => $ids, 'columns' => array('id','name')));
            break;
            case 3:
                $ProductBrandTb = new ProductBrandTb();
                $list =  $ProductBrandTb->listItem(array('columns' => array('id','name')));
            break;
            case 4:
                $ProductLabelTb = new ProductLabelTb();
                $list =  $ProductLabelTb->listItem(array('columns' => array('id','name')));
            break;
        }

        return $list;
    }

    public function isError($params)
    {
        $error = array();
        if ($params['item']['o.order_id']) {
            $arrField = array('sku' => 'Mã giảm giá','discount_value' => 'Mức giảm','order_value' => 'Giá trị đơn hàng','allowed_value' => 'Danh sách áp dụng');
            $applied = array();
            foreach ($arrField as $field => $name) {
                switch ($field) {
                    case 'sku':
                        if ($params['item'][$field] != $params['post'][$field]) {
                            $applied[] = $name;
                        }
                    break;
                    case 'discount_value':
                        if (($params['item'][$field] != preg_replace('/[^0-9]/', '', $params['post'][$field])) || ($params['item']['discount_type'] != $params['post']['discount_type'])) {
                            $applied[] = $name;
                        }
                    break;
                    case 'order_value':
                        if ($params['item'][$field] && $params['item'][$field] != preg_replace('/[^0-9]/', '', $params['post'][$field])) {
                            $applied[] = $name;
                        }
                    break;
                    case 'allowed_value':
                        $params['post']['allowed_type'] = $params['post']['allowed_type'] ? $params['post']['allowed_type'] : 0;
                        if (array_diff($params['item'][$field], $params['post'][$field]) || ($params['item']['allowed_type'] != $params['post']['allowed_type'])) {
                            $applied[] = $name;
                        }
                    break;
                }
            }
            if ($applied) {
                $error[] = 'Mã giảm giá đã được sử dụng, không được phép chỉnh sửa: '.implode(', ', $applied);
            }
            if (   !empty($params['post']['expired_number'])
                && ($params['item']['expired_number'] != $params['post']['expired_number'])
                && $params['post']['expired_number'] < count(explode('|', $params['item']['o.order_id']))
            ) {
                $error[] = 'Mã giảm giá đã được sử dụng, số lần áp dụng phải lớn hơn tổng số đơn hàng ('.count(explode('|', $params['item']['o.order_id'])).') đã áp dụng mã giảm giá này.';
            }
            if (   !empty($params['post']['expired_date'])
                && ($params['item']['expired_date'] != $params['post']['expired_date'])
                && strtotime($params['post']['expired_date']) < time()
            ) {
                $error[] = 'Mã giảm giá đã được sử dụng, ngày hết hạn phải lớn hơn thời gian hiện tại';
            }
        }
        if ($params['order_id'] && !$params['id'] && $this->_ProductDiscountTb->listItem(array('order_id' => $params['order_id']))) {
            $error[] = 'Đơn hàng <b>#'.$params['order_id'].'</b> đã được tạo mã giảm giá. Vui lòng kiểm tra lại trong chi tiết đơn hàng.';
        }

        return $error;
    }
}