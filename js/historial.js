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


        console.log("localhost/aproyecto/php/historialP.php?email=" + email);
        let response = await fetch("https://booksell.store/php/historialP.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        var enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        

        console.log("localhost/aproyecto/php/historialP2.php?email=" + email);
        let response2 = await fetch("https://booksell.store/php/historialP2.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto2 = await response2.json();
        console.log(enTexto2);

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
                 var emailPrestador = enTexto[i].emailPrestador;
                let imagen = enTexto[i].imagen;
                var titulo = enTexto[i].titulo_libro;
                if (titulo.length > 30) {
                    titulo = titulo.substring(0, 30) + "...";


                }
                if (enTexto[i].prestado == "si") {
                    divLibros.innerHTML += `
             <div class="col">            
																<div class="card shadow-sm" >
																
																	<img src="`+ imagen + `" alt="" width="100%" height="225">
																	<div class="card-body">
																		<p class="card-text">`+ titulo + `</p>
                                                                        
                                                                            <p>fecha devolucion: `+ enTexto2[i].fecha_fin + `</p>
																			<button type="button" class="btn btn-danger papelera" id="`+ enTexto[i].id_prestamo + `">Devolver</button>
                                                                            
																		</div>
																	</div>
																</div>
                                                                </div>
                                                               
															
             `;
                } else {
                    divLibros.innerHTML += `
                <div class="col">            
                                                                    <div class="card shadow-sm" >
                                                                    
                                                                        <img src="`+ imagen + `" alt="" width="100%" height="225">
                                                                        <div class="card-body">
                                                                            <p class="card-text">`+ titulo + `</p>

                                                                            <p>fecha devolucion: `+ enTexto2[i].fecha_fin + `</p>
                                                                            <button type="button" class="btn btn-secondary papelera" disabled id="`+ enTexto[i].id_prestamo + `">Devuelto</button>
                                                                                
                                                                                
                                                                            
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    </div>
                                                                   
                                                                
                 `;
                }
            }
        }


        for (let i = 0; i < document.getElementsByClassName("papelera").length; i++) {
            let papelera = document.getElementsByClassName("papelera")[i];
            papelera.addEventListener("click", function () {
                swal({
                    title: "¿Quieres devolverlo?",
                    text: "Devolveras el libro a su dueño!",
                    icon: "warning",
                    dangerMode: true,
                    buttons: true,

                })
                    .then(async (willDelete) => {
                        if (willDelete) {
                            await mandarEmail1(titulo);
                            await mandarEmail2(titulo, emailPrestador);
                            await devolver(enTexto[i].id_prestamo, enTexto2[i].fecha_fin);
                            swal("Se procesara la devolucion!",);
                            // setTimeout(function () { location.reload(); }, 1000);
                        }

                    });

            });
        }


    } catch (error) {
        console.log("error" + error);
    }
}

async function devolver(id,fechafin) {

    try {

        let response = await fetch("https://booksell.store/php/devolver.php?id=" + id + "&fechafin=" + fechafin, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });


        let enTexto = await response.json();
        console.log(enTexto);
    } catch (error) {
        console.log("error" + error);
    }
}

async function datosLibrosComprados() {//mostrar libros de prestamos
    try {


        console.log("localhost/aproyecto/php/historialV.php?email=" + email);
        let response = await fetch("https://booksell.store/php/historialV.php?email=" + email, {
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
																		
																			
																		</div>
																	</div>
																</div>
                                                                </div>
                                                               
															
            `;
            }
        }




    } catch (error) {
        console.log("error" + error);
    }
}

async function mandarEmail1(tit) {

    try {

       
        
        tit = tit.replaceAll(" ", "+");

        console.log("https://booksell.store/php/correos/correod1.php?email=" + email + "&titulo=" + tit);
        let response2 = await fetch("https://booksell.store/php/correos/correod1.php?email=" + email + "&titulo=" + tit, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });
        enTexto = await response2.text();


    } catch (error) {
        console.log("error" + error);
    }



}
async function mandarEmail2(tit,ema) {

    try {

       
        
        tit = tit.replaceAll(" ", "+");

        console.log("https://booksell.store/php/correos/correod2.php?email=" + ema + "&titulo=" + tit);
        let response2 = await fetch("https://booksell.store/php/correos/correod2.php?email=" + ema + "&titulo=" + tit, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });
        enTexto = await response2.text();


    } catch (error) {
        console.log("error" + error);
    }



}

window.addEventListener("load", function (event) {
    datosLibrosComprados();
    datosPersonales();
    datosLibrosPrestar();

});