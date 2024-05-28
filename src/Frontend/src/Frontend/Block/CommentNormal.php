<?php

namespace Frontend\Block;
use Frontend\Model\CommentTb;
use Frontend\Model\MemberTb;
use Frontend\View\Helper\SortNestedCate;
use Zend\View\Helper\AbstractHelper;
use Zend\Session\Container;

class CommentNormal extends AbstractHelper
{
	public function __invoke($params = null)
    {
	    $data = $params;

	    //Begin code

	    $session = new Container('frontend');
	    $SortNestedCate = new SortNestedCate();
	    $CommentTb = new CommentTb();
	    $MemberTb = new MemberTb();

	    if($session->logged['id']) {
            $data['logged'] = $MemberTb->getItem(array('id' => $session->logged['id']));
            if($data['logged']['id']) {
                $data['logged']['listLike'] = json_decode($data['logged']['like'], true);
                $data['logged']['listDislike'] = json_decode($data['logged']['dislike'], true);
            }
        }

        $data['comment']['article'] = array(
            'type' => $data['type'],
            'article_id' => $data['id'],
            'article_name' => $data['name'],
            'article_link' => $data['link'],
        );

        $data['comment']['list'] = $SortNestedCate($CommentTb->listItem(array('article_id' => $data['id'], 'type' => $data['type'])), array('parent' => 0, 'type' => 'nested'));

        $one = $two = $three = $four = $five = 0;
        foreach ($data['comment']['list'] as $i => $value) {
        	// tính tổng số lượng sao
        	switch ($value['star']) {
        		case 5: $five++; break;
        		case 4: $four++; break;
        		case 3: $three++; break;
        		case 2: $two++; break;
        		case 1: $one++; break;
        	}

        	// tính số lượt like, dislike của đánh giá
        	$listMember = $MemberTb->listItem(array('columns' => array('id','like','dislike'), 'status' => 1));
            $countLike = $countDislike = 0;
            foreach ($listMember as $member) {
                if(!empty($member['like'])) {
                    $like = json_decode($member['like'], true);
                    if(in_array($value['id'], $like)) {
                        $countLike++;
                    }
                } if(!empty($member['dislike'])) {
                    $dislike = json_decode($member['dislike'], true);
                    if(in_array($value['id'], $dislike)) {
                        $countDislike++;
                    }
                }
            }
            $data['comment']['list'][$i]['like'] = $countLike;
            $data['comment']['list'][$i]['dislike'] = $countDislike;
        }

        $totalStar = $one + $two + $three + $four + $five;
        $data['avgStar'] = ($one * 1 + $two * 2 + $three * 3 + $four * 4 + $five * 5) / $totalStar;

	    //End code

		$data = $this->view->partial('block/commentNormal.phtml',$data);
		echo $data;
	}
}

?>