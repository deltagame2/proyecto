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
//Archivo con las credenciales
include "./includes/credencialesftp.php";
//Conexión a la base de datos.
$c = new mysqli($host, $usuario, $contraseña);

if (mysqli_connect_errno()) {
    printf("Conexión fallida: %s\n", mysqli_connect_error());
    exit();
}
mysqli_query($c, "DROP DATABASE  BOOKSELL");

//Si no existe creo la base de datos Practicas
if (!mysqli_query($c, "CREATE DATABASE BOOKSELL")) {
    echo mysqli_error($c);
}

//Selecciono la Base de Datos que voy a usar
if (mysqli_query($c, 'use BOOKSELL')) {
    echo "Base de datos conectada correctamente";
} else {
    echo "No se ha podido conectar a la base de datos" . mysqli_error($c);
}

//Si no existe creo la tabla alumnos
if (mysqli_query(
    $c,
    'CREATE TABLE  Usuarios (
    email VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(50),
    apellidos VARCHAR(200),
    contraseña TEXT,
    direccion TEXT,
    cod_postal NUMERIC(5),
    saldo NUMERIC(4)
    )'
)) {
    echo "Tabla Usuarios creada correctamente";
} else {
    echo "No se ha podido crear la tabla Usuarios" . mysqli_error($c);
}




if (mysqli_query(
    $c,
    "CREATE TABLE Comentarios (
        id_comentario INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        emailComentado VARCHAR(100),
        emailComentador VARCHAR(100),
        comentario TEXT
        )"
)) {
    echo "Tabla Comentarios creada correctamente";
} else {
    echo "No se ha podido crear la tabla Comentarios" . mysqli_error($c);
}


if (mysqli_query(
    $c,
    "CREATE TABLE Prestamos (
   
    id_prestamo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emailPrestador VARCHAR(100),
     titulo_libro VARCHAR(100),
     autor_libro VARCHAR(100),
     editorial_libro VARCHAR(100),
     genero_libro VARCHAR(100),
     descripcion_libro TEXT,
     imagen TEXT,
     prestado VARCHAR(2)
   )"
)) echo "Tabla Prestamos creada correctamente";
else echo "No se ha podido crear la tabla Prestamos" . mysqli_error($c);



if (mysqli_query(
    $c,
    "CREATE TABLE  Prestados (
    id_prestado INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_prestamo NUMERIC(4),
    email_prestado VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_prestado, id_prestamo) )"
)) {
    echo "Tabla Prestados creada correctamente";
} else {
    echo "No se ha podido crear la tabla Prestados" . mysqli_error($c);
};



if (mysqli_query(
    $c,
    "CREATE TABLE  Venta (
    id_venta INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    emailVendedor VARCHAR(100),
     titulo_libro VARCHAR(100),
     autor_libro VARCHAR(100),
     editorial_libro VARCHAR(100),
    genero_libro VARCHAR(100),
     descripcion_libro TEXT,
     precio NUMERIC(4),
        imagen TEXT,
     vendido VARCHAR(2)
   )"
)) {
    echo "Tabla Venta creada correctamente";
} else {
    echo "No se ha podido crear la tabla Venta" . mysqli_error($c);
};



if (mysqli_query(
    $c,
    "CREATE TABLE  Vendido (
    id_vendido INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_venta NUMERIC(4), 
    emailComprador VARCHAR(100)
   
   )"
)) {
    echo "Tabla Vendido creada correctamente";
} else {
    echo "No se ha podido crear la tabla Vendido" . mysqli_error($c);
};

if (mysqli_query(
    $c,
    "CREATE TABLE FavoritosP (
    
    id_p VARCHAR(30),
  email VARCHAR(100),
  PRIMARY KEY (id_p, email))"
)) {
    echo "Tabla Favoritos creada correctamente";
} else {
    echo "No se ha podido crear la tabla Favoritos" . mysqli_error($c);
};

if (mysqli_query(
    $c,
    "CREATE TABLE FavoritosV (
    
    id_v VARCHAR(30),
  email VARCHAR(100),
  PRIMARY KEY (id_v, email))"
)) {
    echo "Tabla Favoritos creada correctamente";
} else {
    echo "No se ha podido crear la tabla Favoritos" . mysqli_error($c);
};

//insertar un admin en la tabla de usuarios
if (mysqli_query(
    $c,
    "INSERT INTO Usuarios (email, nombre, apellidos, contraseña, direccion, cod_postal, saldo) VALUES ('admin@gmail.com', 'admin', 'admin', '1234', 'admin', 00000, 0)"
)) {
    echo "Admin creado correctamente";
} else {
    echo "No se ha podido crear el admin" . mysqli_error($c);
};


header("Location: ../index.html");
