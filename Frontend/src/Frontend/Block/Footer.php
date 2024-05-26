<?php

namespace Frontend\Block;

use Frontend\Model\MenuPublicTb;
use Frontend\Model\NewsCatTb;
use Frontend\Model\SectionTb;
use Zend\Session\Container;
use Zend\View\Helper\AbstractHelper;

class Footer extends AbstractHelper
{
	public function __invoke($params)
    {
    	//Begin code

        $MenuPublicTb = new MenuPublicTb();
        $SectionTb = new SectionTb();
        $NewsCatTb = new NewsCatTb();
        $session = new Container('frontend');

		$data = array(
            'active' => $params->active,
            'info' => $params->info,
            'menu' => $MenuPublicTb->listItem(array('parent' => 0, 'columns' => array('id','name','parent','link','active'))),
            'camKet' => $SectionTb->getItem(array('id' => 8, 'columns' => array('name','multi_image'), 'special' => 'hien-thi')),
            'chinhSach' => $NewsCatTb->listItem(array('parent' => 1, 'columns' => array('id','name'), 'getList' => array('columns' => array('id','name','slug')))),
            'popup' => $SectionTb->getItem(array('id' => 3, 'columns' => array('name','detail','multi_input','multi_image'), 'special' => 'hien-thi')),
            'logged' => $session->logged
        );

        // tạo link đăng nhập google
        $arrs = array(
            'post' => array(
                'client_id' => $data['info']['multi_input']['id-gg'],
                'secret' => $data['info']['multi_input']['secret-gg']
            )
        );

        $URL = $URL = URL.'google.php?event=getlink';
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

	    //End code

		$data = $this->view->partial('block/footer.phtml',$data);
		echo $data;
	}
}