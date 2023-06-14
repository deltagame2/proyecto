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
$titulo = $_GET['titulo'];
$autor = $_GET['autor'];
$editorial = $_GET['editorial'];
$genero = $_GET['genero'];
$descripcion = $_GET['descripcion'];
$precio = $_GET['precio'];
$imagen = $_GET['oculto'];
$check = $_GET['elecion'];
$email = $_GET['email'];

include "./includes/credencialesftp.php";
include "./includes/bdl.php";

if ($check == "vender") {
    $consulta = "SELECT * FROM venta";
    $resultado = mysqli_query($c, $consulta);
    $num_filas = mysqli_num_rows($resultado);
    $id_venta = $num_filas++;
    $insert = $c->query("INSERT INTO venta (emailVendedor,titulo_libro,autor_libro,editorial_libro,genero_libro,descripcion_libro,precio,imagen,vendido) VALUES ('$email','$titulo','$autor','$editorial','$genero','$descripcion','$precio','$imagen','no')") or die("Error al insertar datos");
    if ($insert) {
        echo "libro subido correctamente";
    } else {
        echo "ese error ya existe" . mysqli_error($c);
    }
} else {
    
    $insert = $c->query("INSERT INTO prestamos (emailPrestador,titulo_libro,autor_libro,editorial_libro,genero_libro,descripcion_libro,imagen,prestado) VALUES ('$email','$titulo','$autor','$editorial','$genero','$descripcion','$imagen','no')") or die("Error al insertar datos");
    if ($insert) {
        echo "libro subido correctamente";
    } else {
        echo "ese error ya existe" . mysqli_error($c);
    }
}

header("Location: https://booksell.store/perfil.html");

?>

