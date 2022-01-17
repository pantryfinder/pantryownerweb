<?php
require_once 'headers.php';

$conn = new mysqli('localhost', 'root', '', 'pantryfinder');



if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    if(isset($_GET['user_id'])) { //id used to fetch single row 
        $id = $conn->real_escape_string($_GET['user_id']);
        $sql = $conn->query("SELECT * FROM users WHERE user_id = '$user_id'");
        $data = $sql->fetch_assoc();
    } //else { // fetch all rows
      ////  $data = array();
      //  $sql = $conn->query("SELECT * FROM users");
       // while ($d = $sql->fetch_assoc()){
      //      $data[] = $d;
      //  }
  //  }
    exit(json_encode($data)); //return json data
}