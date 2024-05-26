<?php
namespace Frontend\Controller;

use Frontend\Model\ContactTb;
use Frontend\Model\InfoTb;
use Frontend\Model\MemberTb;
use Frontend\Model\OrderDetailTb;
use Frontend\Model\OrderTb;
use Frontend\Model\SectionTb;
use Frontend\View\Helper\WriteLog;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class VnpayController extends AbstractRestfulController
{
    public function get($id)
    {
        $response = $this->getResponseWithHeader()
                         ->setContent( __METHOD__.' get current data with id =  '.$id);
        return $response;
    }

    public function getList()
    {
        if (!$this->isAllowed($_SERVER['REMOTE_ADDR'])) {
            header('Location: ' . URL);
        } else {
            if($_REQUEST) {
                $OrderTb = new OrderTb();
                $InfoTb = new InfoTb();
                $MemberTb = new MemberTb();
                $WriteLog = new WriteLog();
                $SectionTb = new SectionTb();

                $vnPay = $SectionTb->getItem(array('id' => 9, 'columns' => array('name','multi_input')));
                $vnp_HashSecret = $vnPay['multi_input']['vnp-hashsecret']; //đoạn mã của khách hàng

                $inputData = array();
                $returnData = array();
                $data = $_REQUEST;
                foreach ($data as $key => $value) {
                    if (substr($key, 0, 4) == "vnp_") {
                        $inputData[$key] = $value;
                    }
                }

                $vnp_SecureHash = $inputData['vnp_SecureHash'];
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

                $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

                $vnpTranId = $inputData['vnp_TransactionNo']; //Mã giao dịch tại VNPAY
                $vnp_BankCode = $inputData['vnp_BankCode']; //Ngân hàng thanh toán
                $vnp_Amount = $inputData['vnp_Amount']; // Số tiền thanh toán
                $vnp_Amount = (int)$vnp_Amount / 100;
                $orderCode = $inputData['vnp_TxnRef'];

                $Status = 0;
                $time = date('H:i d/m/Y', time());

                try {
                    //Check Orderid
                    //Kiểm tra checksum của dữ liệu
                    if ($secureHash == $vnp_SecureHash) {
                        $order = $OrderTb->getItem(array('orderCode' => $orderCode));
                        $data['info'] = $InfoTb->getItem();
                        if ($order != NULL) {
                            if($order['total_price'] != null && $order['total_price'] == $vnp_Amount){
                                if ($order['checkPayment'] != NULL && $order['checkPayment'] == 0) {
                                    if ($inputData['vnp_ResponseCode'] == '00') {
                                        $Status = 1; // Trạng thái thanh toán thành công
                                        $statusText = 'Giao dịch thanh toán thành công. Thời gian: '.$time;
                                        $OrderTb->saveData(array(
                                            'id' => $order['id'],
                                            'post' => array(
                                                'paymentStatus' => $statusText,
                                                'checkPayment' => 1
                                            )
                                        ));

                                        // gửi lại mail thông báo khi đã hoàn tất thanh toán
                                        if($order['templateMail']) {
                                            // Gửi mail thông báo xác nhận đặt hàng
                                            $member = $MemberTb->getItem(array('id' => $order['member_id']));
                                            $templateConfirm = json_decode($order['templateMail'], true)['templateConfirm'];
                                            if($member['email'] && $templateConfirm) {
                                                $templateConfirm['value'][1] = str_replace('<span>Đang chờ khách hàng thanh toán</span>', '<span>Giao dịch thành công. Thời gian: '.$time.'</span>', $templateConfirm['value'][1]);
                                                $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                                                    'emailTo' => $member['email'],
                                                    'subject' => str_replace($templateConfirm['key'], $templateConfirm['value'], $templateConfirm['subject']),
                                                    'body' => str_replace($templateConfirm['key'], $templateConfirm['value'], $templateConfirm['body'])
                                                ));
                                            }

                                            // Gửi mail thông báo đặt hàng cho admin
                                            $templateAdmin = json_decode($order['templateMail'], true)['templateAdmin'];
                                            if ($data['info']['email'] && $templateAdmin) {
                                                $templateAdmin['value'][1] = str_replace('<span>Đang chờ khách hàng thanh toán</span>', '<span>Giao dịch thành công. Thời gian: '.$time.'</span>', $templateAdmin['value'][1]);
                                                $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                                                    'emailTo' => $data['info']['email'],
                                                    'subject' => str_replace($templateAdmin['key'], $templateAdmin['value'], $templateAdmin['subject']),
                                                    'body' => str_replace($templateAdmin['key'], $templateAdmin['value'], $templateAdmin['body'])
                                                ));
                                            }
                                        }
                                    } else {
                                        $Status = 2; // Trạng thái thanh toán lỗi
                                        $statusText = 'Giao dịch thất bại. Thời gian: '.$time;
                                        $OrderTb->saveData(array(
                                            'id' => $order['id'],
                                            'post' => array(
                                                'paymentStatus' => $statusText,
                                                'checkPayment' => 1
                                            )
                                        ));

                                        // gửi lại mail thông báo khi giao dịch thất bại
                                        if($order['templateMail']) {
                                            // Gửi mail thông báo xác nhận đặt hàng
                                            $member = $MemberTb->getItem(array('id' => $order['member_id']));
                                            $templateConfirm = json_decode($order['templateMail'], true)['templateConfirm'];
                                            if($member['email'] && $templateConfirm) {
                                                $templateConfirm['value'][1] = str_replace('<span>Đang chờ khách hàng thanh toán</span>', '<span>'.$statusText.'</span>', $templateConfirm['value'][1]);
                                                $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                                                    'emailTo' => $member['email'],
                                                    'subject' => str_replace($templateConfirm['key'], $templateConfirm['value'], $templateConfirm['subject']),
                                                    'body' => str_replace($templateConfirm['key'], $templateConfirm['value'], $templateConfirm['body'])
                                                ));
                                            }

                                            // Gửi mail thông báo đặt hàng cho admin
                                            $templateAdmin = json_decode($order['templateMail'], true)['templateAdmin'];
                                            if ($data['info']['email'] && $templateAdmin) {
                                                $templateAdmin['value'][1] = str_replace('<span>Đang chờ khách hàng thanh toán</span>', '<span>'.$statusText.'</span>', $templateAdmin['value'][1]);
                                                $SendMail = new \Backend\View\Helper\Api\SendMail(array(
                                                    'emailTo' => $data['info']['email'],
                                                    'subject' => str_replace($templateAdmin['key'], $templateAdmin['value'], $templateAdmin['subject']),
                                                    'body' => str_replace($templateAdmin['key'], $templateAdmin['value'], $templateAdmin['body'])
                                                ));
                                            }
                                        }
                                    }

                                    //Trả kết quả về cho VNPAY: Website TMĐT ghi nhận yêu cầu thành công
                                    $returnData['RspCode'] = '00';
                                    $returnData['Message'] = 'Confirm Success';
                                } else {
                                    if($inputData['vnp_ResponseCode'] != '00' && $order['checkPayment'] == 1) {
                                        $returnData['RspCode'] = '00';
                                        $returnData['Message'] = 'Confirm Success';
                                    } else {
                                        $returnData['RspCode'] = '02';
                                        $returnData['Message'] = 'Order already confirmed';
                                    }
                                }
                            } else {
                                    $returnData['RspCode'] = '04';
                                    $returnData['Message'] = 'Invalid Amount';
                                }
                        } else {
                            $returnData['RspCode'] = '01';
                            $returnData['Message'] = 'Order not found';
                        }
                    } else {
                        $returnData['RspCode'] = '97';
                        $returnData['Message'] = 'Invalid signature';
                    }
                } catch (Exception $e) {
                    $returnData['RspCode'] = '99';
                    $returnData['Message'] = 'Unknow error';
                }

                // lưu lại log Order
                $logVNPAY = array(
                    'type' => 'VNPAY',
                    'action' => 'updateOrder',
                    'inputData' => $inputData,
                    '_REQUEST' => $_REQUEST,
                    'templateMail' => array('templateConfirm' => $templateConfirm, 'templateAdmin' => $templateAdmin),
                    'returnData' => $returnData,
                    'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR'],
                    'QUERY_STRING' => $_SERVER['QUERY_STRING']
                );
                $WriteLog->Write($logVNPAY);

                //Trả lại VNPAY theo định dạng JSON
                echo json_encode($returnData);
            } else {
            	$response = $this->getResponseWithHeader()
            	->setContent(json_encode(array('error' => 'Invalid data')));
            }
        }

        return $this->getResponse();
    }

    public function create($data)
    {
        $response = $this->getResponseWithHeader()
                         ->setContent( __METHOD__.' create new item of data :
                                                    <b>'.$data['name'].'</b>');
        return $response;
    }

    public function update($id, $data)
    {
       $response = $this->getResponseWithHeader()
                        ->setContent(__METHOD__.' update current data with id =  '.$id.
                                            ' with data of name is '.$data['name']) ;
       return $response;
    }

    public function delete($id)
    {
        $response = $this->getResponseWithHeader()
                        ->setContent(__METHOD__.' delete current data with id =  '.$id) ;
        return $response;
    }

    // configure response
    public function getResponseWithHeader()
    {
        $response = $this->getResponse();
        $response->getHeaders()
                 //make can accessed by *
                 ->addHeaderLine('Access-Control-Allow-Origin','*')
                 //set allow methods
                 ->addHeaderLine('Access-Control-Allow-Methods','POST PUT DELETE GET');

        return $response;
    }

    public function isAllowed($ip){
        $whitelist = array('113.160.92.202', '113.52.45.78', '116.97.245.130','42.118.107.252','113.20.97.250','203.171.19.146','103.220.87.4');

        // If the ip is matched, return true
        if(in_array($ip, $whitelist)) {
            return true;
        }

        foreach($whitelist as $i){
            $wildcardPos = strpos($i, "*");

            // Check if the ip has a wildcard
            if($wildcardPos !== false && substr($ip, 0, $wildcardPos) . "*" == $i) {
                return true;
            }
        }

        return false;
    }
}

?>