<?php	
	function filePush($data){
		$fp = fopen('brusvyanka.html', 'a');
		fwrite($fp, $data . PHP_EOL);
		fclose($fp);
	}
	function tofilePush($data){
		$filename = 'templates/projects.html';
		$file = file_get_contents($filename);
		$file = str_replace('{data}', $data, $file);
		file_put_contents($filename, $file);
	}


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
		$row['parent'] = explode("/", parse_url($row[0], PHP_URL_PATH))[1];
		$url = clear_str(substr($row[0], strpos($row[0], $row['parent']) + strlen($row['parent']), strlen($row[0])));
		$url = str_replace("\"", "/", $url);
		$url = str_replace("/", "-", $url);
		$url = ltrim($url, "-");
		$url = rtrim($url, "-");
		if(empty($url)) die('empty tag_url');
		return $url;
	}
	function getProjectIds($row, $db){
		if(empty($row[1])) die('empty articles');
		$project_ids = $db->querySingle("
			SELECT		
			GROUP_CONCAT(projects.id) as ids
			FROM
			projects_project AS projects
			WHERE
			projects.articul IN (".comma_separated_to_array(clear_str($row[1])).")
		");
		if(empty($project_ids)) die('empty project_ids');
		return explode(",", $project_ids);
	}

	$rows = array_map('str_getcsv', file('brusvyanka.csv'));
	foreach($rows as $row) {
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
			$results = $db->query("INSERT INTO projects_tag (id, name, title, h1, url, descr, sort, keyword, description, is_index, img) VALUES (NULL, '".$row[2]."', '".$row[2]."', '".$row[2]."', '".$tag_url."', '<h2>".$row[2]."</h2>', 0, '', '', 1, '');");
			$tag_id = $db->lastInsertRowID();	
			if(intval($tag_id)==0) die('empty tag id');		
			$results = $db->query("INSERT INTO django_admin_log (id, object_id, object_repr, action_flag, change_message, content_type_id, user_id, action_time) VALUES (NULL, '".$tag_id."', '".$row[2]."', 1, 'Добавлено. Добавлен tag project \"".$row[2]."\".', ".$tag_id.", 3, '".date("Y-m-d H:i:s")."');");
			$results = $db->query("INSERT INTO pages_url_site (id, content_id, content_type_id, url) VALUES (NULL, ".$tag_id.", ".$tag_id.", '"."/".explode("/", parse_url($row[0], PHP_URL_PATH))[1]."/".$tag_url."/"."');");
		}
		foreach($project_ids as $project_id) {
			if(intval($project_id)==0) continue;
			$results = $db->query("INSERT INTO projects_tagproject (id, project_id, tag_id, \"order\") VALUES (NULL, ".$project_id.", ".$tag_id.", 0);");
		}
		filePush("<div class=\"inline\" style=\"background:url('/media/images/pics/rekonstrukciya/1.jpg') left center no-repeat;\">");
    	filePush("		<div class=\"inline-in\"><a href=\""."/".explode("/", parse_url($row[0], PHP_URL_PATH))[1]."/".$tag_url."/"."\">".$row[2]."</a></div>");
        filePush("</div>");
    	$data = "<div class=\"inline\" style=\"background:url('/media/images/pics/rekonstrukciya/1.jpg') left center no-repeat;\">";
    	$data .= "		<div class=\"inline-in\"><a href=\""."/".explode("/", parse_url($row[0], PHP_URL_PATH))[1]."/".$tag_url."/"."\">".$row[2]."</a></div>";
    	$data .= "</div>";
        tofilePush($data);

	}	
?>