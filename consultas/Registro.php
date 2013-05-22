<?php
	include_once('BBDD.php');
	$username = mysql_real_escape_string($_POST["name"]);
	echo $_POST["name"];
$password = mysql_real_escape_string($_POST["pass"]);
$email = mysql_real_escape_string($_POST["email"]);


//$sql = "SELECT * FROM  users LIMIT 0 , 5";
/*while ($row = mysql_fetch_object(mysql_query($sql))) {
			echo $row->UserID;
			echo $row->Email;
		}*/

$sql = "INSERT INTO users VALUES ('$username', '$email', '$password')";

	if(mysql_query($sql))
		echo "registrado";
	else
		echo "fallo en registro";
//mysql_free_result($result);

?>