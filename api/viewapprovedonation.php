<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Origin, Authorization, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";

//$user_id = stripslashes($user_id);


$sql = "SELECT * FROM community_pantry WHERE statusoddonate = '1' AND user_id = '$postjson[user_id]' ";
$result = mysqli_query($mysqli, $sql);
//$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
//$active = $row['active'];
$response = array();
while($row = mysqli_fetch_array($result))
{
    array_push($response, array( "donation_id" => $row[0],
                                "pantry_id" => $row[1],
                                "user_id"   => $row[2],
                                "user_fname"   => $row[3],
                                "user_lname"   => $row[4],
                                "address"   => $row[5],
                                "email"   => $row[6],
                                "phone_number"   => $row[7],
                                "date_of_donation"   => $row[8],
                                "transaction"   => $row[9]                               
                            ));
}
echo json_encode($response);
mysqli_close($mysqli);

?>