<?php

include ("../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['categoryid'])&&(empty($_POST['category']) || empty($_POST['request'])))
	exit();

$request = $_POST['request'];
$devicecat = $DB->escape_string($_POST['category']);
$devicecatid = intval($_POST['categoryid']);

//if(!is_string($devicecat))
//	exit();

$result = array();
switch($request){
	case 'smartlifes':
		$result = $DB->get_records('SELECT d.id, d.name, d.description, d.price, d.monthly, d.icon
			FROM smartlife d
			JOIN smartlife_category dc ON d.category = dc.id
			WHERE LOWER(dc.name) = LOWER("'.$devicecat.'")');
		break;
	case 'smartlife_category':
		$result = $DB->get_records('SELECT dc.id, dc.name, dc.description, dc.image, dc.image_big
			FROM smartlife_category dc
			WHERE LOWER(dc.name) = LOWER("'.$devicecat.'")');
		if(!empty($result)) $result = $result[0];
		break;
	case 'smartlife_category_byid':
		$result = $DB->get_records('SELECT dc.id, dc.name, dc.description, dc.image, dc.image_big
			FROM smartlife_category dc
			WHERE dc.id = '.$devicecatid);
		if(!empty($result)) $result = $result[0];
		break;
}

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>