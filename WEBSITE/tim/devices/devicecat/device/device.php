<?php

include ("../../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['id']))
	exit();

$device = intval($_POST['id']);
if($device < 1)
	exit();

$result = $DB->get_records('SELECT d.id, d.type as type, d.brand as brand, d.description as description, d.image as image, d.description as description, d.generalinfo as generalinfo, d.tech_spec as tech_spec, d.name as name, d.original_price as original_price, d.price as price, d.installment as installment, c.name as cat  FROM device d, device_category c WHERE c.id=d.category AND d.id = '.$device);
if(!empty($result))
	echo json_encode($result[0]);

$DB->close();

?>