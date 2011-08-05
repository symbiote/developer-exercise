<?php

define('ROOT', dirname(__FILE__));

if(substr($_SERVER['SCRIPT_FILENAME'],0,strlen(ROOT)) == ROOT) {
	$urlSegmentToRemove = substr($_SERVER['SCRIPT_FILENAME'],strlen(ROOT));
	if(substr($_SERVER['SCRIPT_NAME'],-strlen($urlSegmentToRemove)) == $urlSegmentToRemove) {
		$baseURL = substr($_SERVER['SCRIPT_NAME'], 0, -strlen($urlSegmentToRemove));
		$baseURL = rtrim($baseURL, DIRECTORY_SEPARATOR);
		if ($baseURL == '') {
			$baseURL = '/';
		}
		define('BASE_URL', $baseURL);
	}
}

include_once ROOT.'/lib.php';
$root = ROOT;
@session_start();

$front = new FrontController();
$url = ltrim(substr($_SERVER['REQUEST_URI'], strlen(BASE_URL)), '/');
$url = substr($url, 0, strpos($url, '?'));
$out = $front->route($url);

if (!headers_sent()) {
	echo $out;
}

