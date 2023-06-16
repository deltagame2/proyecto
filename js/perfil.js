
if (window.sessionStorage.getItem("email") == null) {
    window.location.replace("inicioSesion.html");
} else if (window.sessionStorage.getItem("email") == 'admin@gmail.com') {
    window.location.replace("admin.html");
} else {
    var email = window.sessionStorage.getItem("email");
}


async function datosPersonales() {//mostrar datos personales del usuario
    try {


        console.log("localhost/aproyecto/php/perfil.php?email=" + email);
        let response = await fetch("https://booksell.store/php/perfil.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);

        let nomFoto = document.getElementById("nomFoto");
        let apeFoto = document.getElementById("apeFoto");
        let emailFoto = document.getElementById("emailFoto");
        nomFoto.innerHTML = enTexto[0].nombre;
        apeFoto.innerHTML = enTexto[0].apellidos;
        emailFoto.innerHTML = enTexto[0].email;

        let saldo = document.getElementById("saldo");
        let nombre = document.getElementById("nombre");
        let apellidos = document.getElementById("apellidos");
        let codPostal = document.getElementById("codPostal");
        let direccion = document.getElementById("direccion");

        saldo.value = enTexto[0].saldo;
        nombre.value = enTexto[0].nombre;
        apellidos.value = enTexto[0].apellidos;
        codPostal.value = enTexto[0].cod_postal;
        direccion.value = enTexto[0].direccion;




    } catch (error) {
        console.log("error" + error);
    }
}

async function datosLibrosPrestar() {//mostrar libros de prestamos
    try {


        console.log("localhost/aproyecto/php/librosPerfilPrestar.php?email=" + email);
        let response = await fetch("https://booksell.store/php/librosPerfilPrestar.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        let divLibros = document.getElementById("divLibros");
        if (enTexto.length == 0) {
            divLibros.textContent = "";
            divLibros.innerHTML = `
                     
                                                                
                                                                
                                                                  
                                                                    <div class="card-body">
                                                                        <p class="card-text" color="grey">No tienes libros subidos
                                                                            </p>
                                                                        
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" s class="bi bi-trash3-fill" viewBox="0 0 16 16" >`;

        } else {
            divLibros.textContent = "";




            for (let i = 0; i < enTexto.length; i++) {
                let imagen = enTexto[i].imagen;
                let titulo = enTexto[i].titulo_libro;
                if (titulo.length > 30) {
                    titulo = titulo.substring(0, 30) + "...";


                }
                divLibros.innerHTML += `
            <div class="col">            
																<div class="card shadow-sm" >
																
																	<img src="`+ imagen + `" alt="" width="100%" height="225">
																	<div class="card-body">
																		<p class="card-text">`+ titulo + `
																			</p>
																		
																			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" s class="bi bi-trash3-fill papelera" viewBox="0 0 16 16" >
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg>
																		</div>
																	</div>
																</div>
                                                                </div>
                                                               
															
            `;
            }
        }


        for (let i = 0; i < document.getElementsByClassName("papelera").length; i++) {
            let papelera = document.getElementsByClassName("papelera")[i];
            papelera.addEventListener("click", function () {
                swal({
                    title: "¿Estás seguro?",
                    text: "Borraras el libro y no estará disponible!",
                    icon: "warning",
                    dangerMode: true,
                    buttons: true,
                   
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        eliminarLibroP(enTexto[i].id_prestamo);
                        swal("El libro ha sido borrado!", );
                      setTimeout(function(){ location.reload(); }, 1000);
                    }
                     
                  });
                  
            });
            
        }



    } catch (error) {
        console.log("error" + error);
    }
}

async function datosLibrosVender() {//mostrar libros de venta
    try {



        let response = await fetch("https://booksell.store/php/librosPerfilVender.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        let divLibros1 = document.getElementById("divLibrosVenta");
        if (enTexto.length == 0) {
            divLibros1.textContent = "";
            divLibros1.innerHTML = `
                     
                                                                
                                                                
                                                                  
                                                                    <div class="card-body">
                                                                        <p class="card-text" color="grey">No tienes libros subidos
                                                                            </p>
                                                                        
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" s class="bi bi-trash3-fill" viewBox="0 0 16 16" >`;

        } else {
            divLibros1.textContent = "";




            for (let i = 0; i < enTexto.length; i++) {
                let imagen = enTexto[i].imagen;
                let titulo = enTexto[i].titulo_libro;
                let precio = enTexto[i].precio;
                divLibros1.innerHTML += `
            <div class="col">            
																<div class="card shadow-sm" >
																
																	<img src="`+ imagen + `" alt="" width="100%" height="225">
																	<div class="card-body">
																		<p class="card-text">`+ titulo + `
																			</p>
                                                                            <p>`+ precio + `€<p>
																			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" s class="bi bi-trash3-fill papelera2" viewBox="0 0 16 16" >
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg>

																		</div>
																	</div>
																</div>
                                                                </div>
                                                               
															
            `;
            }
        }

        
        for (let i = 0; i < document.getElementsByClassName("papelera2").length; i++) {
            let papelera2 = document.getElementsByClassName("papelera2")[i];
            papelera2.addEventListener("click", function () {
                swal({
                    title: "¿Estás seguro?",
                    text: "Borraras el libro y no estará disponible!",
                    icon: "warning",
                    dangerMode: true,
                    buttons: true,
                   
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        eliminarLibroV(enTexto[i].id_venta);
                        swal("El libro ha sido borrado!", );
                      setTimeout(function(){ location.reload(); }, 1000);
                    }
                     
                  });
                  
            });
            
        }


    } catch (error) {
        console.log("error" + error);
    }
}

async function Actualizar() {//actualizar datos del perfil
    try {
        let nombre = document.getElementById("nombre").value;
        let apellidos = document.getElementById("apellidos").value;
        let direccion = document.getElementById("direccion").value;
        let cod_postal = document.getElementById("codPostal").value;

        apellidos = apellidos.replaceAll(" ", "+");
        nombre = nombre.replaceAll(" ", "+");
        direccion = direccion.replaceAll(" ", "+");

        
        console.log("https://booksell.store/php/actualizarPerfil.php?email=" + email + "&nombre=" + nombre + "&apellidos=" + apellidos + "&direccion=" + direccion + "codPostal=" + cod_postal);
        let response = await fetch("https://booksell.store/php/actualizarPerfil.php?email=" + email + "&nombre=" + nombre + "&apellidos=" + apellidos + "&codPostal=" + cod_postal + "&direccion=" + direccion, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto + "hola");
        

    } catch (error) {
        console.log("error" + error);
    }
}

async function eliminarLibroP(id) {//eliminar libro de prestamo
    try {
        let response = await fetch("https://booksell.store/php/eliminarLibroP.php?id=" + id, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto + "hola");
      
        
       
    } catch (error) {
        console.log("error" + error);
    }
}
async function eliminarLibroV(id) {//eliminar libro de prestamo
    try {
        let response = await fetch("https://booksell.store/php/eliminarLibroV.php?id=" + id, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto + "hola");
      
        
       
    } catch (error) {
        console.log("error" + error);
    }
}

window.addEventListener("load", function (event) {
    datosPersonales();
    datosLibrosPrestar();
    datosLibrosVender();
    let cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.addEventListener("click", function () {
        window.sessionStorage.clear("email");
        window.location.replace("inicioSesion.html");
    });

    let btnActualizar = document.getElementById("btnActualizar");
    btnActualizar.addEventListener("click", function () {
        Actualizar();
        swal ( "¡Cambios realizados! " , " ¡Has cambiado los datos! " , "success" )   ;

    });

   

});