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
$saldo = $_GET['saldo'];
$emailComprador = $_GET['emailComprador'];
$id = $_GET['id_venta'];
$consulta = "INSERT INTO vendido (id_venta, emailComprador) VALUES ('$id', '$emailComprador')";
$resultado = mysqli_query($c, $consulta);

$consulta2="UPDATE usuarios SET saldo=$saldo WHERE email='$emailComprador'";
$resultado2 = mysqli_query($c, $consulta2);

$consulta3="UPDATE venta SET vendido='si' WHERE id_venta='$id'";
$resultado3 = mysqli_query($c, $consulta3);

$arr = array();
if ($resultado) {
    $arr['resultado'] = "OK";
} else {
    $arr['resultado'] = "ERROR";
}
mysqli_close($c);
//indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($arr);
