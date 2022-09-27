<?php
    $server ="localhost";
    $username = "user1";
    $password = "Dev@12345";
    $dbname = "idcard";

    $con = mysqli_connect($server, $username, $password, $dbname);

    if(!$con){
        die("Connection failed" . mysqli_connect_error());
    }
    
?>