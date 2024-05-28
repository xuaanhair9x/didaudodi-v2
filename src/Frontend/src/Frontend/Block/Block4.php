<?php

namespace Frontend\Block;
use Frontend\Model\CommentTb;
use Zend\View\Helper\AbstractHelper;

class Block4 extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    $CommentTb = new CommentTb();

	    foreach ($data['list'] as $i => $value) {
	        $commentList = $CommentTb->listItem(array('article_id' => $value['id'], 'type' => 'product_tb'));

	        $one = $two = $three = $four = $five = 0;
	        foreach ($commentList as $j => $value) {
	            if($value['parent'] == 0) {
	                // tính tổng số lượng sao
	                switch ($value['star']) {
	                    case 5: $five++; break;
	                    case 4: $four++; break;
	                    case 3: $three++; break;
	                    case 2: $two++; break;
	                    case 1: $one++; break;
	                }
	            } else {
	                unset($commentList[$j]);
	            }
	        }

	        $totalStar = $one + $two + $three + $four + $five;
	        $avgStar = ($one * 1 + $two * 2 + $three * 3 + $four * 4 + $five * 5) / $totalStar;
	        $data['list'][$i]['avgStar'] = $avgStar;
	        $data['list'][$i]['countComment'] = count($commentList);
	    }

	    //End code

		$data = $this->view->partial('block/block/block4.phtml',$data);
		echo $data;
	}
}

?>