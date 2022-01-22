<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

define('DB_NAME', 'sql6466833');
define('DB_USER', 'sql6466833');
define('DB_PASSWORD', '6fT9NAlbjy');
define('DB_HOST', 'sql6.freemysqlhosting.net');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);


$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d H:i:s');

$sql = mysqli_query($mysqli, "SELECT MAX(donation_id) FROM donate_info");
$result = mysqli_fetch_assoc($sql);
$d_id = $result['MAX(donation_id)'];
$d_id++;

if($postjson['aksi'] == 'prosess_donation'){
  $pantry_id= $postjson['pantry_id'];
   $u_id= $postjson['user_id'];

  $cpp = mysqli_fetch_array(mysqli_query($mysqli, "SELECT pantry_id FROM community_pantry WHERE pantry_id = $pantry_id" )); 
  $cp = mysqli_fetch_array(mysqli_query($mysqli, "SELECT user_id FROM users WHERE user_id = $u_id" )); 
  $p_id = $cpp['pantry_id'];
    $uu_id = $cp['user_id'];

    $insert = mysqli_query($mysqli, "INSERT INTO donate_info SET
            donation_id = '$d_id',
            user_id = '$uu_id',
            pantry_id = '$p_id',
            user_fname  = '$postjson[user_fname]',
            user_lname  = '$postjson[user_lname]',
            address  = '$postjson[address]',
            user_contact  = '$postjson[user_contact]',
            date_of_donation  = '$postjson[date_of_donation]',
            transaction = '$postjson[transaction]',
            created_at  = '$today'            
    ");

    if($insert){
        $result = json_encode(array('success'=>true, 'msg'=>'Successfully Added!'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Failed'));
     }
    
    echo $result;
}

?>