<?php

include ("../lib/db.php");

$result = $DB->get_records('SELECT * FROM  assistance_category');

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>