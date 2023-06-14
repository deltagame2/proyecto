<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}
include "./includes/credencialesftp.php";
include "./includes/bdl.php";
if(!empty($_POST["email"])) {
    $query = "SELECT * FROM usuarios WHERE Email='" . $_POST["email"] . "'";
    $user_count = $db_handle->numRows($query);
    if($user_count>0) {
        echo "<span class='estado-no-disponible-email'> Email no Disponible.</span>";
    }else{
        echo "<span class='estado-disponible-email'> Email Disponible.</span>";
    }
  }
  ?>