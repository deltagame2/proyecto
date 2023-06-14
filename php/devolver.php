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

$fechafin=$_GET['fechafin'];
$id=$_GET['id'];

$fechaActual = date('Y-m-d');

$diferencia = strtotime($fechafin) - strtotime($fechaActual);
$dias = intval($diferencia/86400);

if ($dias>0) {
    $multa=0;
} else {
    $multa=abs($dias)*0.5;
}

$consulta1 = "SELECT * FROM prestados WHERE id_prestamo='$id'";
$resultado1 = mysqli_query($c, $consulta1);
$fila = mysqli_fetch_array($resultado1);
$usuario = $fila['email_prestado'];
$consulta2 ="UPDATE usuarios SET saldo=saldo-$multa WHERE email='$usuario'";
$resultado2 = mysqli_query($c, $consulta2);



$consulta="UPDATE prestamos SET prestado='no' WHERE id_prestamo='$id'";
$resultado = mysqli_query($c, $consulta);
$arr=array();
if ($resultado) {
    $arr['resultado'] = "OK";
} else {
    $arr['resultado'] = "ERROR";
}
//indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($arr);
