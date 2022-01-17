<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['aksi'] == "update"){
    $password = md5($postjson['password']);
    $checkpass = mysqli_fetch_array(mysqli_query( $mysqli, "SELECT password FROM users WHERE user_id='$postjson[user_id]'"));

    if($postjson['password'] == ""){
           $password = $checkpass['password'];
    }else{
        $password = md5($postjson['password']);
    }

    $updt = mysqli_query($mysqli, "UPDATE users SET
    username  = '$postjson[username]',
    user_fname  = '$postjson[user_fname]',
    user_mname  = '$postjson[user_mname]',
    user_lname  = '$postjson[user_lname]',  
    user_contact  = '$postjson[user_contact]',
    user_email  = '$postjson[user_email]',
    password  = '$password' WHERE user_id='$postjson[user_id]'
");
   
    if($updt){
        $result = json_encode(array('success'=>true, 'msg'=> 'Successfully'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Proses error'));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_single_data"){
      
    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE user_id='$postjson[user_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data= array(
           
            'username'     => $rows['username'],
            'user_fname'  => $rows['user_fname'],
            'user_mname' => $rows['user_mname'],
            'user_lname' => $rows['user_lname'],
            'user_contact' => $rows['user_contact'],
            'user_email' => $rows['user_email']
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }

     echo $result;
}


?>