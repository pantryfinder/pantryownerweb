<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['aksi'] == 'send'){

$query = mysqli_query($mysqli, "SELECT phone_number FROM community_pantry WHERE pantry_id = '$postjson[pantry_id]'");
$result = mysqli_fetch_assoc($query);
$phone_number = $result['phone_number'];
$message = 'Good day our friend! Someone with a good heart donated in your Pantry, come on and check who it is :)';

sendsms($phone_number, $message);

}

function sendsms($phone_number, $message){


    $ch = curl_init();
    $parameters = array(
        'apikey' => 'f1eb8e188a9e0bb9c24ca36f809cec63', //Your API KEY
        'number' => $phone_number,
        'message' => $message,
        'sendername' => 'SEMAPHORE'
    );
    
    curl_setopt( $ch, CURLOPT_URL,'https://semaphore.co/api/v4/messages' );
    curl_setopt( $ch, CURLOPT_POST, 1 );
    
    //Send the parameters set above with the request
    curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query( $parameters ) );
    
    // Receive response from server
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    $output = curl_exec( $ch );
    curl_close ($ch);
    
    //Show the server response
    echo $output;
}

?>