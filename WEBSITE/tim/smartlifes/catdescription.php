<?php

include ("../lib/db.php");

$result = $DB->get_records('SELECT * FROM smartlife_category');

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>