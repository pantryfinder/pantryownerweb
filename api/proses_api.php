<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$sql = mysqli_query($mysqli, "SELECT MAX(user_id) FROM users");
$result = mysqli_fetch_assoc($sql);
$u_id = $result['MAX(user_id)'];
$u_id++;

$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d H:i:s');

if($postjson['aksi'] == "proses_register"){

    $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT username FROM users WHERE username='$postjson[username]'"));
    if($checkemail['username'] == $postjson['username']){
        $result = json_encode(array('succes'=> false, 'msg'=>'Username already exists!'));
    } else{

    $password = md5($postjson['password']);
    $insert = mysqli_query($mysqli, "INSERT INTO users SET
            user_id = '$u_id',
            username  = '$postjson[username]',
            user_fname  = '$postjson[user_fname]',
            user_mname  = '$postjson[user_mname]',
            user_lname  = '$postjson[user_lname]',
            user_contact  = '$postjson[user_contact]',
            user_email  = '$postjson[user_email]',
            user_type = '$postjson[user_type]',
            tac = '$postjson[tac]',
            password  = '$password',
            created_at  = '$today'
    ");

    if($insert){
        $result = json_encode(array('success'=>true, 'msg'=>'Register successfully!'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Register Error'));
     }
    }

    echo $result;
}

elseif($postjson['aksi'] == 'proses_login'){
    $password = md5($postjson['password']);
    $logindata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM users WHERE username='$postjson[username]'
    AND password='$password' AND user_type ='$postjson[user_type]'"));

    $data = array(
            'user_id' =>  $logindata['user_id'],
            'username'  =>  $logindata[ 'username'],
            'user_fname'  =>  $logindata['user_fname'],
            'user_mname'  =>  $logindata['user_mname'],
            'user_lname'  =>  $logindata['user_lname'],
            'user_contact'  =>  $logindata['user_contact'],
            'user_email'  =>  $logindata['user_email'],
            'user_type' =>  $logindata['user_type'],
    );
    if($logindata){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }

     echo $result;
}

elseif($postjson['aksi'] == "load_pantry"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM community_pantry WHERE pantry_id= '$postjson[pantry_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data= array(
            'user_id'  => $rows['user_id'],
            'pantry_id'    => $rows['pantry_id'],
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


elseif($postjson['aksi'] == "load_mypantry"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM community_pantry WHERE user_id = '$postjson[user_id]' ORDER BY pantry_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_id' => $rows['pantry_id'],
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

elseif($postjson['aksi'] == "load_communitypantry"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT users.user_fname, users.user_lname, community_pantry.* 
    FROM community_pantry, users WHERE community_pantry.user_id = users.user_id AND status = 'Open' ORDER BY pantry_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_id' => $rows['pantry_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'pantry_name'     => $rows['pantry_name'],
            'user_contact' => $rows['user_contact'],
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

elseif($postjson['aksi'] == "search_communitypantry"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT users.user_fname, users.user_lname, community_pantry.* 
    FROM community_pantry, users WHERE community_pantry.user_id = users.user_id AND status LIKE '%n%' ORDER BY pantry_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_id' => $rows['pantry_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
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


elseif($postjson['aksi'] == "load_recommend"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT users.user_fname, users.user_lname, community_pantry.* FROM community_pantry, users WHERE status = 'Needs Donation' AND community_pantry.user_id = users.user_id ORDER BY pantry_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_id' => $rows['pantry_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'pantry_name'     => $rows['pantry_name'],
            'user_contact' => $rows['user_contact'],
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

elseif($postjson['aksi'] == "load_listofdonate"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT user_fname, user_lname, user_contact, transaction, donation_id, user_id, pantry_id, COUNT(*) as donations FROM donate_info WHERE pantry_id = '$postjson[pantry_id]' GROUP by user_id");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id'  => $rows['donation_id'],
            'pantry_id'  => $rows['pantry_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_contact' => $rows['user_contact'],
            'user_lname'    => $rows['user_lname'],
            'transaction'  => $rows['transaction'],
            'donations'  => $rows['donations']
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_profile"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE user_id = '$postjson[user_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_mname'    => $rows['user_mname'],
            'user_lname'    => $rows['user_lname'],
            'user_contact' => $rows['user_contact'],
            'user_email'    => $rows['user_email'],
            'user_type'    => $rows['user_type'],
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "update"){
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
        $result = json_encode(array('success'=>true, 'msg'=> ' successfully. Refresh to view.'));
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


elseif($postjson['aksi'] == "load_donationhistory"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT donate_info.*, community_pantry.pantry_name FROM ((donate_info INNER JOIN community_pantry ON donate_info.pantry_id = community_pantry.pantry_id)) WHERE donate_info.statusofdonate = 1 AND donate_info.user_id = '$postjson[user_id]' ORDER BY donation_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_name' => $rows['pantry_name'],
            'pantry_id' => $rows['pantry_id'],
            'donation_id' => $rows['donation_id'],
            'address'     => $rows['address'],
            'user_email' => $rows['user_email'],
            'user_contact' => $rows['user_contact'],
            'date_of_donation' => $rows['date_of_donation'],
            'transaction' => $rows['transaction'],         
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_donordata"){
      
    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE user_id='$postjson[user_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data= array(
            'user_fname'  => $rows['user_fname'],
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

elseif($postjson['aksi'] == "updatestatus"){

    $updt = mysqli_query($mysqli, "UPDATE donate_info SET statusofdonate = 1 WHERE donate_info.donation_id = '$postjson[donation_id]' 
");
   
    if($updt){
        $result = json_encode(array('success'=>true, 'msg'=> ' Successfully Accepted this Donation!'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Prosess error'));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_donorinfo"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM donate_info WHERE donation_id = '$postjson[donation_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id' => $rows['donation_id'],
            'pantry_id' => $rows['pantry_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'address' => $rows['address'],
            'user_email'    => $rows['user_email'],
            'user_contact'    => $rows['user_contact'],
            'date_of_donation'    => $rows['date_of_donation'],
            'transaction'    => $rows['transaction'],
            'statusofdonate'  => $rows['statusofdonate'],
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_map"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT latitude, longitude FROM map WHERE pantry_id = '$postjson[pantry_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'latitude' => $rows['latitude'],
            'longitude' => $rows['longitude']
           
            
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "numberofdonors"){
    
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT COUNT(pantry_id) FROM donate_info WHERE pantry_id= '$postjson[pantry_id]' AND statusofdonate = 1");

    while($rows = mysqli_fetch_assoc($query)){
        $data[]= array(
            
            'pantry_id'    => $rows['COUNT(pantry_id)'],
            
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_approved"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM donate_info WHERE donation_id = '$postjson[donation_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id'  => $rows['donation_id'],
            'pantry_id'  => $rows['pantry_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'user_contact' => $rows['user_contact'],
            'date_of_donation' => $rows['date_of_donation'],
            'statusofdoante' => $postjson['statusofdonate'],
            'transaction'  => $rows['transaction']
           
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}


elseif($postjson['aksi'] == "load_profile1"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE user_id = '$postjson[user_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_mname'    => $rows['user_mname'],
            'user_lname'    => $rows['user_lname'],
            'user_contact' => $rows['user_contact'],
            'user_email'    => $rows['user_email'],
            'user_type'    => $rows['user_type'],
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}


elseif($postjson['aksi'] == "load_listofdonate1"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM donate_info WHERE pantry_id = '$postjson[pantry_id]' ORDER BY donation_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id'  => $rows['donation_id'],
            'pantry_id'  => $rows['pantry_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'address' => $rows['address'],
            'user_contact' => $rows['user_contact'],
            'date_of_donation' => $rows['date_of_donation'],
            'transaction'  => $rows['transaction'],
            'statusofdonate' => $rows['statusofdonate']
       
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "load_pendingdonations"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT donate_info.*, community_pantry.pantry_name FROM ((donate_info INNER JOIN community_pantry ON donate_info.pantry_id = community_pantry.pantry_id)) WHERE donate_info.statusofdonate = 0 AND donate_info.user_id = '$postjson[user_id]' ORDER BY donation_id DESC");

while($rows = mysqli_fetch_array($query)){
    $data[]= array(
        'pantry_name' => $rows['pantry_name'],
        'pantry_id' => $rows['pantry_id'],
        'donation_id' => $rows['donation_id'],
        'address'     => $rows['address'],
        'user_email' => $rows['user_email'],
        'user_contact' => $rows['user_contact'],
        'date_of_donation' => $rows['date_of_donation'],
        'transaction' => $rows['transaction'],         
    );
}

if($query){
    $result = json_encode(array('success'=>true, 'result'=>$data));
}else {
    $result = json_encode(array('success'=>false));
 }
 echo $result;
}

elseif($postjson['aksi'] == 'del_users'){
    
    $query = mysqli_query($mysqli, "DELETE FROM donate_info WHERE donation_id = '$postjson[donation_id]'");


    if($query){
        $result = json_encode(array('success'=>true));
    }else {
        $result = json_encode(array('success'=>false));
     }

     echo $result;
}
elseif($postjson['aksi'] == "load_topdonors"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT donation_id, user_id, user_fname, user_lname, COUNT(*) as donations FROM donate_info WHERE statusofdonate = 1 GROUP by user_id HAVING donations >= 5 ORDER BY donations DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id'  => $rows['donation_id'],      
            'user_id'  => $rows['user_id'],      
            'user_fname'   => $rows['user_fname'],       
            'user_lname'    => $rows['user_lname'],         
            'donations'  => $rows['donations']
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "search_category1"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT users.user_fname, users.user_lname, community_pantry.* FROM community_pantry, users
     WHERE community_pantry.user_id = users.user_id AND category_1 = 1 ORDER BY pantry_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_id' => $rows['pantry_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
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

elseif($postjson['aksi'] == "search_category2"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT users.user_fname, users.user_lname, community_pantry.* FROM community_pantry, users
     WHERE community_pantry.user_id = users.user_id AND category_2 = 1 ORDER BY pantry_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_id' => $rows['pantry_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
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

elseif($postjson['aksi'] == "search_category3"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT users.user_fname, users.user_lname, community_pantry.* FROM community_pantry, users
     WHERE community_pantry.user_id = users.user_id AND category_3 = 1 ORDER BY pantry_id DESC");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pantry_id' => $rows['pantry_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
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

elseif($postjson['aksi'] == "donorbadge"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT donation_id, user_id, user_fname, user_lname, COUNT(*) as donations FROM donate_info WHERE user_id = '$postjson[user_id]' AND statusofdonate = 1");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id'  => $rows['donation_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'donations'  => $rows['donations'],
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == 'deletepantry'){
    
    $query = mysqli_query($mysqli, "DELETE FROM community_pantry WHERE pantry_id = '$postjson[pantry_id]'");


    if($query){
        $result = json_encode(array('success'=>true));
    }else {
        $result = json_encode(array('success'=>false));
     }

     echo $result;
}
elseif($postjson['aksi'] == "total_pending"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT donation_id, user_id, user_fname, user_lname, COUNT(*) as donations FROM donate_info WHERE user_id = '$postjson[user_id]' AND statusofdonate = 0");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id' => $rows['donation_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'donations'  => $rows['donations']
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "total_accepted"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT donation_id, user_id, user_fname, user_lname, COUNT(*) as donations FROM donate_info WHERE user_id = '$postjson[user_id]' AND statusofdonate = 1");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'donation_id' => $rows['donation_id'],
            'user_id' => $rows['user_id'],
            'user_fname'   => $rows['user_fname'],
            'user_lname'    => $rows['user_lname'],
            'donations'  => $rows['donations']
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "totalpantries"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT user_id,  COUNT(*) as pantries FROM community_pantry WHERE user_id = '$postjson[user_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'user_id' => $rows['user_id'],
            'pantries'  => $rows['pantries']
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}

elseif($postjson['aksi'] == "lprevmessage"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM messages WHERE donation_id = '$postjson[donation_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'message_id' => $rows['message_id'],
            'donation_id' => $rows['donation_id'],
            'message' => $rows['message'],
            'created_at'   => $rows['created_at'],
         
        );
    }
   
    if($query){
        $result = json_encode(array('success'=>true, 'result'=>$data));
    }else {
        $result = json_encode(array('success'=>false));
     }
     echo $result;
}