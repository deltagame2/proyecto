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


$nueva=$_GET['nueva'];

$email=$_GET['email'];
$arr=array();


  
    
        $nueva=password_hash($nueva, PASSWORD_DEFAULT);
        $update =$c->query("UPDATE usuarios SET contraseña='$nueva' WHERE email='$email'") or die ("Error al actualizar datos");
        if($update){
            
                
                $arr = "Contraseña actualizada correctamente";
                $arr=1;
            
            
        }else{
            
                $arr['resultado'] = "Error al actualizar la contraseña";
                $arr=2;
               
            
        }
   
//indico que sera un JSON con UTF-8
header("Content-type: application/json; charset=utf-8");
//muestro por pantalla
echo json_encode($arr);
mysqli_close($c);