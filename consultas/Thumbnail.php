<?php
	include_once('BBDD.php');
	$content = mysql_real_escape_string($_POST["content"]);

//$sql = "SELECT * FROM  users LIMIT 0 , 5";
/*while ($row = mysql_fetch_object(mysql_query($sql))) {
			echo $row->UserID;
			echo $row->Email;
		}*/

$sql = "INSERT INTO pentagrama VALUES ('JUAN', '$content')";

	if(mysql_query($sql))
		echo "subido";
	else
		echo "fallo ";
//mysql_free_result($result);

?>