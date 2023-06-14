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

$email = $_GET['email'];
$contraseña = $_GET['contra'];
$consulta = "SELECT * FROM usuarios WHERE email='$email'";
$resultado = mysqli_query($c, $consulta);
$filas = mysqli_num_rows($resultado);
$arr[] = [];
if ($filas > 0) {
    $row = mysqli_fetch_array($resultado);
    if (password_verify($contraseña, $row['contraseña'])) {
           
        //     $arr = "TODO OK";
        $arr=1;
        
        
    }else{
        
        //     $arr= "error en la contraseña";
            $arr=2;
           
        
    }
} else {
        
            //  $arr= "el email es incorrecto o el usuario no existe";
            $arr=3;
        
        
}
// hacer una sesion con javaScript
//indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($arr);
