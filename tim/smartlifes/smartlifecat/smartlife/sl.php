<?php

include ("../../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['id']))
	exit();

$smartlife = intval($_POST['id']);
if($smartlife < 1)
	exit();

$result = $DB->get_records('SELECT * FROM smartlife WHERE id = '.$smartlife);
if(!empty($result))
	echo json_encode($result[0]);

$DB->close();

?>