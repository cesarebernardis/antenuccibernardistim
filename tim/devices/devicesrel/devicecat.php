<?php

include ("../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['id']) || empty($_POST['type']) || empty($_POST['request']))
	exit();

$request = $_POST['request'];
$type = $DB->escape_string($_POST['type']);
$id = intval($_POST['id']);

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
			JOIN '.$type.'_for af ON af.device = d.id
			WHERE af.'.$type.' = '.$id.' '.$filters);
		break;
	case 'brands':
		$result = $DB->get_records('SELECT DISTINCT(d.brand) 
			FROM device d
			JOIN '.$type.'_for af ON af.device = d.id
			WHERE af.'.$type.' = '.$id.' AND d.brand IS NOT NULL');
		break;
	case 'types':
		$result = $DB->get_records('SELECT DISTINCT(d.type)
			FROM device d
			JOIN '.$type.'_for af ON af.device = d.id
			WHERE af.'.$type.' = '.$id.' AND d.type IS NOT NULL');
		break;
	case 'assistance':
		$result = $DB->get_records('SELECT *
			FROM assistance d
			WHERE d.id = '.$id);
		if(!empty($result)) $result = $result[0];
		break;
	case 'smartlife':
		$result = $DB->get_records('SELECT *
			FROM smartlife d
			WHERE d.id = '.$id);
		if(!empty($result)) $result = $result[0];
		break;
}

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>