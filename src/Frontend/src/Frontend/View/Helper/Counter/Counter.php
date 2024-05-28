<?php

namespace Frontend\View\Helper\Counter;
use Zend\View\Helper\AbstractHelper;

class Counter extends AbstractHelper
{
    protected $_path = ROOT_PUBLIC.'/'.'Frontend/src/Frontend/View/Helper/Counter/';

    public function __invoke()
    {
        // kiểm tra ip đã tồn tại chưa
        $ip = $_SERVER['REMOTE_ADDR'];
        $file_ip = fopen($this->_path.'ip.txt', 'rb');
        $not_found = true;
        while (!feof($file_ip)) $line[]=fgets($file_ip,1024);
        for ($i=0; $i<(count($line)); $i++) {
            list($ip_x) = explode("\n",$line[$i]);
            if ($ip == $ip_x) {
                $not_found = false;
                break;
            }
        }
        fclose($file_ip);

        // nếu ip không tồn tài thì thực hiện ghi ip vào file
        if ($not_found == true) {
            $file_ip2 = fopen($this->_path.'ip.txt', 'ab');
            $line = "$ip\n";
            fwrite($file_ip2, $line, strlen($line));
            $this->writeFile();
            fclose($file_ip2);
        }

        return (object) $this->getAccess();
    }

    public function getOnline()
    {
        $rip = $_SERVER['REMOTE_ADDR'];
        $sd = time();
        $count = 1;
        $maxu = 1;

        $file1 = $this->_path."online.log";
        $lines = file($file1);
        $line2 = "";

        foreach ($lines as $line_num => $line) {
            if ($line_num == 0) {
                $maxu = $line;
            } else {
                $fp = strpos($line,'****');
                $nam = substr($line,0,$fp);
                $sp = strpos($line,'++++');
                $val = substr($line,$fp+4,$sp-($fp+4));
                $diff = $sd-$val;
                if ($diff < 300 && $nam != $rip) {
                    $count = $count+1;
                    $line2 = $line2.$line;
                }
            }
        }

        $my = $rip."****".$sd."++++\n";
        if ($count > $maxu) {
            $maxu = $count;
        }

        $open1 = fopen($file1, "w");
        fwrite($open1,"$maxu\n");
        fwrite($open1,"$line2");
        fwrite($open1,"$my");
        fclose($open1);
        $count = $count;
        $maxu = $maxu+200;

        return $count;
    }

    public function writeFile()
    {
        $arrData = $this->resultArr($this->_path.'count.txt');
        $date = date('Y-m-d');
        if ($arrData[6] == $date) {
            $today = $arrData[1] + 1;
            $yesterday = $arrData[2];
        } else {
            $today = 1;
            $yesterday = $arrData[1];
            $ip_file = fopen($this->_path.'ip.txt', "w");
            fwrite($ip_file,"");
            fclose($ip_file);
        }
        $arrWm = $this->resultArr($this->_path.'date.txt');
        $week = date('W', strtotime($date));
        $month = date('m', strtotime($date));
        if ($arrWm[0] == $week) {
            $weekly = $arrData[3] + 1;
        } else{
            $weekly = $today;
        }
        if ($arrWm[1] == $month) {
            $monthly = $arrData[4] + 1;
        } else {
            $monthly = $today;
        }
        $line = "$week%$month";
        $file_count2 = fopen($this->_path.'date.txt', 'wb');
        fwrite($file_count2, $line, strlen($line));
        fclose($file_count2);
        $total = $arrData[5]+1;
        $online = $this->getOnline();
        $line = "$online%$today%$yesterday%$weekly%$monthly%$total%$date";
        $file_count2 = fopen($this->_path.'count.txt', 'wb');
        fwrite($file_count2, $line, strlen($line));
        fclose($file_count2);
    }

    public function resultArr($path)
    {
        $file_count = fopen($path, 'rb');
        $data = '';
        while (!feof($file_count)) $data .= fread($file_count, 4096);
        fclose($file_count);
        return explode("%", $data);
    }

    public function getAccess()
    {
        $arrKey = array('online','today','yesterday','week','month','total','date');
        $arrValue = $this->resultArr($this->_path.'count.txt');
        return array_combine($arrKey, $arrValue);
    }
}
