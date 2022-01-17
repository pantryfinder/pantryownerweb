<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
  header("Content-Type: application/json; charset=UTF-8");
  



  define('DB_NAME', 'sql6463716');
  define('DB_USER', 'sql6463716');
  define('DB_PASSWORD', 'Nda67yQU21');
  define('DB_HOST', 'sql6.freesqldatabase.com');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);



$sql = "SELECT community_pantry.latitude, community_pantry.longitude, community_pantry.pantry_name, community_pantry.list_of_items, 
community_pantry.street_address, community_pantry.barangay, community_pantry.municipality, community_pantry.province, community_pantry.open_time, community_pantry.close_time, community_pantry.status, users.user_fname, users.user_lname FROM community_pantry INNER JOIN users ON users.user_id = community_pantry.user_id";
$result = mysqli_query($mysqli, $sql);

$response = array();
while($row = mysqli_fetch_array($result))
{
    array_push($response, array(
                                
                                "latitude" => $row[0],
                                "longitude"   => $row[1],
                                "pantry_name"   => $row[2],
                                "list_of_items" => $row[3],
                                "street_address" => $row[4],
                                "barangay" => $row[5],
                                "municipality" => $row[6],
                                "province" => $row[7],
                                "open_time" => $row[8],
                                "close_time" => $row[9],
                                "status" => $row[10],
                                "user_fname" => $row[11],
                                "user_lname" => $row[12]
                               
                                
                                
                                
                              
                            ));
}
echo json_encode($response);
mysqli_close($mysqli);
    



?>