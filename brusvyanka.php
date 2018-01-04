<?php	
	function comma_separated_to_array($string, $separator = ',') {
		$vals = explode($separator, $string);
		foreach($vals as $key => $val) {
			$vals[$key] = "'".trim($val)."'";
		}
		return implode($separator, array_diff($vals, array("")));		
	}
	function clear_str($string) {		
		$string = str_replace(" ", "", $string);
		$string = str_replace("'", "", $string);		
		return $string;		
	}
	function getTagUrl($row){
		$row['parent'] = explode("/", parse_url($row['url'], PHP_URL_PATH))[1];
		$url = clear_str(substr($row['url'], strpos($row['url'], $row['parent']) + strlen($row['parent']), strlen($row['url'])));
		$url = str_replace("\"", "/", $url);
		$url = str_replace("/", "-", $url);
		$url = ltrim($url, "-");
		$url = rtrim($url, "-");
		if(empty($url)) die('empty tag_url');
		return $url;
	}
	function getProjectIds($row, $db){
		if(empty($row['articles'])) die('empty articles');
		$project_ids = $db->querySingle("
			SELECT		
			GROUP_CONCAT(projects.id) as ids
			FROM
			projects_project AS projects
			WHERE
			projects.articul IN (".comma_separated_to_array(clear_str($row['articles'])).")
		");
		if(empty($project_ids)) die('empty project_ids');
		return explode(",", $project_ids);
	}

	$csv = array_map('str_getcsv', file('brusvyanka.csv'));
	print_r($csv);
	die();
	
	$row = [];	
	$row['url'] = "http://test.brusvyanka.ru/proekty-domov/odnoetazhnye/";
	$row['articles'] = "01-26,01-87,02-03,01-41,01-16,01-90,02-01,01-32";
	$row['title'] = "Проекты одноэтажных домов";

	$db = new SQLite3('db.sqlite3');
	$project_ids = getProjectIds($row, $db);
	$tag_url = getTagUrl($row);	
	$tag_id = $db->querySingle("
		SELECT		
		projects_tag.id
		FROM
		projects_tag
		WHERE
		projects_tag.url = '".$tag_url."'
	");
	if(empty($tag_id)) {
		$results = $db->query("INSERT INTO projects_tag (id, name, title, h1, url, descr, sort, keyword, description, is_index, img) VALUES (NULL, '".$row['title']."', '".$row['title']."', '".$row['title']."', 'odnoetazhnye', '<h2>".$row['title']."</h2>', 0, '', '', 1, '');");
		$tag_id = $db->lastInsertRowID();	
		if(intval($tag_id)==0) die('empty tag id');		
		$results = $db->query("INSERT INTO django_admin_log (id, object_id, object_repr, action_flag, change_message, content_type_id, user_id, action_time) VALUES (NULL, '".$tag_id."', '".$row['title']."', 1, 'Добавлено. Добавлен tag project \"".$row['title']."\".', ".$tag_id.", 3, '".date("Y-m-d H:i:s")."');");
		$results = $db->query("INSERT INTO pages_url_site (id, content_id, content_type_id, url) VALUES (NULL, ".$tag_id.", ".$tag_id.", '/proekty-domov/odnoetazhnye/');");
	}
	foreach($project_ids as $project_id) {
		if(intval($project_id)==0) continue;
		$results = $db->query("INSERT INTO projects_tagproject (id, project_id, tag_id, \"order\") VALUES (NULL, ".$project_id.", ".$tag_id.", 0);");
	}
	
?>