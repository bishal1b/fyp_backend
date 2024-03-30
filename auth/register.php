<?php
include "../helpers/connection.php";

if (
    isset(
        $_POST['email'], 
        $_POST['address'], 
        $_POST['contact'], 
        $_POST['password'], 
        $_POST['full_name'], 
        $_FILES['liscence_image'])
) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $address = $_POST['address'];
    $contact = $_POST['contact'];
    $full_name = $_POST['full_name'];

    // Handle file upload
    $image = $_FILES['liscence_image'];
    $image_size = $image['size'];

    if ($image_size > 5 * 1024 * 1024) {
        echo json_encode(array(
            "success" => false,
            "message" => "Image size should be less than 5 MB"
        ));
        exit;
    }

    $ext = pathinfo($image['name'], PATHINFO_EXTENSION);
    $allowed = ["jpg", "jpeg", "png", "webp"];

    if (!in_array($ext, $allowed)) {
        echo json_encode(array(
            "success" => false,
            "message" => "Invalid image format"
        ));
        exit;
    }

    $new_name = uniqid() . "." . $ext;
    $new_location = "./../liscence_images/" . $new_name;
    $image_url = "liscence_images/" . $new_name;

    if (!move_uploaded_file($image['tmp_name'], $new_location)) {
        echo json_encode(array(
            "success" => false,
            "message" => "Failed to upload image"
        ));
        exit;
    }

    // Check if email already exists
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($CON, $sql);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode(array(
            "success" => false,
            "message" => "Email Already Exists"
        ));
        exit;
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    $sql = "INSERT INTO users (full_name, address, contact, email, password, liscence_image) 
            VALUES ('$full_name', '$address', '$contact', '$email', '$hashed_password', '$image_url')";

    $result = mysqli_query($CON, $sql);

    if ($result) {
        echo json_encode(array(
            "success" => true,
            "message" => "User registered successfully"
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "Registration failed, please try again"
        ));
    }
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "All fields are required"
    ));
}

