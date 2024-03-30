<?php

include "./helpers/connection.php";
include "./helpers/authHelpers.php";


if (!isset($_POST['token'])) {
    echo json_encode(array(
        "success" => false,
        "message" => "Token is required"
    ));
    die();
}

$token = $_POST['token'];

$userId = getUserId($token);
$isAdmin = isAdmin($token);

if (!$userId) {
    echo json_encode(array(
        "success" => false,
        "message" => "Invalid token"
    ));
    die();
}


$sql = '';


if ($isAdmin) {
    $sql = "select payments.*,email, full_name, address, contact from payments join users on users.user_id = payments.payment_by order by created_at desc";
} else {

    $sql = "select payments.*,email, full_name, address, contact from payments join users on users.user_id = payments.payment_by where payment_by = $userId order by created_at desc";
}


$result = mysqli_query($CON, $sql);


if (!$result) {
    echo json_encode(array(
        "success" => false,
        "message" => "Error fetching payments"
    ));
    die();
}


$payments = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode(array(
    "success" => true,
    "message" => "Payments fetched successfully",
    "payments" => $payments
));