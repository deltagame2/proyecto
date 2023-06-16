

<?php

session_start();


                            $paso = $_GET['email'];
                            if ($paso != "") {
                                
                                $asunto = $_GET['asunto'];
                                $mensaje = $_GET['mensaje'];
                                $_SESSION['email'] = $_GET['email'];
                                $root="https://booksell.store";
                                 header("Refresh:0; url=".$root."/CorreoContacto.php?asunto=".$asunto."&mensaje=".$mensaje);
                                // header("Location: https://booksell.store/CorreoContacto.php?asunto=" . $asunto . "&mensaje=" . $mensaje);
                            }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/headers.css">
    <link rel="stylesheet" href="./css/estilo.css">
    <script src="./js/perfil.js"></script>
    <script src=" https://unpkg.com/sweetalert/dist/sweetalert.min.js "></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Document</title>
</head>

<body>

    <!-- header -->
    <header class="p-3 mb-3 border-bottom">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="./index.html" class="d-flex align-items-center col-md-4 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img class="bi me-5" width="70" height="62" src="./fotos/logo.png">
                </a>

                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="./index.html" class="nav-link px-2 link-dark">Alquilar</a></li>
                    <li><a href="./venta.html" class="nav-link px-2 link-dark">Compra-venta</a></li>
                    <li><a href="./perfil.html" class="nav-link px-2 link active">Perfil</a></li>
                    <li><a href="#" class="nav-link px-2 link-dark"></a></li>
                </ul>


            </div>
        </div>
    </header>
    <!-- header -->
    <div class="container">
        <div class="main-body">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
                                <div class="mt-3">
                                    <h4 id="nomFoto">John Doe</h4>
                                    <p class="text-secondary mb-1" id="apeFoto">Full Stack Developer</p>
                                    <p class="text-muted font-size-sm" id="emailFoto">Bay Area, San Francisco, CA</p>

                                </div>
                            </div>
                            <hr class="my-4">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><a href="./perfil.html">Perfil</a></h6>

                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><a href="./comentarios.html">Comentarios</a></h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><a href="./favoritos.html">Favoritos</a></h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><a href="./historial.html">Historial</a></h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><a href="./cambiarContra.html">Cambiar contraseña</a></h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><a href="./masSaldo.html">Introducir saldo</a></h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><a href="./contacto.php">Informar de un problema</a></h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><button type="button" class="btn btn-primary" id="cerrarSesion">Cerrar sesion</button></h6>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8 text-center">
                    <h1>Formulario de Contacto</h1>
                    <br>

                    <form action="" method="GET" id="formularioi">

                        <form action="" method="GET" id="formularioi">
                            <label for="email">Email :</label>
                            <input type="email" id="email" name="email"><br><br>

                            <label for="asunto">asunto:</label>
                            <input type="asunto" id="asunto" name="asunto"><br><br>

                            <label for="mensaje">Mensaje:</label>
                            <textarea id="mensaje" name="mensaje" rows="5"></textarea><br><br>

                            <input type="submit" value="Enviar" id="boton" name="boton" class="btn-primary">

                            


                           
                        </form>
                </div>

                <script>
                    var email = document.getElementById("email");
                    var asunto = document.getElementById("asunto");
                    var mensaje = document.getElementById("mensaje");
                    let boton = document.getElementById("boton");

                    function validarEmail() {
                        if (email.value == "") {
                            email.style.borderColor = "red";
                            return false;
                        } else {
                            email.style.borderColor = "green";
                            return true;
                        }
                    }

                    function validarAsunto() {
                        if (asunto.value == "") {
                            asunto.style.borderColor = "red";
                            return false;
                        } else {
                            asunto.style.borderColor = "green";
                            return true;
                        }
                    }

                    function validarMensaje() {
                        if (mensaje.value == "") {
                            mensaje.style.borderColor = "red";
                            return false;
                        } else {
                            mensaje.style.borderColor = "green";
                            return true;
                        }
                    }

                    let form = document.getElementById("formularioi");
                    form.addEventListener("submit", function(event) {
                        event.preventDefault();
                        if (validarEmail() && validarAsunto() && validarMensaje()) {
                            form.submit();
                        } else {
                            swal("Error", "Rellene todos los campos", "error")
                        }
                    });
                </script>

            </div>
        </div>
    </div>
    </div>
    <footer class="footer">
        <div id="fot">
            <span class="">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="text-widget">
                                <div class="wid-title">REDES SOCIALES</div>

                                <ul class="ft-soc clearfix">
                                    <li><a href=""><i class="fa fa-facebook-square">FACEBOOK</i></a></li>
                                    <li><a href=""><i class="fa fa-twitter"></i>TWITTER</a></li>
                                    <li><a href=""><i class="fa fa-instagram"></i>INSTAGRAM</a></li>
                                    <li><a href=""><i class="fa fa-pinterest"></i>PINTEREST</a></li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="quick-links">
                                <div class="wid-title">LINKS DE PAGINA</div>
                                <ul>
                                    <li><a href="index.html">INICIO</a></li>
                                    <li><a href="./venta.html">VENTA</a></li>
                                    <li><a href="./perfil.html">PERFIL</a></li>



                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="term">
                                <div class="wid-title">POLITICAS</div>
                                <ul>
                                    <li> <a href="index.html">Tarifas y politicas de envios</a></li>
                                    <li> <a href="./index.html">Politica devoluciones</a></li>
                                    <li> <a href="./terminos.html">Terminos & condiciones</a></li>
                                    <li> <a href="./cookies.html">Politica cookies</a></li>
                                    <li> <a href="privacidad.html">Politica privacidad</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="quick-links">
                                <div class="wid-title">SOBRE TI</div>

                                <ul>
                                    <li><a href="#">MI CUENTA</a></li>
                                    <li><a href="#">INFORMACION PERSONAL</a></li>

                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="subscribe">
                                <div class="wid-title">SUSCRIBETE PARA RECIBIR OFERTAS Y NOVEDADES</div>
                                <p>
                                    Ecribe aqui tu email para recibir ofertas y novedades sobre toda la tienda
                                </p>
                                <form>
                                    <div class="form-group">
                                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="email">
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        </span>
        </div>
    </footer>
    <!-- Footer -->