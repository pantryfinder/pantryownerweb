<?php
require_once 'headers.php';

$conn = new mysqli('sql6.freesqldatabase.com', 'sql6462117', 'sql6462117', 'AM2VnbnPQD');
//$conn = new mysqli('localhost', 'root', '', 'pantryfinder');

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    if(isset($_GET['pantry_id'])) { //id used to fetch single row 
        $id = $conn->real_escape_string($_GET['pantry_id']);
        $sql = $conn->query("SELECT * FROM community_pantry WHERE pantry_id = '$pantry_id'");
        $data = $sql->fetch_assoc();
    } else { // fetch all rows
        $data = array();
        $sql = $conn->query("SELECT * FROM community_pantry");
        while ($d = $sql->fetch_assoc()){
            $data[] = $d;
        }
    }
    exit(json_encode($data)); //return json data
}



if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));
    $sql = $conn->query("INSERT INTO students (name, address, phone) VALUES ('".$data->name."', '".$data->address."', '".$data->phone."')");
    if($sql){
        $data->id = $conn->insert_id; // append id to the data object
        exit(json_encode($data));
    } else {
        exit(json_encode(array('status' =>'error'))); 
    }
}
