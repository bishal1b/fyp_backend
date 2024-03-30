<?php 
include"./helpers/connection.php";

function getUserId($token){

    $sql = "SELECT user_id FROM access_tokens WHERE token = '$token' ";

    global $CON;

    $result = mysqli_query($CON, $sql);

    if(!$result){
        return null;
    }

    $user = mysqli_fetch_assoc($result);

    return $user['user_id'];

}

function isAdmin($token){
    $userId = getUserId($token);

    if(!$userId){
        return false;
    }

    global $CON;
    $sql = "SELECT role FROM users where user_id = '$userId'";
    $result = mysqli_query($CON, $sql);

    if(!$result){
        return false;
    }

    $user = mysqli_fetch_assoc($result);
    $userRole = $user['role'];

    return $userRole == "admin";
}