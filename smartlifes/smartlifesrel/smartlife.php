<?php

include ("../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['id']))
	exit();

$id = intval($_POST['id']);
if($id < 1)
	exit();

$result = $DB->get_records('SELECT * 
	FROM smartlife_for af 
	JOIN smartlife a ON a.id = af.smartlife 
	WHERE af.device='.$id);

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>