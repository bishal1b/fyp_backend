<?php  
include"../helpers/connection.php";

if(isset(
    $_POST ['email'],
    $_POST ['password'],
)){

    $email = $_POST ['email'];
    $password = $_POST ['password'];

    $sql = "SELECT * from users where email = '$email'";
    $result = mysqli_query($CON, $sql);

    $count = mysqli_num_rows($result);

    if($count == 0){
        echo json_encode(array(
            "success" => false,
            "message" => "User not found..."
        ));
        die();
    }

    $user = mysqli_fetch_assoc($result);
    $hashed_password = $user['password'];

    $is_correct = password_verify($password, $hashed_password);

    if(!$is_correct){
        echo json_encode(array(
            "success" => false,
            "message" => "Invalid Password"
        ));
        die();
    } 

    $token = bin2hex(random_bytes(16));

    $user_id = $user['user_id'];
    $sql = "Insert into access_tokens (token, user_id) values ('$token', '$user_id')";
    $result = mysqli_query($CON, $sql);

    if(!$result){
        echo json_encode(array(
            "success" => false,
            "message" => "Login failed. please try again later"
        ));
    } else{
        $role = $user['role'];
        echo json_encode(array(
            "success" => True,
            "message" => "Login Successful",
            "token" => $token,
            "role" => $role
        ));

    }

} else {
    echo json_encode(array(
        "success" => false,
        "message" => "All Field Required"
    ));
}
