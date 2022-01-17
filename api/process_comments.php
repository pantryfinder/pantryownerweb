<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d H:i:s');

$sql = mysqli_query($mysqli, "SELECT MAX(comment_id) FROM comments");
$result = mysqli_fetch_assoc($sql);
$c_id = $result['MAX(comment_id)'];
$c_id++;

if($postjson['aksi'] == 'post_comments'){
    $pantry_id= $postjson['pantry_id'];
    $u_id= $postjson['user_id'];

    $cpp = mysqli_fetch_array(mysqli_query($mysqli, "SELECT pantry_id FROM community_pantry WHERE pantry_id = $pantry_id" )); 
    $cp = mysqli_fetch_array(mysqli_query($mysqli, "SELECT user_id FROM users WHERE user_id = $u_id" )); 
    $pantry_id = $cpp['pantry_id'];
    $uu_id = $cp['user_id'];

    $insert = mysqli_query($mysqli, "INSERT INTO comments SET
            comment_id = '$c_id',
            user_id = '$uu_id',
            pantry_id = '$pantry_id',
            user_fname  = '$postjson[user_fname]',
            user_lname  = '$postjson[user_lname]',
            comment  = '$postjson[comment]',
            created_at = '$today'
                      
    ");

    if($insert){
        $result = json_encode(array('success'=>true, 'msg'=>'Successfully Added!'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Failed'));
     }
    
    echo $result;
}

elseif($postjson['aksi'] == "load_comments"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM comments WHERE pantry_id = '$postjson[pantry_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'comment_id' => $rows['comment_id'],
            'user_id' => $rows['user_id'],
            'pantry_id' => $rows['pantry_id'],          
            'user_fname' => $rows['user_fname'],
            'user_lname' => $rows['user_lname'],
            'comment'   => $rows['comment'],
            'created_at' => $rows['created_at']
           
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