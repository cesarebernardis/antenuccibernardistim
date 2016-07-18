<?php

include ("../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['category']) || empty($_POST['request']))
	exit();
$request = $_POST['request'];
$devicecat = $DB->escape_string($_POST['category']);

if(!is_string($devicecat))
	exit();

$catcond = 'LOWER(dc.name) = LOWER("'.$devicecat.'")';
$join = '';
$filters = '';
if(strtolower($devicecat) == "outlet"){
	$catcond = '';
	$join = 'JOIN promotion p ON d.id = p.subject ';
	$filters = 'p.subject_type = 0';
}

if(!empty($_POST['ftype'])){
	$filters .= $_POST['ftype'];
}
if(!empty($_POST['fprice'])){
	$filters .= $_POST['fprice'];
}
if(!empty($_POST['fbrand'])){
	$filters .= $_POST['fbrand'];
}

$result = array();
switch($request){
	case 'devices':
		$result = $DB->get_records('SELECT d.id, d.name, d.price, d.original_price, d.installment, d.brand, d.type, d.image
			FROM device d
			JOIN device_category dc ON d.category = dc.id '.$join.'
			WHERE '.$catcond.' '.$filters);
		break;
	case 'brands':
		$result = $DB->get_records('SELECT DISTINCT(d.brand) 
			FROM device d
			JOIN device_category dc ON d.category = dc.id '.$join.'
			WHERE d.brand IS NOT NULL'.(empty($catcond)? '' : ' AND LOWER(dc.name) = LOWER("'.$devicecat.'")'));
		break;
	case 'types':
		$result = $DB->get_records('SELECT DISTINCT(d.type)
			FROM device d
			JOIN device_category dc ON d.category = dc.id '.$join.'
			WHERE d.type IS NOT NULL'.(empty($catcond)? '' : ' AND LOWER(dc.name) = LOWER("'.$devicecat.'")'));
		break;
}

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>