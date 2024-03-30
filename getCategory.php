<?php 
include"./helpers/connection.php";
include "./helpers/authHelpers.php";

if(!isset($_POST['token'])) {
    echo json_encode(array(
        "success" => false,
        "message" => "Token is required"
    ));
    die();

} 

$token = $_POST['token'];

$userId = getUserId($token);
if (!$userId){
    echo json_encode(array(
        "success" => false,
        "message" => "Invalid Token"
    ));
    die();
}


$sql = "SELECT * FROM category";

$result = mysqli_query($CON, $sql);

$categories = [];

while($row = mysqli_fetch_assoc($result)){
    $categories[] = $row;
}

echo json_encode(array(
    "success" => true,
    "message" => "Category fetched successfully",
    "categories" => $categories
));
die();