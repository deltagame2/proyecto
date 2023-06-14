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


$emailPrestatario = $_GET['emailPrestado'];
$idPrestamo = $_GET['id_prestamo'];
//fecha de hoy
$fecha = date("Y-m-d");
//fecha de devolucion
$fechaDevolucion = date("Y-m-d", strtotime($fecha . "+ 30 days"));


$consulta = "INSERT INTO prestados (id_prestamo, email_prestado,fecha_inicio,fecha_fin) VALUES ('$idPrestamo', '$emailPrestatario','$fecha','$fechaDevolucion')";
$resultado = mysqli_query($c, $consulta);

$consulta2="UPDATE prestamos SET prestado='si' WHERE id_prestamo='$idPrestamo'";
$resultado2 = mysqli_query($c, $consulta2);

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
