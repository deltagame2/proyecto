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
$consulta = "SELECT id_p FROM favoritosp WHERE email='$email'";
$resultado = mysqli_query($c, $consulta);
$arr = array();
if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $arr[] = $fila;
    }
}
$arr2 = array();
foreach ($arr as $key => $value) {
    $id = $value['id_p'];
    $consulta = "SELECT * FROM prestamos WHERE id_prestamo='$id'";
    $resultado = mysqli_query($c, $consulta);
   
    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $arr2[] = $fila;
        }
    }
    
}



//indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($arr2);
