<?php
namespace Backend\Controller;

use Backend\Model\MenuCodeTb;
use Backend\Model\OrderTb;
use Backend\Model\ProductDiscountTb;
use Backend\Model\ProductTb;
use Zend\Session\Container;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class OrderTbController extends AbstractActionController
{
	protected $_OrderTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;
    protected $_actionList;
    protected $_session;

	public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_OrderTb = new OrderTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_session = new Container($this->_params['__CONTROLLER__']);
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_actionList = explode('/', $this->_field['link'])[2];

        return parent::onDispatch($e);
    }

	public function listAction()
	{
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'list' => $this->_OrderTb->listItem(array_merge(array('menu_code_id' => $this->_params['root_id']), $this->params()->fromQuery())),
            'status' => array(
                array('value' => '0', 'text' => $this->_translator->translate("Chưa duyệt")),
                array('value' => '1', 'text' => $this->_translator->translate("Đã duyệt"))
            )
        );

        foreach ($data['list'] as $i => $value) {
            if ($value['discount_id']) {
                $discount = $this->discount($value['id']);
                $data['list'][$i]['sku'] = $discount['sku'];
                $data['list'][$i]['total_price'] = $data['list'][$i]['total_price'] - $discount['reducedCash'];
            }
        }

        $this->_session->offsetSet('query', $this->params()->fromQuery());

		return new ViewModel($data);
	}

    public function listOrderAction()
    {
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list-order','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $headers = array(
            array('name' => 'orderId', 'title' => 'Mã đơn hàng', 'class' => '', 'display' => true),
            array('name' => 'sku', 'title' => 'Mã sản phẩm', 'class' => 'colvis', 'colvis' => true, 'display' => true),
            array('name' => 'name', 'title' => 'Tên sản phẩm', 'class' => 'colvis', 'colvis' => true, 'display' => true),
            array('name' => 'package', 'title' => 'Quy cách', 'class' => 'colvis', 'colvis' => true, 'display' => true),
            array('name' => 'price', 'title' => 'Giá bán', 'class' => 'colvis', 'colvis' => true, 'display' => true),
            array('name' => 'quantity', 'title' => 'Số lượng', 'class' => 'colvis', 'colvis' => true, 'display' => true),
            array('name' => 'sum', 'title' => 'Thành tiền', 'class' => 'colvis', 'colvis' => true, 'display' => true),
            array('name' => 'total', 'title' => 'Tổng tiền ' . ($this->_field['define']['unit'] == 'dollar' ? '($)' : '(vnđ)'), 'class' => 'text-center', 'display' => !!$this->_field['define']['total']),
            array('name' => 'discount', 'title' => $this->_field['define']['discount'], 'class' => 'text-center', 'display' => !!$this->_field['define']['discount']),
            array('name' => 'fullname', 'title' => 'Tên khách hàng', 'class' => '', 'display' => true),
            array('name' => 'phone', 'title' => 'Số điện thoại', 'class' => '', 'display' => true),
            array('name' => 'address', 'title' => 'Địa chỉ', 'class' => '', 'display' => true),
            array('name' => 'email', 'title' => 'Email', 'class' => '', 'display' => true),
            array('name' => 'date', 'title' => 'Ngày đặt hàng', 'class' => 'text-center', 'display' => true),
        );

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'headers' => $headers,
            'list' => $this->_OrderTb->listItem(array_merge(array('menu_code_id' => $this->_params['root_id']), $this->params()->fromQuery())),
            'status' => array(
                array('value' => '0', 'text' => $this->_translator->translate("Chưa duyệt")),
                array('value' => '1', 'text' => $this->_translator->translate("Đã duyệt"))
            )
        );

        foreach ($data['list'] as $i => $value) {
            $data['list'][$i]['products'] = $this->_OrderTb->listProduct(array('id' => $value['id']));
            if ($value['discount_id']) {
                $discount = $this->discount($value['id']);
                $data['list'][$i]['sku'] = $discount['sku'];
                $data['list'][$i]['total_price'] = $data['list'][$i]['total_price'] - $discount['reducedCash'];
            }
        }

        $this->_session->offsetSet('query', $this->params()->fromQuery());

        return new ViewModel($data);
    }

    public function viewAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$this->_translator->translate("Thông tin chi tiết"));
        $this->_field['define'] = $this->_renderer->removeElementArray($this->_field['define'], array('multi_field'));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_OrderTb->getItem(array('id' => $this->_params['id'])),
            'list' => $this->_OrderTb->listProduct(array('id' => $this->_params['id'])),
            'linkList' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => $this->_actionList,'root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            )
        );

        $data['item']['sum_price'] = $data['item']['total_price'] - $data['item']['shipping_fee'] - $data['item']['paypal_fee'];

        $data['hasFee'] = ($this->_field['define']['paypal_fee'] && $data['item']['paypal_fee']) || ($this->_field['define']['shipping_fee'] && $data['item']['shipping_fee']);

        if ($this->_field['define']['discount']) {
            $data['discount']['menu'] = $this->_MenuCodeTb->getItem(array('id' => 21, 'columns' => array('id','name','define')));
            if ($data['discount']['menu']['define']['order_id']) {
                $ProductDiscountTb = new ProductDiscountTb();
                $data['discount']['list'] = $ProductDiscountTb->listItem(array('order_id' => $this->_params['id']));
            }
            if ($data['item']['discount_id']) {
                $data['discount']['apply'] = $this->discount($this->_params['id']);
            }
        }

        return new ViewModel($data);
    }

    public function listAllAction()
    {
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => $this->_actionList,'root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        $headers = \Backend\View\Helper\Sort::sortByKey(array_filter(
            array_merge($this->_field['define']['columns']['list'], $this->_field['define']['columns']['detail']),
            function($column) {
                return $column['display'] && $column['sort'] !== '0' && ($column['table'] || $column['excel']);
            }
        ));

        $headersClass = array(
            'id' => 'min-width-70',
            'shipping_fee' => 'text-center min-width-150',
            'extraDiscount' => 'text-center min-width-150',
            'paypal_fee' => 'text-center min-width-150',
            'total_price' => 'text-center min-width-100',
            'discount' => 'text-center min-width-120',
            'date_created' => 'text-center min-width-120',
            'fullname' => 'min-width-150',
            'phone' => 'min-width-70',
            'address' => 'min-width-300',
            'comment' => 'min-width-300',
        );

        $typeNumbers = array('shipping_fee', 'paypal_fee', 'total_price', 'price', 'quantity', 'sum');

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'headers' => array_map(function($header) use ($headersClass, $typeNumbers) {
                $header['type'] = in_array($header['name'], $typeNumbers) ? 'n' : 'str';
                $header['class'] = $headersClass[$header['name']] ?? '';
                return $header;
            }, $headers),
            'list' => $this->_OrderTb->listItem(array_merge(array('menu_code_id' => $this->_params['root_id']), $this->params()->fromQuery())),
            'status' => array(
                array('value' => '0', 'text' => $this->_translator->translate("Chưa duyệt")),
                array('value' => '1', 'text' => $this->_translator->translate("Đã duyệt"))
            )
        );

        foreach ($data['list'] as $i => $value) {
            $data['list'][$i]['products'] = $this->_OrderTb->listProduct(array('id' => $value['id']));
            if ($value['discount_id']) {
                $discount = $this->discount($value['id']);
                $data['list'][$i]['discount'] = $discount['sku'];
                $data['list'][$i]['total_price'] = $data['list'][$i]['total_price'];
            }
        }

        $this->_session->offsetSet('query', $this->params()->fromQuery());

        return new ViewModel($data);
    }

    public function viewAllAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$this->_translator->translate("Thông tin chi tiết"));
        $this->_field['define'] = $this->_renderer->removeElementArray($this->_field['define'], array('multi_field'));

        $headers = array_filter($this->_field['define']['columns']['detail'], function($column) {
            return $column['display'] && $column['table'] && $column['sort'] !== '0';
        });
        $headersWidth = array('thumbnail' => 50, 'sku' => 110, 'quantity' => 80, 'price' => 130, 'sum' => 100);

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_OrderTb->getItem(array('id' => $this->_params['id'])),
            'list' => $this->_OrderTb->listProduct(array('id' => $this->_params['id'])),
            'linkList' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => $this->_actionList,'root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            ),
            'headers' => array_map(function($header) use ($headersWidth) {
                $header['width'] = $headersWidth[$header['name']] ?? '';
                return $header;
            }, $headers),
        );

        if ($this->_field['define']['discount']) {
            $data['discount']['menu'] = $this->_MenuCodeTb->getItem(array('id' => 21, 'columns' => array('id','name','define')));
            if ($data['discount']['menu']['define']['order_id']) {
                $ProductDiscountTb = new ProductDiscountTb();
                $data['discount']['list'] = $ProductDiscountTb->listItem(array('order_id' => $this->_params['id']));
            }
            if ($data['item']['discount_id']) {
                $data['discount']['apply'] = $this->discount($this->_params['id']);
            }
        }

        return new ViewModel($data);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_OrderTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_OrderTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }

    public function settingColumnsAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']) . '/Tùy chỉnh cột');

        $defaultColumnsList = array('id', 'shipping_fee', 'extraDiscount', 'paypal_fee', 'total_price', 'discount', 'fullname', 'phone', 'address', 'email', 'date_created', 'comment');
        $columnsList = $this->_field['define']['columns']['list'] ?? array(
            array('display' => 1, 'sort' => 0, 'title' => '', 'name' => '', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 1, 'title' => 'Mã đơn hàng', 'name' => 'id', 'table' => 1, 'excel' => 1),
            array('display' => 0, 'sort' => '', 'title' => 'Phí vận chuyển', 'name' => 'shipping_fee', 'table' => 1, 'excel' => 1),
            array('display' => 0, 'sort' => '', 'title' => 'Được giảm thêm', 'name' => 'extraDiscount', 'table' => 1, 'excel' => 1),
            array('display' => 0, 'sort' => '', 'title' => 'Phí thanh toán', 'name' => 'paypal_fee', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 7, 'title' => 'Tổng tiền', 'name' => 'total_price', 'table' => 1, 'excel' => 1),
            array('display' => 0, 'sort' => '', 'title' => 'Mã giảm giá', 'name' => 'discount', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 8, 'title' => 'Tên khách hàng', 'name' => 'fullname', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 9, 'title' => 'Số điện thoại', 'name' => 'phone', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 10, 'title' => 'Địa chỉ', 'name' => 'address', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 11, 'title' => 'Email', 'name' => 'email', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 12, 'title' => 'Ghi chú', 'name' => 'comment', 'table' => 0, 'excel' => 1),
            array('display' => 1, 'sort' => 13, 'title' => 'Ngày đặt hàng', 'name' => 'date_created', 'table' => 1, 'excel' => 1),
        );

        $defaultColumnsDetail = array('thumbnail', 'sku', 'name', 'quantity', 'price', 'sum');
        $columnsDetail = $this->_field['define']['columns']['detail'] ?? array(
            array('display' => 1, 'sort' => 0, 'title' => '', 'name' => '', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 1, 'title' => 'Ảnh', 'name' => 'thumbnail', 'table' => 1, 'excel' => 0),
            array('display' => 1, 'sort' => 2, 'title' => 'Mã sản phẩm', 'name' => 'sku', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 3, 'title' => 'Tên sản phẩm', 'name' => 'name', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 4, 'title' => 'Giá sản phẩm', 'name' => 'price', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 5, 'title' => 'Số lượng', 'name' => 'quantity', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 6, 'title' => 'Thành tiền', 'name' => 'sum', 'table' => 1, 'excel' => 1),
        );

        $fixedColumn = 1;
        $denyTurnOff = 2;
        $denyColumnsExcel = array('thumbnail');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => $this->_actionList,'root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            ),
            'denyColumnsExcel' =>  $denyColumnsExcel,
            'pages' => array(
                array(
                    'name' => 'list',
                    'label' => 'Trang danh sách',
                    'fixed' => true,
                    'options' => array('table' => 'Table', 'excel' => 'Excel'),
                    'columns' => array_map(function ($column) use ($defaultColumnsList, $fixedColumn, $denyTurnOff) {
                        if (in_array($column['name'], $defaultColumnsList)) {
                            $column['default'] = in_array($column['name'], array('id')) ? $denyTurnOff : $fixedColumn;
                        }
                        return $column;
                    }, $columnsList),
                ),
                array(
                    'name' => 'detail',
                    'label' => 'Trang chi tiết',
                    'options' => array('table' => 'Table', 'excel' => 'Excel'),
                    'columns' => array_map(function ($column) use ($defaultColumnsDetail, $fixedColumn) {
                        if (in_array($column['name'], $defaultColumnsDetail)) {
                            $column['default'] = $fixedColumn;
                        }
                        return $column;
                    }, $columnsDetail),
                ),
             ),
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->_field['define'];

            $columns = $this->params()->fromPost();
            $defines = array('total_price' => '', 'quantity' => '', 'discount' => '', 'shipping_fee' => '', 'extraDiscount' => '', 'paypal_fee' => '');

            foreach ($defines as $key => $name) {
                $indexList = array_search($key, array_column($columns['list'], 'name'));
                $indexDetail = array_search($key, array_column($columns['detail'], 'name'));

                if ($indexList > -1 && $columns['list'][$indexList]['display']) {
                    $defines[$key] = $columns['list'][$indexList]['title'];
                } elseif ($indexDetail > -1 && $columns['detail'][$indexDetail]['display']) {
                    $defines[$key] = $columns['detail'][$indexDetail]['title'];
                }
            }

            $this->_params['post']['define'] = array_merge(
                $this->_field['define'],
                $defines
            );

            $this->_params['post']['define']['columns'] = array(
                'list' => array_map(function($column){
                    if ($column['excel'] && !$column['table']) {
                        $column['colvis'] = true;
                    };
                    return $column;
                }, \Backend\View\Helper\Sort::sortByKey($columns['list'])),
                'detail' => array_map(function($column){
                    $column['colvis'] = true;
                    return $column;
                }, \Backend\View\Helper\Sort::sortByKey($columns['detail'])),
            );

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $view = new ViewModel($data);
        return $view->setTemplate('partials/columns.phtml');
    }

    public function codefieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']) . '/Cấu hình dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_field['define'],
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => $this->_actionList,'root_id' => $this->_params['root_id']))
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost();
            if ($this->_field['define']['columns']) {
                $this->_params['post']['define']['columns'] = $this->_field['define']['columns'];
            }
            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $settings = $this->params()->fromQuery('settings');

        // Các field và thứ tự hiển thị
        $defines = $settings == 'order-all'
        ? array('radio' => array('unit' => array('label' => 'Đơn vị giá','list' => array('vnd' => 'VND', 'dollar' => 'Dollar'))))
        : array(
            'input' => array('extraDiscount' => array('label' => 'Được giảm thêm'), 'shipping_fee' => array('label' => 'Phí vận chuyển'), 'paypal_fee' => array('label' => 'Phí thanh toán')),
            'radio' => array('unit' => array(
                'label' => 'Đơn vị giá',
                'list' => array('vnd' => 'VND', 'dollar' => 'Dollar'),
                'editable' => array('dollar' => array('title' => 'Thay đổi số thập phân', 'name' => 'unit-decimal', 'value' => $data['item']['unit-decimal'] ?? '3'))
            )),
            'option' => array('total','quantity','discount' => array('label' => 'Mã giảm giá')),
            'multi' => array('multi_field')
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

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }

    public function discount($order_id)
    {
        $ProductDiscountTb = new ProductDiscountTb();
        $order = $this->_OrderTb->getItem(array('id' => $order_id));
        $products = $this->_OrderTb->listProduct(array('id' => $order_id));
        $discount = $ProductDiscountTb->getItem(array('id' => $order['discount_id']));

        $discount['allowed_value'] = explode(',', str_replace(':','',$discount['allowed_value']));
        $productAllowedIds = ($discount['allowed_type'] == 1) ? $discount['allowed_value'] : array();
        $allType = array(2 => 'root_id', 3 => 'brand_id', 4 => 'list_label_id');

        if ($discount['allowed_type'] > 1) {
            $ProductTb = new ProductTb();
            foreach ($discount['allowed_value'] as $id) {
                $productAllowedIds = array_merge($productAllowedIds, array_column($ProductTb->listItem(array($allType[$discount['allowed_type']] => $id)), 'id'));
            }
        }

        $productListIds = array_column($products,'product_id');
        $productAllowedIds = array_intersect($productListIds, $productAllowedIds);

        $discount['reducedCash'] = 0;
        foreach ($products as $product) {
            if (array_search($product['product_id'], $productAllowedIds) !== false) {
                $product = array_merge($product, json_decode($product['product_meta'], true));
                $discount['reducedCash'] = ($discount['reducedCash'] + (($discount['discount_type'] == 1) ? (($product['price']*$discount['discount_value'])/100) : $discount['discount_value'])) * $product['quantity'];
                $discount['list'][] = $product['name'];
            }
        }

        $discount['message'] = 'Mã '.$discount['sku'].' đang được áp dụng.<br/>Giảm '.(($discount['discount_type'] == 1) ? $discount['discount_value'].'%' : number_format($discount['discount_value'],0,0,'.').'đ');
        if ($discount['allowed_type'] == 0) {
            $discount['reducedCash'] = (($discount['discount_type'] == 1) ? (($order['total_price']*$discount['discount_value'])/100) : $discount['discount_value']);
            $discount['message'] .= ' trên tổng giá trị đơn hàng.';
        } else {
            $discount['message'] .= ', áp dụng sản phẩm thuộc danh sách:';
        }

        return $discount;
    }
}
