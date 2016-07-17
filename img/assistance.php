<?php

include ("../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

//if(empty($_POST['category']) || empty($_POST['sub']))
//	exit();

$category = $DB->escape_string($_POST['category']);
$sub = intval($_POST['sub']);

$result = $DB->get_records('SELECT ascat.name as subname, a.name as name FROM assistance a, assistance_category ac, assistance_sub_category ascat WHERE a.category=ac.id AND ac.id=ascat.cat_id AND ascat.sub_id=a.sub_category AND ascat.sub_id='.$sub);
if(!empty($result))
	echo json_encode($result);

$DB->close();

?>