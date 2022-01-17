<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['aksi'] == 'send'){

$query = mysqli_query($mysqli, "SELECT donate_info.user_contact, users.user_fname, users.user_lname from donate_info INNER JOIN users ON donate_info.user_id=users.user_id WHERE donate_info.donation_id = '$postjson[donation_id]'");
$result = mysqli_fetch_assoc($query);
$user_contact = $result['user_contact'];
$message = 'Good day donor, this text was sent to inform you that the pantry owner already approved your donation. Godbless and thank you!';

sendsms($user_contact, $message);

}

function sendsms($user_contact, $message){


    $ch = curl_init();
    $parameters = array(
        'apikey' => 'f1eb8e188a9e0bb9c24ca36f809cec63', //Your API KEY
        'number' => $user_contact,
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