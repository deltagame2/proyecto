if (window.sessionStorage.getItem("email") == null) {
    window.location.replace("inicioSesion.html");
} else if (window.sessionStorage.getItem("email") == 'admin@gmail.com') {
    window.location.replace("admin.html");
} else {
    var email = window.sessionStorage.getItem("email");
}

async function datosPersonales() { //mostar datos personales
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
        
    } catch (error) {
        console.log("error" + error);
    }
}
async function datosLibrosPrestar() {//mostrar libros de prestamos
    try {


        console.log("localhost/aproyecto/php/favoritosMostrarp.php?email=" + email);
        let response = await fetch("https://booksell.store/php/favoritosMostrarp.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        let divLibros = document.getElementById("divLibrosp");
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
                let idPrestamo = enTexto[i].id_prestamo;
                if (titulo.length > 20) {
                    titulo = titulo.substring(0, 20) + "...";

                    
                }
                divLibros.innerHTML += `
            <div class="col">            
																<div class="card shadow-sm" >
																
																	<img src="`+ imagen + `" alt="" width="100%" height="225" class="blur">
																	<div class="card-body">
                                                                    <input type="hidden" id="`+ i + `" value="` + idPrestamo + `">
                                                                    <input type="hidden" class="email" value="`+ email + `">
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
        for (let i = 0; i < document.getElementsByClassName("blur").length; i++) {
            let todo = document.getElementsByClassName("blur")[i];
            todo.addEventListener("click", function () {
                let idPrestamo = document.getElementById(i).value;
                window.sessionStorage.setItem("idPrestamo", idPrestamo);
                window.location.href = "https://booksell.store/visionAp.html";

            });
        }

        for (let i = 0; i < document.getElementsByClassName("papelera").length; i++) {
            let papelera = document.getElementsByClassName("papelera")[i];
            papelera.addEventListener("click", function () {
                swal({
                    title: "¿Estas seguro?",
                    text: "Eliminaras el libro de favoritos!",
                    icon: "warning",
                    dangerMode: true,
                    buttons: true,
                   
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        eliminarLibroF(enTexto[i].id_prestamo);
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
async function datosLibrosComprar() {//mostrar libros de prestamos
    try {


        console.log("localhost/aproyecto/php/favoritosMostrarp.php?email=" + email);
        let response = await fetch("https://booksell.store/php/favoritosMostrarv.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        let divLibros = document.getElementById("divLibrosv");
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
                let idventa = enTexto[i].idventa;
                if (titulo.length > 20) {
                    titulo = titulo.substring(0, 20) + "...";

                    
                }
                divLibros.innerHTML += `
            <div class="col">            
																<div class="card shadow-sm" >
																
																	<img src="`+ imagen + `" alt="" width="100%" height="225" class="blur">
																	<div class="card-body">
                                                                    <input type="hidden" id="`+ i + `" value="` + idventa + `">
                                                                    <input type="hidden" class="email" value="`+ email + `">
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
        
        for (let i = 0; i < document.getElementsByClassName("blur").length; i++) {
            let todo = document.getElementsByClassName("blur")[i];
            todo.addEventListener("click", function () {
              let idventa = document.getElementById(i).value;
              window.sessionStorage.setItem("idventa", idventa);
              window.location.href = "https://booksell.store/visionAv.html";
      
            });
          }

        for (let i = 0; i < document.getElementsByClassName("papelera").length; i++) {
            let papelera = document.getElementsByClassName("papelera")[i];
            papelera.addEventListener("click", function () {
                swal({
                    title: "¿Estas seguro?",
                    text: "Eliminaras el libro de favoritos!",
                    icon: "warning",
                    dangerMode: true,
                    buttons: true,
                   
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        eliminarLibroF(enTexto[i].id_prestamo);
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

async function eliminarLibroF(id) {//eliminar libro de favoritos
    try {
        let response = await fetch("https://booksell.store/php/eliminarLibroFavoritos.php?id=" + id + "&email="+email,  {
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
    datosLibrosPrestar();
    datosPersonales();
    datosLibrosComprar();
  });