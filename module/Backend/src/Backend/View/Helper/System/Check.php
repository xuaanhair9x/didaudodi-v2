<?php

namespace Backend\View\Helper\System;

class Check
{
    public function checkEmpty($value){
        $value = is_array($value) ? array_filter($value) : $value;
        if(!empty($value) || ($value != '' && $value == 0)) return true;
        return false;
    }

    public function checkNumber($num){
        if(is_numeric($num)){
            return true;
        }
        return false;
    }

    public function checkEmail($str){
        if(filter_var($str, FILTER_VALIDATE_EMAIL)){
            return true;
        }
        return false;
    }

    public function checkPassword($pw){
        if (preg_match("/^(?=.*[!@#$&*]).{8,20}$/",$pw)) {
            return true;
        }
        return false;
    }
    public function checkConfirm($str, $str_confirm){
        if ($str == $str_confirm) {
            return true;
        }
        return false;
    }

    public function checkImage($file_type){
        if (in_array($file_type, array('image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'))) {
            return true;
        }
        return false;
    }

    public function checkFile($file_type){
        $arr = array(
            'application/msword', //doc
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx
            'application/vnd.ms-excel', //xls
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //xlsx
            'application/vnd.openxmlformats-officedocument.presentationml.presentation', //pptx
            'application/pdf',
            'application/excel',
            'application/rar',
            'application/zip'
        );
        if (in_array($file_type, $arr)) {
            return true;
        }
        return false;
    }

    public function checkColor($color){
        $pos = strpos($color, '#');
        if ($pos === false) {
            echo strlen($color);
            if (strlen($color) == 6 || strlen($color) == 3) {
                return '#'.$color;
            }
        } else {
            if (strlen($color) == 7 || strlen($color) == 4) {
                return $color;
            }
        }
        return false;
    }

    public function checkcatalog($file_type){
        if($file_type == 'application/pdf'){
            return true;
        }
        return false;
    }

    public function checkdoct($file_type){
        if( $file_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            || $file_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ){
            return true;
        }
        return false;
    }

    public function stripUnicode($str){
        if(!$str) return false;
        $str = trim(mb_strtolower($str,"utf8"));
        $unicode = array(
            'a'=>'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ',
            'A'=>'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
            'd'=>'đ',
            'D'=>'Đ',
            'e'=>'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
            'E'=>'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
            'i'=>'í|ì|ỉ|ĩ|ị',
            'I'=>'Í|Ì|Ỉ|Ĩ|Ị',
            'o'=>'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
            'O'=>'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
            'u'=>'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
            'U'=>'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
            'y'=>'ý|ỳ|ỷ|ỹ|ỵ',
            'Y'=>'Ý|Ỳ|Ỷ|Ỹ|Ỵ'
        );
        foreach($unicode as $khongdau => $codau) {
            $arr = explode("|",$codau);
            $str = str_replace($arr,$khongdau,$str);
        }
        $str = preg_replace('([^a-zA-Z0-9/.])', '', $str);
        $str = substr($str,-100);
        return $str;
    }
}