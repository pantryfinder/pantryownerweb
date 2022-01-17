<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$sql = mysqli_query($mysqli, "SELECT MAX(pantry_id) FROM community_pantry");
$result = mysqli_fetch_assoc($sql);
$p_id = $result['MAX(pantry_id)'];
$p_id++;

if($postjson['aksi'] == 'proses_pantry'){
    $u_id= $postjson['user_id'];

    $cp = mysqli_fetch_array(mysqli_query($mysqli, "SELECT user_id FROM users WHERE user_id=$u_id"));
    $uu_id = $cp['user_id'];

    $insert = mysqli_query($mysqli, "INSERT INTO community_pantry SET
            pantry_id = '$p_id',
            user_id = '$uu_id',
            pantry_name  = '$postjson[pantry_name]',
            user_contact  = '$postjson[user_contact]',
            category_1 = '$postjson[category_1]',
            category_2 = '$postjson[category_2]',
            category_3 = '$postjson[category_3]',
            list_of_items  = '$postjson[list_of_items]',
            latitude = '$postjson[latitude]',
            longitude = '$postjson[longitude]',
            street_address  = '$postjson[street_address]',
            barangay  = '$postjson[barangay]',
            municipality  = '$postjson[municipality]',
            province = '$postjson[province]',
            open_time = '$postjson[open_time]',
            close_time = '$postjson[close_time]',
            user_email  = '$postjson[user_email]',
            gcash_number  = '$postjson[gcash_number]',
            status = '$postjson[status]'
    ");

    if($insert){
        $result = json_encode(array('success'=>true, 'msg'=>'Successfully Added!'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Failed'));
     }
    
    echo $result;
}

elseif($postjson['aksi'] == "load_recommendation"){
    $data = array();    

        
        $query_category="SELECT * FROM community_pantry where status = 'Closed'";
       while($rows = mysqli_fetch_array($query)){
        $data= array(
            'pantry_name'     => $rows['pantry_name'],
            'user_contact' => $rows['user_contact'],
            'list_of_items' => $rows['list_of_items'],
            'street_address' => $rows['street_address'],
            'barangay' => $rows['barangay'],
            'municipality' => $rows['municipality'],
            'province' => $rows['province'],
            'email' => $rows['email'],
            'gcash_number' => $rows['gcash_number'],
            'category_1' => $rows['category_1'],
            'status' => $rows['status'],
            'u_id' => $rows['user_id'],
            
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