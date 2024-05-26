<?php

namespace Frontend\View\Helper;
use Backend\View\Helper\System\Check;

class CheckForm
{
	protected $_messagesError = NULL;
	protected $_arrData = NULL;

	public function __construct($params = array(), $options = null)
	{
		$this->_arrData	= $params;
		$validator = new \Zend\Validator\ValidatorChain();
		$validator->addValidator(new \Zend\Validator\NotEmpty(), true);
		$athu = new Check();

		if (isset($params['checkform']['required'])) {
			foreach ($params['checkform']['required'] as $value) {
				if (!$athu->checkEmpty($params['post'][$value])) {
                    if ($value == 'robot') {
                        $this->_messagesError[$value] = 'Vui lòng check vào ô bên cạnh';
                    } else {
                        $this->_messagesError[$value] = 'Thông tin bắt buộc';
                    }
				}
			}
		}

		if (isset($params['checkform']['image'])) {
			foreach ($params['checkform']['image'] as $key => $value) {
				foreach ($_FILES[$value]['name'] as $key1 => $value1) {
					if ($_FILES[$value]['name'][$key1] != '') {
						if (!$athu->checkImage($_FILES[$value]['type'][$key1])) {
							$this->_messagesError['image'] = $value . ': không đúng định dạng';
						}
						else if ($_FILES[$value]['size'][$key1] > 2048000) {
							$this->_messagesError['image'] = $value . ': kích thước phải nhỏ hơn 2MB';
						}
					}
				}
			}
		}

		if (isset($params['checkform']['file'])) {
			foreach ($params['checkform']['file'] as $key => $value) {
				foreach ($_FILES[$value]['name'] as $key1 => $value1) {
					if ($_FILES[$value]['name'][$key1] != '') {
						if (!$athu->checkFile($_FILES[$value]['type'][$key1])) {
							$this->_messagesError['file'] = $value . ': không đúng định dạng';
						}
						else if ($_FILES[$value]['size'][$key1] > 5120000) {
							$this->_messagesError['file'] = $value . ': kích thước phải nhỏ hơn 5MB';
						}
					}
				}
			}
		}

		if (isset($params['checkform']['number'])) {
			foreach ($params['checkform']['number'] as $key => $value) {
				if ($params['post'][$value] && !$athu->checkNumber($params['post'][$value]) && !$this->_messagesError[$value]) {
					$this->_messagesError[$value] = 'Thông tin phải là số';
				}
			}
		}

		if (isset($params['checkform']['email'])) {
			foreach ($params['post'][$value] && $params['checkform']['email'] as $key => $value) {
				if (!$athu->checkEmail($params['post'][$value]) && !$this->_messagesError[$value]) {
					$this->_messagesError[$value] = 'Thông tin phải là email';
				}
			}
		}

	}

	public function isError()
	{
		if(count($this->_messagesError)>0){
			return true;
		}else{
			return false;
		}
	}

	public function getMessagesError()
	{
		return $this->_messagesError;
	}

	public function getData($options = null)
	{
	    $check = new Check();
		foreach ($this->_arrData['checkform']['image'] as $value) {
			$this->_arrData['post'][$key] = '';
			foreach ($_FILES[$key]['name'] as $key1 => $value1) {
				$this->_arrData['post'][$value][] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($check->stripUnicode($_FILES[$value]['name'][$key1]));
			}
		}
		foreach ($this->_arrData['checkform']['file'] as $key => $value) {
			$this->_arrData['post'][$value] = '';
			foreach ($_FILES[$value]['name'] as $key1 => $value1) {
				$this->_arrData['post'][$value][] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($check->stripUnicode($_FILES[$value]['name'][$key1]));
			}
		}
		return $this->_arrData;
	}
}