<?php 

$host = "localhost";
$user = "root";
$password = "";
$db = "vehiclerental";

$CON = mysqli_connect($host, $user, $password, $db);

if(!$CON) {
    echo "Connect Failed";
} 

