<?php
//Archivo con las credenciales
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
//Conexión a la base de datos.
$c = new mysqli($host,$usuario,$contraseña);

if (mysqli_connect_errno()) {
    printf("Conexión fallida: %s\n", mysqli_connect_error());
    exit();
}
//Selecciono la Base de Datos que voy a usar
if(mysqli_query($c,'use u288612056_booksell')){
    // echo "Base de datos conectada correctamente";
}else{
    echo "No se ha podido conectar a la base de datos".mysqli_error($c);
}
?>