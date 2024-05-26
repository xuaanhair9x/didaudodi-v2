<?php
	require 'define.php';
	require_once ('Google/libraries/Google/autoload.php');

	$data = $_POST;
	$client_id = $data['post']['client_id'];
	$client_secret = $data['post']['secret'];
	$link_home = str_replace('google.php', '', $_SERVER['PHP_SELF']);
	$redirect_uri = PROTOCOL.DOMAIN.$link_home.'dang-nhap-55.html';
	$client = new Google_Client();
	$client->setClientId($client_id);
	$client->setClientSecret($client_secret);
	$client->setRedirectUri($redirect_uri);
	$client->addScope("email");
	$client->addScope("profile");

	$service = new Google_Service_Oauth2($client);

	if(isset($_GET['event']) && $_GET['event'] == 'getlink') {
		// tạo link đăng nhập bên google
		$authUrl = $client->createAuthUrl();
		echo json_encode(array('authUrl' => $authUrl));
	} else if(isset($_GET['event']) && $_GET['event'] == 'authenticate') {
		if (isset($data['google']['code'])) {
			// xác thực để lấy thông tin
			$client->authenticate($data['google']['code']);
			$access_token = $client->getAccessToken();
			$googleUser = $service->userinfo->get();
			echo json_encode(array('googleInfo' => $googleUser));
		}
	}

?>