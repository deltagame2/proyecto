
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
$id = $_GET['id'];
$consulta = "DELETE FROM venta WHERE id_venta='$id'";
$resultado = mysqli_query($c, $consulta);
$array = array();
if ($resultado) {
    $array['resultado'] = "OK";
} else {
    $array['resultado'] = "ERROR";
}
$consulta = "DELETE FROM favoritosv WHERE id_v='$id'";
$resultado = mysqli_query($c, $consulta);
$array = array();
if ($resultado) {
    $array['resultado'] = "OK";
} else {
    $array['resultado'] = "ERROR";
}
mysqli_close($c);
 //indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($array);