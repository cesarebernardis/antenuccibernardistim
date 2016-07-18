<?php

include ("../../lib/db.php");

if(empty($_POST['category']))
	exit();

$devicecat = $DB->escape_string($_POST['category']);
if(!is_string($devicecat))
	exit();

$result = $DB->get_records('SELECT * FROM device_category WHERE LOWER(name) = LOWER("'.$devicecat.'")');

if(!empty($result))
	echo json_encode($result[0]);

$DB->close();

?>