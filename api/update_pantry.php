<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['aksi'] == "update"){

    $updt = mysqli_query($mysqli, "UPDATE community_pantry SET

            pantry_name  = '$postjson[pantry_name]',
            user_contact  = '$postjson[user_contact]',
            category_1  = '$postjson[category_1]',
            category_2  = '$postjson[category_2]',
            category_3  = '$postjson[category_3]',
            list_of_items  = '$postjson[list_of_items]',
            street_address  = '$postjson[street_address]',
            barangay  = '$postjson[barangay]',
            municipality  = '$postjson[municipality]',
            province = '$postjson[province]',
            open_time = '$postjson[open_time]',
            close_time = '$postjson[close_time]',
            user_email  = '$postjson[user_email]',
            gcash_number  = '$postjson[gcash_number]',       
            status = '$postjson[status]' WHERE pantry_id='$postjson[pantry_id]'
");
   
    if($updt){
        $result = json_encode(array('success'=>true, 'msg'=> ' Successfully!'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Prosess error'));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_pantry"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM community_pantry WHERE pantry_id= '$postjson[pantry_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data= array(
            'pantry_name'     => $rows['pantry_name'],
            'user_contact' => $rows['user_contact'],
            'category_1' => $rows['category_1'],
            'category_2' => $rows['category_2'],
            'category_3' => $rows['category_3'],
            'list_of_items' => $rows['list_of_items'],
            'street_address' => $rows['street_address'],
            'barangay' => $rows['barangay'],
            'municipality' => $rows['municipality'],
            'province' => $rows['province'],
            'open_time' => $rows['open_time'],
            'close_time' => $rows['close_time'],
            'user_email' => $rows['user_email'],
            'gcash_number' => $rows['gcash_number'],
            'status' => $rows['status'],
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

if($postjson['aksi'] == "update_status"){

    $updt = mysqli_query($mysqli, "UPDATE community_pantry SET
    
    status = '$postjson[status]' WHERE pantry_id='$postjson[pantry_id]'
");
   
    if($updt){
        $result = json_encode(array('success'=>true, 'msg'=> ' Successfully!'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Prosess error'));
     }
     echo $result;
}

?>