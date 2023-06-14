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
$email=$_GET['email'];
$nombre=$_GET['nombre'];
$apellidos=$_GET['apellidos'];
$contraseña=$_GET['contra'];
// hasear contraseña
$contraseña=password_hash($contraseña, PASSWORD_DEFAULT);

$insert =$c->query("INSERT INTO usuarios (email,nombre,apellidos,contraseña,saldo) VALUES ('$email','$nombre','$apellidos','$contraseña',0)") or die ("Error al insertar datos");

