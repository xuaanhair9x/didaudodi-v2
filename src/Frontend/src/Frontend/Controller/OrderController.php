<?php

namespace Frontend\Controller;
use Frontend\Model\HtmlTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MemberTb;
use Frontend\Model\MenuPublicTb;
use Frontend\Model\OrderDetailTb;
use Frontend\Model\OrderTb;
use Frontend\Model\ProductCatTb;
use Frontend\Model\ProductDiscountTb;
use Frontend\Model\ProductSelectTb;
use Frontend\Model\ProductTb;
use Frontend\Model\SectionTb;
use Frontend\View\Helper\SortByColumn;
use Frontend\View\Helper\WriteLog;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class OrderController extends AbstractActionController
{
    public function cartAction() // 61.html
    {
        $translator = $this->getServiceLocator()->get('translator');
        $params = $this->params()->fromRoute();
        $data = array('action' => 'order-cart');
        $session = new Container('frontend');
        // $session->offsetSet('cart', ''); // Xóa session

        $session->cart = array_values($session->cart);
        $data['cart'] = $session->cart;

        // Lấy định nghĩa hiển thị trong menu_code_tb
        $OrderDetailTb = new OrderDetailTb();
        $data['config'] = $OrderDetailTb->config();

        // lấy danh sách giảm giá
        $ProductTb = new ProductTb();
        $data['discountListSuggestion'] = $ProductTb->getList(array('cat_id' => 17, 'columns' => array('id','multi_input')));
        foreach ($data['discountListSuggestion'] as $i => $value) {
            $data['discountListSuggestion'][$i]['min'] = str_replace(',','', $value['multi_input']['don-toi-thieu']);
            $data['discountListSuggestion'][$i]['discount'] = str_replace(',','', $value['multi_input']['duoc-giam']);
        }

        $SortByColumn = new SortByColumn();
        $data['discountListSuggestion'] = $SortByColumn($data['discountListSuggestion'], 'min', 'SORT_ASC');

        // Xử lý thông qua ajax
        if ($this->getRequest()->isPost()) {
            $params['post'] = $this->getRequest()->getPost()->toArray();
            switch ($params['post']['type']) {
                case 'blur':
                case 'plus':
                case 'minus':
                    $index = array_search($params['post']['search'], array_column($session->cart, 'search'));
                    if(in_array($params['post']['search'], array_column($session->cart, 'search'))){
                        $session->cart[$index]['quantity'] = $params['post']['quantity'];
                        $totalInfo = $this->calcPriceSuggestion();
                        $infoItem = array_merge($totalInfo, array('item' => $session->cart[$index]));
                        echo json_encode($infoItem);
                    }
                    break;
                case 'delete':
                    $index = array_search($params['post']['search'], array_column($session->cart, 'search'));
                    if (empty($session->cart[$index]['product_sub'])) {
                        unset($session->cart[$index]);
                        $totalInfo = $this->calcPriceSuggestion();
                        $infoItem = array_merge($totalInfo, array('item' => $session->cart[$index]));
                        echo json_encode($infoItem);
                    }
                    break;
                case '': // Thêm sp vào giỏ hàng
                    $session->cart = ($session->cart) ? $session->cart : array();
                    $item = (array_search($params['post']['search'], array_column($session->cart, 'search')) === false) ? array() : $session->cart[array_search($params['post']['search'], array_column($session->cart, 'search'))];

                    if (empty($item) || $item['id'] != $params['post']['id']) {
                        $session->cart[] = $params['post'];
                    } else {
                        $indexItemCart = array_search($params['post']['search'], array_column($session->cart, 'search'));

                        if ($item && $params['post']['quantity']) {
                            $session->cart[$indexItemCart]['quantity'] += $params['post']['quantity'];
                        }

                        if ($item && $params['post']['thumbnail']) {
                            $session->cart[$indexItemCart]['thumbnail'] = $params['post']['thumbnail'];
                        }

                        if ($item && $params['post']['comboList']) {
                            $session->cart[$indexItemCart]['comboList'] = $params['post']['comboList'];
                            $session->cart[$indexItemCart]['price'] = $params['post']['price'];
                            $session->cart[$indexItemCart]['price_market'] = $params['post']['price_market'];
                            $session->cart[$indexItemCart]['price_discount'] = $params['post']['price_discount'];
                            $session->cart[$indexItemCart]['quantity'] = $params['post']['quantity'];
                        }
                    }

                    echo json_encode(array('count' => count($session->cart), 'post' => $params['post']));
                break;
            }
            return $this->getResponse();
        } else {
            $SectionTb = new SectionTb();
            $data['banner'] = $SectionTb->getItem(array('id' => 11, 'columns' => array('multi_image'), 'special' => 'hien-thi'));
            $data['camKet'] = $SectionTb->getItem(array('id' => 8, 'columns' => array('multi_image'), 'special' => 'hien-thi'));

            // lấy combo gợi ý:
            $listRoot = array_column($data['cart'], 'root_id');
            $checkNoCombo = true;
            if(in_array(16, $listRoot)) {
                $checkNoCombo = false;
            }

            // lấy combo gợi ý khi giỏ hàng có 1 sản phẩm
            if($checkNoCombo && count($data['cart']) == 1) {
                $data['combo'] = $ProductTb->getList(array(
                    'cat_id' => 16,
                    'columns' => array('id','name','slug','list_combo_item'),
                    'list_product_id' => $data['cart'][0]['id'],
                    'limit' => 4
                ));
            }

            // lấy sản phẩm bạn có thể thích
            if(!$data['combo']) {
                $array = array(
                    'root_id' => 1,
                    'columns' => array('id','name','slug','thumbnail','price_market','price_discount','price_percent','list_product_id'),
                    'limit' => 20
                );

                if($data['cart']) {
                    $cartTemp = $ProductTb->getList(array('root_id' => 1, 'list_id' => array_column($data['cart'], 'id'), 'columns' => $array['columns']));
                    $strProduct = str_replace(':','', implode(',', array_column($cartTemp, 'list_product_id')));
                    $listProductID = array_unique(explode(',', $strProduct));
                    $array['deny_id'] = array_column($data['cart'], 'id');
                    if($listProductID) {
                        $array['list_id'] = $listProductID;
                    }
                } else {
                    $coTheThich = $ProductTb->getItem(array('id' => 2193, 'columns' => array('name','list_product_id')));
                    if($coTheThich['list_product_id']) {
                        $array['list_id'] = explode(',', str_replace(':','', $coTheThich['list_product_id']));
                    }
                }

                $data['product'] = $ProductTb->getList($array);
            }
        }

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array(
            $MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('title','link'))),
            array(
                'name' => $translator->translate("Giỏ hàng"),
                'title' => $translator->translate("Thông tin giỏ hàng của bạn"),
                'multi_image' => $MenuPublicTb->getItem(array('id' => 23, 'columns' => array('multi_image')))['multi_image']
            )
        );

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Thông tin giỏ hàng của bạn"),
            'keyword' => $translator->translate("giỏ hàng, đơn hàng"),
            'description' => $translator->translate("Vui lòng kiểm tra lại thông tin đơn hàng trong giỏ hàng của bạn. Bạn có thể tiếp tục mua hàng hoặc tiến hành gửi đặt hàng"),
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = array('vi' => 'gio-hang', 'en' => 'en/shopping-cart'); // Nếu có ngôn ngữ LANG

        return new ViewModel($data);
    }

    public function bookingAction() // 62.html
    {
        $translator = $this->getServiceLocator()->get('translator');
        $url = explode('/',$_SERVER['REDIRECT_URL'])[count(explode('/',$_SERVER['REDIRECT_URL']))-1];
        $params = $this->params()->fromRoute();
        $data = array('action' => 'order-booking');
        $session = new Container('frontend');
        if (!$session->cart && $url == $translator->translate('dat-hang-62.html')) {
            return $this->redirect()->toUrl(URL_LANG);
        }
        $MemberTb = new MemberTb();
        $OrderTb = new OrderTb();
        $ProductCatTb = new ProductCatTb();
        $ProductTb = new ProductTb();
        $WriteLog = new WriteLog();
        $InfoTb = new InfoTb();

        $data['info'] = $InfoTb->getItem();

        if ($url == $translator->translate('dat-hang-62.html')) {
            $data['cart'] = $session->cart;
            $ProductDiscountTb = new ProductDiscountTb();
            $data['discount'] = $ProductDiscountTb->getItem(array('auto' => true));
            if ($data['discount']) {
                if(!empty($data['discount']['expired_number'])) {
                    if($data['discount']['expired_number'] <= $data['discount']['remain']) {
                        $data['discount'] = array();
                    }
                } else {
                    if($data['discount']['expired_number'] >= $data['discount']['remain']) {
                        $data['discount'] = array();
                    }
                }
            }
        }

        if ($session->logged) { $data['member'] = $session->logged; }

        $OrderDetailTb = new OrderDetailTb();
        $data['config'] = $OrderDetailTb->config();

        // lấy khu vực nội thành + ngoại thành
        $data['khuVuc'] = array(
            array(
                'name' => $data['info']['headline']['slug-41'],
                'list' => $ProductTb->getList(array('cat_id' => 52, 'columns' => array('id','name','multi_input')))
            ),
            array(
                'name' => $data['info']['headline']['slug-42'],
                'list' => $ProductTb->getList(array('cat_id' => 18, 'columns' => array('id','name','multi_input')))
            )
        );

        if ($this->getRequest()->isPost()) {
            $params['post'] = $this->getRequest()->getPost()->toArray();
            $orderPrice = $session->orderPrice;

            // Tạo tài khoản nếu không phải member
            if(!$session->logged['id']) {
                $data['member'] = $MemberTb->getItem(array('email' => $params['post']['email']));

                // Lưu lại thông tin khách hàng / member
                if ($data['member']['id']) {
                    $params['id'] = $data['member']['id'];
                }

                $MemberTb->saveData($params);
                $data['member'] = $MemberTb->getItem(array('email' => ($data['member']['email']) ? $data['member']['email'] : $params['post']['email']));
            }

            // nối địa chỉ
            if($params['post']['ward']) {
                $params['post']['address'] .= ', '.str_replace('Phường','phường', $params['post']['ward']);
            }
            if($params['post']['district']) {
                $district = array_merge($data['khuVuc'][0]['list'], $data['khuVuc'][1]['list']);
                $indexDistrict = array_search($params['post']['district'], array_column($district, 'id'));
                $params['post']['address'] .= $district[$indexDistrict]['name'] ? ', '.$district[$indexDistrict]['name'] : '';
            }

            if (!$params['post']['recipient_data']) {
                $params['post']['recipient_data'] = array(
                    'fullname' => $data['member']['fullname'],
                    'phone' => $data['member']['phone'],
                    'address' => $params['post']['address']
                );
            }

            // lấy hình thức giao hàng
            if($params['post']['shippingType']) {
                $ProductSelectTb = new ProductSelectTb();
                $shippingType = $ProductTb->getItem(array('id' => $params['post']['shippingType'], 'columns' => array('id','name','list_select_id')));
                $shippingType['name'] = $ProductSelectTb->listItem(array('root_id' => 58, 'list_id' => explode(',', str_replace(':','', $shippingType['list_select_id'])), 'columns' => array('id','name'), 'limit' => 1))[0]['name'];
            }

            $orderCode = $data['member']['id'].$time = strtotime(date('Y-m-d H:i:s'));
            $paymentType = array('cod' => 'Thanh toán khi nhận hàng', 'momo' => 'Thanh toán qua ví điện tử MoMo', 'vnpay' => 'Thanh toán qua ví điện tử VNPay');
            $orderPost['post'] = array(
                'orderCode' => $orderCode,
                'member_id' => $data['member']['id'],
                'discount_id' => $params['post']['discount_id'],
                'discountInfo' => array('id' => $params['post']['discount_id'], 'discountCode' => $orderPrice['discountCode'], 'value' => $orderPrice['reducedCash']),
                'comment' => $params['post']['comment'],
                'recipient_data' => $params['post']['recipient_data'],
                'multi_data' => $params['post']['multi_data'],
                'total_sum' => $orderPrice['totalPrice'],
                'total_price' => $orderPrice['totalRemain'],
                'extraDiscount' => $orderPrice['extraDiscount'],
                'shipping_fee' => $orderPrice['shippingTotal'],
                'shippingType' => $shippingType['name'] ? $shippingType['name'] : '',
                'paymentType' => $paymentType[$params['post']['payment'] ? $params['post']['payment'] : 'cod'],
                'paymentCode' => $params['post']['payment'] ? $params['post']['payment'] : 'cod',
                'paymentStatus' => $params['post']['payment'] != 'cod' ? 'Chưa hoàn tất thanh toán':''
            );

            $OrderTb->saveData($orderPost);

            // ghi dữ liệu chi tiết đơn hàng
            $OrderDetailTb = new OrderDetailTb();
            $orderItem = $OrderTb->getItem(array('orderCode' => $orderCode));
            $orderDetailPost['post']['orders_id'] = $orderItem['id'];

            // lưu lại session đơn hàng
            $session->cartInfo = array('orderCode' => $orderItem['orderCode']);

            // thông chi tiết từng sản phẩm (ảnh, sản phẩm, số lượng, đơn giá, thành tiền, tổng tiền)
            $orderInfo = '<table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse; width:100%">
                <tbody>
                    <tr>
                        <td style="width: 11%; text-align: center;background-color: rgb(242, 242, 242);"><span style="font-size:14px"><strong>Ảnh</strong></span></td>
                        <td style="width: 43%;background-color: rgb(242, 242, 242);"><span style="font-size:14px"><strong>Sản phẩm</strong></span></td>
                        <td style="width: 16%; text-align: center;background-color: rgb(242, 242, 242);"><span style="font-size:14px"><strong>Đơn giá</strong></span></td>
                        <td style="width: 10.8%; text-align: center;background-color: rgb(242, 242, 242);"><span style="font-size:14px"><strong>Số lượng</strong></span></td>
                        <td style="width: 18%; text-align: right;background-color: rgb(242, 242, 242);"><span style="font-size:14px"><strong>Thành tiền</strong></span></td>
                    </tr>';
            $j = 0;
            // vòng lặp để insert theo từng sp
            foreach ($data['cart'] as $value) {
                $orderDetailPost['post']['product_id'] = $value['id'];
                $orderDetailPost['post']['quantity'] = $value['quantity'];
                $orderDetailPost['post']['product_meta'] = json_encode($value);
                $OrderDetailTb->saveData($orderDetailPost);

                $price = '<span style="font-size:14px"><strong>'.number_format($value['price'],0,0,'.').'</strong></span>';
                if($value['price_discount'] > 0) {
                    $price = '<span style="font-size:14px;display: block;line-height: normal;"><strong>'.number_format($value['price'],0,0,'.').'đ</strong></span>
                    <span style="font-size:14px;color: #999;font-size: 12px;line-height: normal;text-decoration: line-through;">'.number_format($value['price_market'],0,0,'.').'đ</span>';
                }

                $htmlOption = '';
                if($value['root_id'] == 16) {
                    $htmlOption .= !empty($value['comboList']) ? '<div style="font-weight:600;font-size: 13px;">Lựa chọn:</div>':'';
                    foreach ($value['comboList'] as $k => $combo) {
                        $htmlOption .= '<div style="font-weight: bold; font-size: 13px;">'.($k + 1).'. '.$combo['parentName'].'</div>
                            <div style="style="margin-left:16px;font-style:italic;color:#666;font-size:13px;font-weight:bold"">'.$combo['name'].'</div>';
                    }
                } else {
                    $htmlOption .= ($value['package'] ? '<div style="font-weight: 600;font-size: 13px;">Lựa chọn: <span style="font-style: italic; color: #666;">'.$value['package'].'</span></div>':'');
                }

                $orderInfo .= '<tr'.($j < (count($data['cart']) - 1) ? ' style="border-bottom: 1px solid #666;"':'').'>
                    <td style="width: 11%;border-right: 1px solid #666;text-align: center;padding-top: 0;padding-bottom: 0;">
                        <span style="line-height: 0;display: block;padding: 3px 0;"><img alt="'.$value['name'].'" src="'.URL.UPLOAD_IMAGES.date('Y/m',explode('-',$value['thumbnail'])[0]).'/'.$value['thumbnail'].'" style="width: 70px;" /></span>
                    </td>
                    <td style="width: 43%;text-align: left;border-right: 1px solid #666;">
                        <span style="font-size:14px;"><strong>'.$value['name'].'</strong>'.$htmlOption.'</span>
                    </td>
                    <td style="width: 16%;border-right: 1px solid #666;text-align: center;padding-top: 0;padding-bottom: 0;">
                        '.$price.'
                    </td>
                    <td style="width: 10.8%;text-align: center;border-right: 1px solid #666;padding-top: 0;padding-bottom: 0;">
                        <span style="font-size:14px"><strong>'.$value['quantity'].'</strong></span>
                    </td>
                    <td style="width: 18%;text-align: right;padding-top: 0;padding-bottom: 0;">
                        <span style="font-size:14px"><strong>'.number_format($value['price'] * $value['quantity'],0,0,'.').'đ</strong></span>
                    </td>
                </tr>';

                $j++;
            }

            if($orderPrice['extraDiscount'] > 0) {
                $extraDiscount = '<tbody>
                    <tr>
                        <td colspan="4" style="width: 78.74%; text-align: right;"><span style="font-size:14px"><strong>Được giảm thêm:</strong></span></td>
                        <td style="width: 21.26%; text-align: right;"><strong><span style="font-size:14px;color: #f60;">- '.number_format($orderPrice['extraDiscount'],0,0,'.').'đ</span></strong></td>
                    </tr>
                </tbody>';
            }

            if($orderPrice['reducedCash'] > 0) {
                $discountValue = '<tbody>
                    <tr>
                        <td colspan="4" style="width: 78.74%; text-align: right;"><span style="font-size:14px"><strong>Áp dụng mã giảm giá:</strong></span></td>
                        <td style="width: 21.26%; text-align: right;"><strong><span style="font-size:14px;color: #f60;">- '.number_format($orderPrice['reducedCash'],0,0,'.').'đ</span></strong></td>
                    </tr>
                </tbody>';
            }

            $orderInfo .= '</tbody>
                <tbody>
                    <tr>
                        <td colspan="4" style="width: 78.74%; text-align: right;"><span style="font-size:14px"><strong>Tạm tính:</strong></span></td>
                        <td style="width: 21.26%; text-align: right;"><strong><span style="font-size:14px">'.number_format($orderPrice['totalPrice'],0,0,'.').'đ</span></strong></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colspan="4" style="width: 78.74%; text-align: right;"><span style="font-size:14px"><strong>Phí giao hàng:</strong></span></td>
                        <td style="width: 21.26%; text-align: right;"><strong><span style="font-size:14px">'.number_format($orderPrice['shippingTotal'],0,0,'.').'đ</span></strong></td>
                    </tr>
                </tbody>
                '.$extraDiscount.$discountValue.'
                <tbody>
                    <tr>
                        <td colspan="4" style="width: 78.74%; text-align: right;"><span style="font-size:14px"><strong>Tổng cộng:</strong></span></td>
                        <td style="width: 21.26%; text-align: right;"><strong><span style="font-size:14px">'.number_format($orderPrice['totalRemain'],0,0,'.').'đ</span></strong></td>
                    </tr>
                </tbody>
            </table>';

            if($orderPrice['discountCode']) {
                $orderInfo .= '<p><strong>(*) Mã giảm giá áp dụng: </strong> <span style="font-weight: 600; color: #f60;">'.$orderPrice['discountCode'].'</span></p>';
            }

            if($orderPost['post']['paymentType']) {
                $orderInfo .= '<p><strong>(*) Phương thức thanh toán: </strong> '.$orderPost['post']['paymentType'].'</p>';
                if($orderPost['post']['paymentCode'] != 'cod') {
                    $orderInfo .= '<p><strong>(*) Trạng thái giao dịch: </strong> <span>Đang chờ khách hàng thanh toán</span></p>';
                }
            }

            if($orderPost['post']['shippingType']) {
                $orderInfo .= '<p><strong>(*) Hình thức giao hàng: </strong> '.$orderPost['post']['shippingType'].'</p>';
            }

            // tạo mẫu mail xác nhận gửi đến khác hàng
            $EmailTemplateTb = new \Backend\Model\EmailTemplateTb();
            $templateConfirm = $EmailTemplateTb->getItem(array('id' => 10, 'sendmail' => true, 'display' => 1));
            if($templateConfirm) {
                $templateConfirm['value'] = array(
                    strtoupper(DOMAIN), // domain
                    $orderInfo, // thông tin đơn hàng
                    $data['member']['fullname'], // họ tên khách hàng
                    $data['member']['phone'], // điện thoại khách hàng
                    $data['member']['email'], // email khách hàng
                    $orderPost['post']['comment'] ? $orderPost['post']['comment'] : 'Không có', // ghi chú
                    $data['info']['multi_input']['hotline-ho-tro'], // hotline hỗ trợ
                    mb_strtoupper($data['info']['name']), // tên công ty
                    $data['info']['address'], //email công ty
                    $data['info']['multi_input']['hotline-ho-tro'], // hotline hỗ trợ
                    $data['info']['multi_input']['email'], //email liên hệ
                    PROTOCOL.DOMAIN, //website
                );
            }

            // tạo mẫu mail thông báo gửi đến admin
            $template = $EmailTemplateTb->getItem(array('id' => 11, 'sendmail' => true, 'display' => 1));
            if($template) {
                $template['value'] = array(
                    strtoupper(DOMAIN), // domain
                    $orderInfo, // thông tin đơn hàng
                    $data['member']['fullname'], // họ tên khách hàng
                    $data['member']['phone'], // điện thoại khách hàng
                    $data['member']['email'], // email khách hàng
                    $orderPost['post']['comment'] ? $orderPost['post']['comment'] : 'Không có', // ghi chú
                    URL.'admin' // link trang quản trị
                );
            }

            // lưu lại mẫu mail vào order để gửi lại khi thực hiện xác thực thanh toán
            if($orderItem['id']) {
                $OrderTb->saveData(array(
                    'id' => $orderItem['id'],
                    'post' => array(
                        'templateMail' => array(
                            'templateConfirm' => $templateConfirm,
                            'templateAdmin' => $template
                        )
                    )
                ));
            }

            // lưu lại log Order
            $logOrder = array(
                'type' => 'COD',
                'action' => 'createOrder',
                'postInitial' => $this->getRequest()->getPost()->toArray(),
                'paramsPostSaveOrder' => $orderPost['post'],
                'sessionCart' => $session->cart,
                'orderPrice' => $orderPrice,
                'templateMail' => json_encode(array('templateConfirm' => $templateConfirm, 'templateAdmin' => $template), JSON_UNESCAPED_UNICODE),
                'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR']
            );

            //tạo link thanh toán VNPAY
            if($orderPost['post']['paymentCode'] == 'vnpay') {
                //thông số vnpay
                $SectionTb = new SectionTb();
                $vnPay = $SectionTb->getItem(array('id' => 9, 'columns' => array('name','multi_input')));

                $vnp_HashSecret = $vnPay['multi_input']['vnp-hashsecret']; //đoạn mã của khách hàng
                $vnp_Url = $vnPay['multi_input']['vnp-url']; //link thanh toán

                $inputData = array(
                    "vnp_Version" => "2.1.0",
                    "vnp_TmnCode" => $vnPay['multi_input']['vnp-tmncode'], // mã webstie
                    "vnp_Amount" => $orderPrice['totalRemain'] * 100,
                    "vnp_Command" => "pay",
                    "vnp_CreateDate" => date('YmdHis'),
                    "vnp_CurrCode" => "VND",
                    "vnp_IpAddr" => $_SERVER['REMOTE_ADDR'],
                    "vnp_Locale" => "vn",
                    "vnp_OrderType" => $vnPay['multi_input']['type'], // loại hàng hóa
                    "vnp_OrderInfo" => "Thanh toan cho don hang #" . $orderCode, // nội dung thanh toán
                    "vnp_ReturnUrl" => URL.'checkout-66.html', // url trả về
                    "vnp_TxnRef" => $orderCode, // ID đơn hàng
                );

                ksort($inputData);
                $query = $hashdata = "";
                $i = 0;
                foreach ($inputData as $key => $value) {
                    if ($i == 1) {
                        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                    } else {
                        $hashdata .= urlencode($key) . "=" . urlencode($value);
                        $i = 1;
                    }
                    $query .= urlencode($key) . "=" . urlencode($value) . '&';
                }

                $vnp_Url = $vnp_Url . "?" . $query;
                if (isset($vnp_HashSecret)) {
                    $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret);//
                    $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
                }

                if ($url == $translator->translate('dat-hang-62.html')) {
                    // lưu lại log Order
                    $logOrder['type'] = 'VNPAY';
                    $logOrder['inputData'] = $inputData;
                    $WriteLog->Write($logOrder);

                    echo json_encode(array('redirect' => $vnp_Url)); //gửi URL qua ht-validate để chuyển hướng
                    return $this->getResponse();
                }
            }

            $WriteLog->Write($logOrder);

            // Gửi mail thông báo xác nhận đặt hàng
            if($data['member']['email'] && $templateConfirm && false) {
                $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                    'emailTo' => $data['member']['email'],
                    'subject' => str_replace($templateConfirm['key'], $templateConfirm['value'], $templateConfirm['subject']),
                    'body' => str_replace($templateConfirm['key'], $templateConfirm['value'], $templateConfirm['body'])
                ));
            }

            // Gửi mail thông báo đặt hàng cho admin
            if ($data['info']['email'] && $template && false) {
                $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                    'emailTo' => $data['info']['email'],
                    'subject' => str_replace($template['key'], $template['value'], $template['subject']),
                    'body' => str_replace($template['key'], $template['value'], $template['body'])
                ));
            }

            // Xóa session và xuất thông báo

            if ($url == $translator->translate('dat-hang-62.html')) {
                $session->offsetSet('cart', '');
                echo json_encode(array('redirect' => URL_LANG.'checkout-66.html'));
            }
            return $this->getResponse();
        } else {
            // lấy danh sách giảm giá
            $totalInfo = $this->calcPriceSuggestion();
            $data['totalPrice'] = $totalInfo['totalPrice'];
            $data['totalRemain'] = $totalInfo['totalRemain'];
            $data['extraDiscount'] = $totalInfo['extraDiscount'];
        }

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array(
            $MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('title','link'))),
            array(
                'name' => $translator->translate("Đặt hàng"),
                'title' => $translator->translate("Nhập thông tin đặt hàng"),
                'multi_image' => $MenuPublicTb->getItem(array('id' => 23, 'columns' => array('multi_image')))['multi_image']
            )
        );

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Nhập thông tin đặt hàng"),
            'keyword' => $translator->translate("đặt hàng, mua hàng"),
            'description' => $translator->translate("Vui lòng nhập thông tin đặt mua hàng của bạn vào form đặt hàng của chúng tôi"),
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = array('vi' => 'dat-hang', 'en' => 'en/purchase'); // Nếu có ngôn ngữ LANG

        return new ViewModel($data);
    }

    public function listAction() // 63.html
    {
        $translator = $this->getServiceLocator()->get('translator');
        $params = $this->params()->fromRoute();
        $data = array('action' => 'order-list');
        $session = new Container('frontend');
        if (!$session->logged) { return $this->redirect()->toUrl(URL_LANG); }

        $OrderTb = new OrderTb();
        $data['list'] = $OrderTb->listItem(array(
            'member_id' => $session->logged['id'],
            'orderby' => array('status ASC')
        ));

        $data['status'] = array(0 => 'Đang xử lý', 1 => 'Đã xử lý', '-1' => 'Đã hủy');

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array(
            $MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('title','link'))),
            array('title' => $translator->translate("Danh sách đơn hàng"))
        );

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Danh sách đơn hàng"),
            'keyword' => '',
            'description' => '',
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = array('vi' => 'danh-sach-don-hang', 'en' => 'en/order-list'); // Nếu có ngôn ngữ LANG

        return new ViewModel($data);
    }

    public function detailAction() // 64.html
    {
        $session = new Container('frontend');
        if (!$session->logged) {
            return $this->redirect()->toUrl(URL_LANG);
        }
        $translator = $this->getServiceLocator()->get('translator');
        $params = $this->params()->fromRoute();
        $data = array();
        $data['action'] = 'order-detail';
        $OrderDetailTb = new OrderDetailTb();
        $data['detail'] = $OrderDetailTb->detailOrder(array('orders_id' => $params['slug']));
        $data['listProduct'] = $OrderDetailTb->listItem(array('orders_id' => $params['slug']));
        $data['config'] = $OrderDetailTb->config();
        $data['recipient'] = json_decode($data['detail']['recipient_data'], true);
        $data['detail']['discountInfo'] = json_decode($data['detail']['discountInfo'], true);

        $data['status'] = array(0 => 'Đang xử lý', 1 => 'Đã xử lý', '-1' => 'Đã hủy');

        if(!$data['detail']) {
            return $this->redirect()->toUrl(URL_LANG);
        }

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['menu'] = array(
            $MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('title','link'))),
            array('title' => $translator->translate("Đơn hàng").' '.$params['id'])
        );

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Đơn hàng").' '.$params['id'],
            'keyword' => '',
            'description' => '',
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));

        $data['params'] = $this->params()->fromRoute();
        // $data['params']['slugLang'] = array('vi' => 'chi-tiet-don-hang', 'en' => 'en/order-details'); // Nếu có ngôn ngữ LANG

        return new ViewModel($data);
    }

    public function paymentAction() // 66.html
    {
        $translator = $this->getServiceLocator()->get('translator');
        $params = $this->params()->fromRoute();
        $data = array('action' => 'payment-booking');

        $session = new Container('frontend');

        $InfoTb = new InfoTb();
        $data['info'] = $InfoTb->getItem();

        $MemberTb = new MemberTb();
        $OrderTb = new OrderTb();
        $OrderDetailTb = new OrderDetailTb();

        $HtmlTb = new HtmlTb();
        $data['thankyou'] = $HtmlTb->getItem(array('id' => 8, 'columns' => array('detail')));

        $orderCode = $session->cartInfo['orderCode'];

        if($orderCode) {
            $data['order'] = $OrderTb->getItem(array('orderCode' => $orderCode));
            $data['order']['listProduct'] = $OrderDetailTb->listItem(array('orders_id' => $data['order']['id']));
            $data['order']['recipient_data'] = json_decode($data['order']['recipient_data'], true);
            $data['order']['discountInfo'] = json_decode($data['order']['discountInfo'], true);
            $data['order']['member'] = $MemberTb->getItem(array('id' => $data['order']['member_id']));
        } else {
            return $this->redirect()->toUrl(URL_LANG);
        }

        if ($this->getRequest()->isGet() && $data['order']['paymentCode'] == 'vnpay') {
            //thông số vnpay
            $SectionTb = new SectionTb();
            $vnPay = $SectionTb->getItem(array('id' => 9, 'columns' => array('name','multi_input')));

            $vnp_HashSecret = $vnPay['multi_input']['vnp-hashsecret']; //đoạn mã của khách hàng
            $vnp_Url = $vnPay['multi_input']['vnp-url']; //link thanh toán

            $vnp_SecureHash = $_GET['vnp_SecureHash'];
            $inputData = array();
            foreach ($_GET as $key => $value) {
                if (substr($key, 0, 4) == "vnp_") {
                    $inputData[$key] = $value;
                }
            }
            unset($inputData['vnp_SecureHash']);
            ksort($inputData);
            $i = 0;
            $hashData = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
            }

            $vnp_Amount = $inputData['vnp_Amount']; // Số tiền thanh toán
            $vnp_Amount = (int)$vnp_Amount / 100;
            $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
            $orderCode = $inputData['vnp_TxnRef'];

            $order = $OrderTb->getItem(array('orderCode' => $orderCode));

            if ($order != NULL) {
                if ($order['orderCode'] == $orderCode) {
                    if($order['total_price'] != null && $order['total_price'] == $vnp_Amount){
                        if ($secureHash == $vnp_SecureHash) {
                            $data['ResponseCode'] = $_GET['vnp_ResponseCode'] ? $_GET['vnp_ResponseCode'] : $_GET['vnp_TransactionStatus'];
                            if($data['ResponseCode'] == '00') {
                                $session->offsetSet('cart', '');
                            }
                        } else {
                            $data['ResponseCode'] = "97";
                        }
                    } else {
                        $data['ResponseCode'] = "14";
                    }
                } else {
                    $data['ResponseCode'] = "99";
                }
            } else {
                $data['ResponseCode'] = "99";
            }

            $data['result'] = $vnPay['multi_input']['code-'.$data['ResponseCode']];
        } else {
            $data['result'] = 'Cảm ơn bạn đã đặt hàng!!!';
            $data['ResponseCode'] = '00';
        }

        // SEO || SNIPPET
        $MenuPublicTb = new MenuPublicTb();
        $data['continue'] = $MenuPublicTb->getItem(array('id' => 4, 'columns' => array('link')));
        $data['menu'] = array(
            $MenuPublicTb->getItem(array('active' => 'home', 'columns' => array('title','link'))),
            array('title' => $translator->translate("Thanh toán"))
        );

        $this->getEvent()->getRouteMatch()->setParam('seo', array(
            'title' => $translator->translate("Thanh toán"),
            'keyword' => $translator->translate("thanh toán, mua hàng"),
            'description' => $translator->translate("Thanh toán, mua hàng"),
            'url' => PROTOCOL.DOMAIN.$_SERVER['REQUEST_URI'],
            'site_name' => $data['info']['name'],
            'snippet' => $data['menu'],
            'noindex' => true
        ));

        $data['params'] = $this->params()->fromRoute();
        $data['params']['slugLang'] = array('en' => 'checkout', 'vi' => 'vi/checkout');

        return new ViewModel($data);
    }

    public function calcPriceSuggestion() {
        // lấy danh sách giảm giá
        $ProductTb = new ProductTb();
        $discountListSuggestion = $ProductTb->getList(array('cat_id' => 17, 'columns' => array('id','multi_input')));
        foreach ($discountListSuggestion as $i => $value) {
            $discountListSuggestion[$i]['min'] = str_replace(',','', $value['multi_input']['don-toi-thieu']);
            $discountListSuggestion[$i]['discount'] = str_replace(',','', $value['multi_input']['duoc-giam']);
        }

        $SortByColumn = new SortByColumn();
        $discountListSuggestion = $SortByColumn($discountListSuggestion, 'min', 'SORT_ASC');

        $session = new Container('frontend');
        $cart = $session->cart;

        // tính tổng giá trị đơn hiện tại
        $totalPrice = $totalRemain = 0;
        foreach ($cart as $value) {
            $totalPrice += ($value['price'] * $value['quantity']);
        }

        // tính toán giá trị được giảm khi đạt giá trị đơn hàng
        $extraDiscount = 0;
        foreach ($discountListSuggestion as $i => $value) {
            if($totalPrice >= $value['min']) {
                $extraDiscount = $value['discount'];
                if($discountListSuggestion[$i + 1] && $totalPrice < $discountListSuggestion[$i + 1]['min']) {
                    break;
                }
            }
        }

        $totalRemain = $totalPrice - $extraDiscount;
        $arrayValue = array('totalPrice' => $totalPrice, 'extraDiscount' => $extraDiscount, 'totalRemain' => $totalRemain);

        return $arrayValue;
    }

    public function calcPrice($params) {
        $ProductCatTb = new ProductCatTb();
        $ProductTb = new ProductTb();

        // lấy giá trị đơn hiện tại và giá trị đã áp dụng gợi ý giảm giá
        $infoPrice = $this->calcPriceSuggestion();

        $shippingTotal = $shippingFeeDistrict = $shippingFeeType = $reducedCash = 0;

        if($params['district']) {
            $district = $ProductTb->getItem(array('id' => $params['district'], 'columns' => array('id','name','price_market')));
            $shippingFeeDistrict = $district['price'];
        }

        if($params['shippingType']) {
            $shippingType = $ProductTb->getItem(array('id' => $params['shippingType'], 'columns' => array('id','name','price_market')));
            $shippingFeeType = $shippingType['price'];
        }

        if($params['discountId'] || $params['sku']) {
            $ProductDiscountTb = new ProductDiscountTb();
            if($params['sku']) {
                $item = $ProductDiscountTb->getItem(array('sku' => $params['sku']));
            } else {
                $item = $ProductDiscountTb->getItem(array('id' => $params['discountId']));
            }
            if (empty($item)) {
                $error = 'Mã giảm giá không tồn tại';
            } elseif (($item['expired_date'] && strtotime($item['expired_date']) < time()) || ($item['expired_number'] && ($item['expired_number'] <= $item['remain']))) {
                $error = 'Mã giảm giá đã hết hiệu lực';
            } elseif ($item['status'] == 2) {
                $error = 'Mã giảm giá đang tạm ngưng áp dụng';
            } else {
                $item['allowed_value'] = explode(',', str_replace(':','',$item['allowed_value']));
                $productAllowedIds = ($item['allowed_type'] == 1) ? $item['allowed_value'] : array();
                $allType = array(2 => 'root_id', 3 => 'brand_id', 4 => 'list_label_id');

                if ($item['allowed_type'] > 1) {
                    foreach ($item['allowed_value'] as $id) {
                        $productAllowedIds = array_merge($productAllowedIds, array_column($ProductTb->getList(array($allType[$item['allowed_type']] => $id)), 'id'));
                    }
                }

                $productCartIds = array_column($session->cart,'id');
                $productAllowedIds = array_intersect($productCartIds, $productAllowedIds);

                if (count($productAllowedIds) > 0 || $item['allowed_type'] == 0) {
                    $data['discount_id'] = $item['id'];
                    $reducedCash = 0;
                    $total = ($infoPrice['totalPrice'] ? $infoPrice['totalPrice'] : 0);

                    if ($total < $item['order_value']) {
                        $error = 'Mã giảm giá không áp dụng cho đơn hàng nhỏ hơn '.number_format($item['order_value'],0,0,'.').'đ';
                    } else {
                        if ($item['allowed_type'] == 0) {
                            $reducedCash = (($item['discount_type'] == 1) ? (($total*$item['discount_value'])/100) : $item['discount_value']);
                            $discountCode = $params['sku'];
                        }
                    }
                } else{
                    $error = 'Mã giảm giá không áp dụng cho các sản phẩm trong đơn hàng này.';
                }
            }
        }

        $shippingTotal = $shippingFeeDistrict + $shippingFeeType;
        $totalRemain = ($infoPrice['totalRemain'] ? $infoPrice['totalRemain'] : 0) + $shippingTotal - $reducedCash;
        $totalRemain = $totalRemain < 0 ? 0 : $totalRemain;
        $arrayValue = array('totalPrice' => $infoPrice['totalPrice'], 'shippingTotal' => $shippingTotal,'extraDiscount' => $infoPrice['extraDiscount'], 'reducedCash' => $reducedCash, 'totalRemain' => $totalRemain, 'discountCode' => $discountCode);

        // lưu lại session
        $session = new Container('frontend');
        $session->orderPrice = $arrayValue;

        return $arrayValue;
    }

    public function discountAction() // 65.html
    {
        $session = new Container('frontend');
        $ProductTb = new ProductTb();
        $ProductDiscountTb = new ProductDiscountTb();
        $post = $this->getRequest()->getPost()->toArray();

        // tính toán lại trước khi áp dụng mã giảm giá
        $calcPrice = $this->calcPrice($post);

        $data = array();
        $item = $ProductDiscountTb->getItem(array('sku' => $post['sku']));
        if (empty($item)) {
            $data['error'] = 'Mã giảm giá không tồn tại';
        } elseif (($item['expired_date'] && strtotime($item['expired_date']) < time()) || ($item['expired_number'] && ($item['expired_number'] <= $item['remain']))) {
            $data['error'] = 'Mã giảm giá đã hết hiệu lực';
        } elseif ($item['status'] == 2) {
            $data['error'] = 'Mã giảm giá đang tạm ngưng áp dụng';
        } else {
            $item['allowed_value'] = explode(',', str_replace(':','',$item['allowed_value']));
            $productAllowedIds = ($item['allowed_type'] == 1) ? $item['allowed_value'] : array();
            $allType = array(2 => 'root_id', 3 => 'brand_id', 4 => 'list_label_id');

            if ($item['allowed_type'] > 1) {
                foreach ($item['allowed_value'] as $id) {
                    $productAllowedIds = array_merge($productAllowedIds, array_column($ProductTb->getList(array($allType[$item['allowed_type']] => $id)), 'id'));
                }
            }

            $productCartIds = array_column($session->cart,'id');
            $productAllowedIds = array_intersect($productCartIds, $productAllowedIds);

            if (count($productAllowedIds) > 0 || $item['allowed_type'] == 0) {
                $data['discount_id'] = $item['id'];
                $data['reducedCash'] = 0;
                $total = $calcPrice['totalPrice'];
                // foreach ($session->cart as $product) {
                //     $total = $total + ($product['price']*$product['quantity']);
                //     if (array_search($product['id'], $productAllowedIds) !== false) {
                //         $data['reducedCash'] = ($data['reducedCash'] + (($item['discount_type'] == 1) ? (($product['price']*$item['discount_value'])/100) : $item['discount_value'])) * $product['quantity'];
                //         $data['list'][] = $product['name'];
                //     }
                // }

                if ($total < $item['order_value']) {
                    $data['error'] = 'Mã giảm giá không áp dụng cho đơn hàng nhỏ hơn '.number_format($item['order_value'],0,0,'.').'đ';
                } else {
                    $data['message'] = 'Mã '.$post['sku'].' được giảm '.(($item['discount_type'] == 1) ? $item['discount_value'].'%' : number_format($item['discount_value'],0,0,'.').'đ');
                    if ($item['allowed_type'] == 0) {
                        $data['reducedCash'] = (($item['discount_type'] == 1) ? (($total*$item['discount_value'])/100) : $item['discount_value']);

                        $data['message'] .= ' trên tổng đơn hàng.';
                    } else {
                        $data['message'] .= ' áp dụng cho sản phẩm:';
                    }
                }

            } else{
                $data['error'] = 'Mã giảm giá không áp dụng cho các sản phẩm trong đơn hàng này.';
            }
        }

        $data['totalRemain'] = $calcPrice['totalRemain'];
        echo json_encode($data, JSON_UNESCAPED_UNICODE);

        return $this->getResponse();
    }
}
?>