<?php
	include_once('BBDD.php');
	
	$username = mysql_real_escape_string($_POST["name"]);

$sql = "SELECT  `UserID` ,  `Email` FROM  `users` WHERE UserID =  '$username'";

$res = mysql_query($sql);
if (mysql_query($sql))
{		
	echo "<img src='img/uncheck.png' /> Identificador inválido";
}else{
	echo "<img src='img/check.png' /> Identificador válido";
}
 
?>