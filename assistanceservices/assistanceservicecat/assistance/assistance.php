<?php

include ("../../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['id']) && empty($_POST['catid']))
	exit();

$id = intval($_POST['id']);
$catid = intval($_POST['catid']);

if(!empty($_POST['id']))
	$result = $DB->get_records('SELECT * FROM assistance WHERE id='.$id);
else
	$result = $DB->get_records('SELECT * FROM assistance_category WHERE id='.$catid);

if(!empty($result))
	echo json_encode($result[0]);

$DB->close();

?>