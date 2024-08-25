<?php

namespace Backend\View\Helper\Api;

use Zend\Mime\Mime;

class SendMail
{
    protected $result = array();

    public function __construct($params)
    {
        $MenuCodeTb = new \Backend\Model\MenuCodeTb();
        preg_match("'id=(.*?)/'si", $MenuCodeTb->getItem(array('id' => 38, 'display' => 1, 'columns' => array('link')))['link'], $branch);
        $InfoTb = new \Backend\Model\InfoTb();
        $mailer = $InfoTb->getItem(array('id' => $branch[1], 'columns' => array('mailer')))['mailer'];

        $config = array(
            'from' => 'magento.hainguyen@gmail.com',
            'username' => 'magento.hainguyen@gmail.com',
            'password' => 'tdztsecjhaekbqiy',
            'host' => 'smtp.gmail.com',
            'ssl' => 'ssl',
            'port' => 465
        );

//        if ($mailer) {
//            $config['from'] = $mailer['auth']['user'];
//            $config['username'] = $mailer['auth']['user'];
//            $config['password'] = $mailer['auth']['pass'];
//            $config['host'] = $mailer['host'];
//            $config['port'] = $mailer['port'];
//        }

        $content            = new \Zend\Mime\Part($params['body']);
        $content->type      = Mime::TYPE_HTML;
        $content->charset   = "UTF-8";
        $mimeMessage = new \Zend\Mime\Message();
        $mimeMessage->setParts(array($content));

        $emailTo = explode(';', $params['emailTo']);
        foreach ($emailTo as $i => $mail) {
            $emailTo[$i] = preg_replace('/\s+/', '', $mail);
        }

        $message = new \Zend\Mail\Message();
        $message->setBody($mimeMessage);
        $message->setFrom($config['from']);
        $message->addTo($emailTo);
        $message->setSubject($params['subject']);

        $smtpOptions = new \Zend\Mail\Transport\SmtpOptions();
        $smtpOptions->setHost($config['host'])
                    ->setConnectionClass('login')
                    ->setName($config['host'])
                    ->setPort($config['port'])
                    ->setConnectionConfig(array(
                        'username' => $config['username'],
                        'password' => $config['password'],
                        'ssl' => $config['ssl'],
                    ));

        $transport = new \Zend\Mail\Transport\Smtp($smtpOptions);
        $transport->send($message);
    }

    public function getResult()
    {
        return $this->result;
    }
}