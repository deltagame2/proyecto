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
$saldo=$_GET['saldo'];
$email=$_GET['email'];
$arr=array();
$consulta = "SELECT * FROM usuarios WHERE email='$email'";
$resultado = mysqli_query($c, $consulta);
$filas = mysqli_num_rows($resultado);
if ($filas) {
    $row = mysqli_fetch_array($resultado);
    $saldo=$saldo+$row['saldo'];
    $update =$c->query("UPDATE usuarios SET saldo='$saldo' WHERE email='$email'") or die ("Error al actualizar datos");
    if($update){
        
            
            $arr = "Saldo actualizado correctamente";
            $arr=1;
        
        
    }else{
        
            $arr['resultado'] = "Error al actualizar el saldo";
            $arr=2;
           
        
    }
} else {
    
         $arr['resultado'] = "el email es incorrecto o el usuario no existe";
         $arr=3;
       
    
}

//indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($arr);
mysqli_close($c);