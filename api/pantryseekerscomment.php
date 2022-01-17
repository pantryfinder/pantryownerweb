<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d H:i:s');

$sql = mysqli_query($mysqli, "SELECT MAX(pscomment_id) FROM pantryseekers_comment");
$result = mysqli_fetch_assoc($sql);
$c_id = $result['MAX(pscomment_id)'];
$c_id++;

if($postjson['aksi'] == 'post_comments'){
    $pantry_id= $postjson['pantry_id'];

    $cpp = mysqli_fetch_array(mysqli_query($mysqli, "SELECT pantry_id FROM community_pantry WHERE pantry_id = $pantry_id" )); 
    $pantry_id = $cpp['pantry_id'];

    $insert = mysqli_query($mysqli, "INSERT INTO pantryseekers_comment SET
            pscomment_id = '$c_id',
            pantry_id = '$pantry_id',
            first_name  = '$postjson[first_name]',
            last_name  = '$postjson[last_name]',
            comment  = '$postjson[comment]',
            created_at = '$today'
    ");

    if($insert){
        $result = json_encode(array('success'=>true, 'msg'=>'Comment Successfully Added! Refresh to view :)'));
    }else {
        $result = json_encode(array('success'=>false, 'msg'=>'Failed'));
     }
    
    echo $result;
}

elseif($postjson['aksi'] == "load_comments"){
    $data = array();    
    $query = mysqli_query($mysqli, "SELECT * FROM pantryseekers_comment WHERE pantry_id = '$postjson[pantry_id]'");

    while($rows = mysqli_fetch_array($query)){
        $data[]= array(
            'pscomment_id' => $rows['pscomment_id'],
           
            'pantry_id' => $rows['pantry_id'],          
            'first_name' => $rows['first_name'],
            'last_name' => $rows['last_name'],
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
