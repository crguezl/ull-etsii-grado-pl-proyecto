<?php



echo "fff";

/*
$server ="db470970837.db.1and1.com";
$user = "dbo470970837";
$password ="juan1991";
$database ="db470970837";
$table ="users";

$name = "";
$email ="";
$password ="";
echo "fff";


$asunto = "";
 $mensaje ="";
if(isset($_POST['asunto']) && !empty($_POST['asunto']) && 
	isset($_POST['mensaje']) && !empty($_POST['mensaje'])){
	$destino = "juan.ramos.fg1@gmail.com";
	$fuente = "From:"."www.juanfgr.es";
	$asunto = $_POST['asunto'];
	$mensaje = $_POST['mensaje'];
	mail($destino,$asunto,$mensaje,$fuente);
	echo "Datos enviados";
	}else{
		echo "ERROR!";
	}

if(isset($_POST['name']) && !empty($_POST['name']) && 
   isset($_POST['email'])  && !empty($_POST['email']) &&
    isset($_POST['password']) && !empty($_POST['password'])){
	echo "fff";
mysql_connect($server, $user, $password) or die ("<h3>Caido</h3>");
#mysql_connect('127.0.0.1', 'root','') or die ("<h3>Caido</h3>");

mysql_select_db($database) or die ("<h3>bbdd mal</h3>");
#mysql_select_db('plproyecto') or die ("<h3>bbdd mal</h3>");
	$name =$_POST['name'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	
	mysql_query("INSERT INTO ".$table." VALUES(".$name.",".$email.",".$password.")");
	echo "Datos enviados";
	mysql_close();
	}else{
		echo "ERROR!";
	}
*/

?>