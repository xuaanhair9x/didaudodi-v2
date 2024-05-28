<?php

namespace Backend\View\Helper;
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
        $translator = new \Zend\I18n\Translator\Translator();
        $translator->addTranslationFile('phpArray',ROOT.'/module/Backend/language/'.BE_LANG.'.php','default');
		$Check = new Check();

        if (isset($params['checkForm']['image'])) {
            $allow_size = (($params['checkForm']['allow_size_image']) ? $params['checkForm']['allow_size_image'] : 10);
            foreach ($params['checkForm']['image'] as $type => $vl_upload) {
                foreach ($vl_upload as $name => $value) {
                    if ($type == 'single') {
                        if ($_FILES[$name]['name'] != '') {
                            if (!$Check->checkImage($_FILES[$name]['type'])) {
                                $this->_messagesError[] = $value[0] . ': '.$translator->translate("Không đúng định dạng");
                            }
                            else if ($_FILES[$name]['size'] > ($allow_size*1024*1024)) {
                                $this->_messagesError[] = $value[0] . ': '.$translator->translate("Kích thước phải nhỏ hơn ".$allow_size."MB");
                            } else {
                                $params['post'][$name] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($Check->stripUnicode($_FILES[$name]['name']));
                            }
                        }
                    }
                    if ($type == 'multi') {
                        foreach ($_FILES['multi_image']['name'][$name]['thumbnail'] as $i => $noValue) {
                            if ($_FILES['multi_image']['name'][$name]['thumbnail'][$i] != '') {
                                if (!$Check->checkImage($_FILES['multi_image']['type'][$name]['thumbnail'][$i])) {
                                    $this->_messagesError[] = $value[0] . ': '.$translator->translate("Không đúng định dạng");
                                }
                                else if ($_FILES['multi_image']['size'][$name]['thumbnail'][$i] > ($allow_size*1024*1024)) {
                                    $this->_messagesError[] = $value[0] . ': '.$translator->translate("Kích thước phải nhỏ hơn ".$allow_size."MB");
                                }
                            }
                        }
                    }
                }
            }
        }

		if (isset($params['checkForm']['required'])) {
			foreach ($params['checkForm']['required'] as $name => $label) {
                if (strpos($name, 'translate') === false) {
                    preg_match('/(.*){(.*)}/', $name, $output);
                    $field = empty($output) ? $name : $output[1];
                    $key = $output[2];
                    switch ($field) {
                        case 'thumbnail':
                            $text = $_FILES[$field]['name'];
                            break;
                        case 'multi_input':
                        case 'list_select_id':
                        case 'select':
                            $text = $params['post'][$field][$key];
                            break;

                        default:
                            $text = $params['post'][$field];
                            break;
                    }

                    if (!$Check->checkEmpty($text)) {
                        $this->_messagesError[$name] = $label . ': '.$translator->translate("Thông tin bắt buộc");
                    }
                } else {
                    $field = preg_replace('/(\['.$options["translate"].'\]|\[|\]|translate)/', '', $name);
                    $text = $params['post']['translate'][$options['translate']][$field];
                    if (!$text && $field == 'thumbnail') {
                        $text = $_FILES['translate']['name'][$options['translate']][$field];
                    }
                    if (!$Check->checkEmpty($text) && strpos($name, 'multi_input') === false && strpos($name, 'list_select_id') === false) {
                        $this->_messagesError[$name] = $label . ': '.$translator->translate("Thông tin bắt buộc");
                    }
                }
			}
		}

        if (isset($params['checkForm']['email']) && !$this->_messagesError['email']) {
            foreach ($params['checkForm']['email'] as $name => $label) {
                if ($params['post'][$name] && !$Check->checkEmail($params['post'][$name])) {
                    $this->_messagesError[$name] = $label . ': '.$translator->translate("Email không hợp lệ");
                }
            }
        }

        if (isset($params['checkForm']['password']) && !$this->_messagesError['password']) {
            foreach ($params['checkForm']['password'] as $key => $value) {
                if ($params['post'][$key]) {
                    if (!$Check->checkPassword($params['post'][$key])) {
                        $message = $validator->getMessages();
                        $this->_messagesError[$key] = $value . ': '.$translator->translate("phải có từ 8 - 20 ký tự, ít nhất có 1 ký tự đặc biệt !@#$&*");
                    } else {
                        $this->_arrData['post'][$key] = \Backend\View\Helper\Crypt::encodePassword($params['post'][$key]);
                    }
                }
            }
        }

        if (isset($params['checkForm']['confirm'])) {
            foreach ($params['checkForm']['confirm'] as $key => $value) {
                if (!$Check->checkConfirm($params['post'][$key], $params['post'][$value[1]])) {
                    $this->_messagesError[$key] = $value[0] . ': '.$translator->translate("Xác nhận chưa đúng");
                }
            }
        }

		if (isset($params['checkForm']['file'])) {
			foreach ($params['checkForm']['file'] as $value) {
				foreach ($_FILES[$value['name']]['name'] as $i => $no_value) {
					if ($_FILES[$value['name']]['name'][$i] != '') {
						if (!$Check->checkFile($_FILES[$value['name']]['type'][$i])) {
							$this->_messagesError['file'] = $value['label'] . ': '.$translator->translate("Không đúng định dạng");
						}
						else if ($_FILES[$value['name']]['size'][$i] > 153600) {
							$this->_messagesError['file'] = $value['label'] . ': '.$translator->translate("Kích thước phải nhỏ hơn 100MB");
						}
					}
				}
			}
		}

        if (isset($params['checkForm']['color'])) {
            foreach ($params['checkForm']['color'] as $key => $value) {
                if (!$Check->checkColor($params['post'][$key])) {
                    $message = $validator->getMessages();
                    $this->_messagesError[$key] = $value . ': '.$translator->translate("Không đúng cú pháp");
                } else {
                    $this->_arrData['post'][$key] = $Check->checkColor($params['post'][$key]);
                }
            }
        }
	}

	public function isError()
	{
		if(count($this->_messagesError) > 0){
			return true;
		}else{
			return false;
		}
	}

	public function getMessagesError()
	{
		return $this->_messagesError;
	}

    public function setMessagesError($error)
    {
        $this->_messagesError = $error;
    }

	public function getData($define = array())
	{
	    $Check = new Check();
		foreach ($this->_arrData['checkForm']['image'] as $type => $vl_upload) {
            foreach ($vl_upload as $name => $value) {
                if ($type == 'single') {
                    $hasTranslate = array_filter($define['validate']['translate'], function($val) use ($name) { return $val == $name; });
                    if ($hasTranslate) {
                        foreach ($_FILES['translate']['name'] as $lang => $val) {
                            $this->_arrData['post']['translate'][$lang][$name] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($Check->stripUnicode($val[$name]));
                        }
                    } else {
                        $this->_arrData['post'][$name] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($Check->stripUnicode($_FILES[$name]['name']));
                    }
                } else if ($type == 'multi') {
                    $hasTranslate = array_filter($define['multi_image'], function($val) use ($name) { return $val['name'] == $name && ($val['translate'] || $val['translate_image']); });
                    if ($hasTranslate) {
                        foreach ($_FILES['translate']['name'] as $lang => $val) {
                            foreach ($val['multi_image'][$name]['thumbnail'] as $thumbnail) {
                                $this->_arrData['post']['translate'][$lang]['multi_image'][$name]['thumbnail'][] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($Check->stripUnicode($thumbnail));
                            }
                        }
                    } else {
                        foreach ($_FILES['multi_image']['name'][$name]['thumbnail'] as $thumbnail) {
                            $this->_arrData['post']['multi_image'][$name]['thumbnail'][] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($Check->stripUnicode($thumbnail));
                        }
                    }
                }
            }
		}

		foreach ($this->_arrData['checkForm']['file'] as $value) {
			foreach ($_FILES['multi_file']['name'][$value['name']]['file'] as $file) {
				$this->_arrData['post']['multi_file'][$value['name']]['file'][] = \Backend\View\Helper\ThumbImages\Upload::renameExtension($Check->stripUnicode($file));
			}
		}

		return $this->_arrData;
	}
}