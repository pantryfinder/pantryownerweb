<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Origin, Authorization, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";

$sql = "SELECT * FROM community_pantry WHERE user_id = 1";

$result = mysqli_query($mysqli, $sql);

$response = array();

while($row = mysqli_fetch_array($result))
{
    array_push($response, array("pantry_id" => $row[0],
                                "user_id"   => $row[1],
                                "pantry_name"   => $row[2],
                                "phone_number"   => $row[3],
                                "street_address"   => $row[4],
                                "barangay"   => $row[5],
                                "municipality"   => $row[6],
                                "province"   => $row[7],
                                "region"   => $row[8],
                                "email"   => $row[9],
                                "gcash_number"   => $row[10],
                                "category"   => $row[11],
                                "status"   => $row[12] 
                            ));

}

echo json_encode($response);
mysqli_close($mysqli);

?>