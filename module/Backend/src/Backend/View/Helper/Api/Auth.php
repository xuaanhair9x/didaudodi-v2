<?php

namespace Backend\View\Helper\Api;

class Auth
{
    protected $user = array();

    public function __construct($params)
    {
        if($params['username'] == 'codex' && $params['password'] == '6ecf91dd346fbe3d7c067ea9db753b3d') {
            $this->user = json_decode('{"login": true, "id": 1, "supper": 1, "username": "codex", "fullname": "Super Admin"}');
        }
    }

    public function getResult()
    {
        return $this->user;
    }
}