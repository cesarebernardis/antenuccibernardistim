<?php

include ("../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['request']))
	exit();
$request = $_POST['request'];

$filters = '';

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
			JOIN device_category dc ON d.category = dc.id
			JOIN promotion p ON d.id = p.subject
			WHERE p.subject_type = 0 '.$filters.'
			UNION
			SELECT d.id, d.name, d.price, d.original_price, d.monthly as installment, d.brand, d.type, d.image
			FROM smartlife d
			JOIN smartlife_category dc ON d.category = dc.id
			JOIN promotion p ON d.id = p.subject
			WHERE p.subject_type = 1 '.$filters);
		break;
	case 'brands':
		$result = $DB->get_records('SELECT DISTINCT(d.brand) 
			FROM device d
			JOIN device_category dc ON d.category = dc.id
			JOIN promotion p ON d.id = p.subject AND p.subject_type = 0
			WHERE d.brand IS NOT NULL
			UNION
			SELECT DISTINCT(d.brand) 
			FROM smartlife d
			JOIN smartlife_category dc ON d.category = dc.id
			JOIN promotion p ON d.id = p.subject AND p.subject_type = 1
			WHERE d.brand IS NOT NULL');
		break;
	case 'types':
		$result = $DB->get_records('SELECT DISTINCT(d.type)
			FROM device d
			JOIN device_category dc ON d.category = dc.id
			JOIN promotion p ON d.id = p.subject AND p.subject_type = 0
			WHERE d.type IS NOT NULL
			UNION
			SELECT DISTINCT(d.type)
			FROM smartlife d
			JOIN smartlife_category dc ON d.category = dc.id
			JOIN promotion p ON d.id = p.subject AND p.subject_type = 1
			WHERE d.type IS NOT NULL');
		break;
}

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>