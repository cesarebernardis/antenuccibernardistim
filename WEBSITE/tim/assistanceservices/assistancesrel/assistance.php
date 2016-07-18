<?php

include ("../../lib/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

if(empty($_POST['id']))
	exit();

$id = intval($_POST['id']);
if($id < 1)
	exit();

$result = $DB->get_records('SELECT d.id as did, d.name as dname, d.brand as brand, ac.image as image, ascat.name as subcategory, ac.name as category, a.id as id, a.name as name FROM assistance_for as af, assistance as a, assistance_category as ac, assistance_sub_category as ascat ,device as d WHERE a.category=ac.id AND ascat.cat_id=ac.id AND ascat.sub_id=a.sub_category AND af.device=d.id AND af.assistance=a.id AND d.id='.$id);
//$result = $DB->get_records('SELECT ac.image as image, ascat.name as subcategory, ac.name as category, a.id as id, a.name as name FROM assistance as a, assistance_category as ac, assistance_sub_category as ascat                                    WHERE a.category=ac.id AND ascat.cat_id=ac.id AND ascat.sub_id=a.sub_category AND highlight=1');

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>