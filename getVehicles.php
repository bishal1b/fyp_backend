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

$sql = "SELECT vehicles.*, category.*, email, full_name FROM vehicles join category on category.category_id= vehicles.category join users on users.user_id=vehicles.added_by";

$result = mysqli_query($CON, $sql);

$vehicles = [];

while($row = mysqli_fetch_assoc($result)){
    $vehicles[] = $row;
}

echo json_encode(array(
    "success" => true,
    "message" => "Vehicle fetched successfully",
    "vehicles" => $vehicles
));
die();