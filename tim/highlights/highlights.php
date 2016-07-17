<?php

include ("../lib/db.php");

$result = $DB->get_records('SELECT ac.image as image, ascat.name as subcategory, ac.name as category, a.id as id, a.name as name FROM assistance as a, assistance_category as ac, assistance_sub_category as ascat WHERE a.category=ac.id AND ascat.cat_id=ac.id AND ascat.sub_id=a.sub_category AND highlight=1');

if(!empty($result))
	echo json_encode($result);

$DB->close();

?>