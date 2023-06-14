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
$titulo= $_GET['titulo'];
$autor= $_GET['autor'];
$editorial= $_GET['editorial'];
$genero= $_GET['genero'];
$foto= $_GET['foto'];

$titulo= str_replace(" ", "%", $titulo);
$autor= str_replace(" ", "%", $autor);
$editorial= str_replace(" ", "%", $editorial);


$consulta = "SELECT * FROM venta WHERE ";
$cWhere = "";
if ($titulo != "") {
  $cWhere = $cWhere . " titulo_libro LIKE '%" . $titulo . "%' AND ";
}

if ($autor != "") {
  $cWhere = $cWhere .  "autor_libro LIKE '%" . $autor . "%' AND ";
}

if ($editorial != "") {
  $cWhere = $cWhere .  "editorial_libro LIKE '%" . $editorial . "%' AND ";
}

if ($genero != "") {
  $cWhere = $cWhere .  "genero_libro LIKE '%" . $genero . "%' AND ";
}

 $cWhere = $cWhere . "vendido='no' AND ";
$consulta = $consulta . $cWhere . 1;
$resultado = $c->query($consulta);
$arr=array();
if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        
       $arr[]=$fila;
    }
} 

//indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($arr);

?>