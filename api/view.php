<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Origin, Authorization, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";

//$user_id = stripslashes($user_id);

$postjson = json_decode(file_get_contents('php://input'), true);

$sql = "SELECT * FROM community_pantry WHERE user_id = $postjson[user_id]'";
$result = mysqli_query($mysqli, $sql);
//$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
//$active = $row['active'];
$response = array();
while($row = mysqli_fetch_array($result))
{
    array_push($response, array("pantry_id" => $row[0],
                                "user_id"   => $row[1],
                                "pantry_name"   => $row[2],
                                "phone_number"   => $row[3],
                                "list_of_items"   => $row[4],
                                "street_address"   => $row[5],
                                "barangay"   => $row[6],
                                "municipality"   => $row[7],
                                "province"   => $row[8],
                                "region"   => $row[9],
                                "email"   => $row[10],
                                "gcash_number"   => $row[11],
                                "status"   => $row[12] 
                            ));
}
echo json_encode($response);
mysqli_close($mysqli);

?>