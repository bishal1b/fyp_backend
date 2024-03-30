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
if (!$userId) {
    echo json_encode(array(
        "success" => false,
        "message" => "Invalid Token"
    ));
    die();
}

$isAdmin = isAdmin($token);

if (!$isAdmin) {
    echo json_encode(array(
        "success" => false,
        "message" => "You are not authorized!"
    ));
    die();
}

if (isset($_POST['category'])) {
    $title = $_POST['category'];

    // Check if category already exists
    $checkCategorySql = "SELECT * FROM category WHERE category = '$title'";
    $checkCategoryResult = mysqli_query($CON, $checkCategorySql);
    if (mysqli_num_rows($checkCategoryResult) > 0) {
        echo json_encode(array(
            "success" => false,
            "message" => "Category already exists"
        ));
        die();
    }

    // Insert new category
    $insertCategorySql = "INSERT INTO category (category) VALUES ('$title')";
    $insertCategoryResult = mysqli_query($CON, $insertCategorySql);

    if (!$insertCategoryResult) {
        echo json_encode(array(
            "success" => false,
            "message" => "Failed to add category"
        ));
        die();
    }

    echo json_encode(array(
        "success" => true,
        "message" => "Category added successfully"
    ));
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "category_title is required"
    ));
    die();
}

