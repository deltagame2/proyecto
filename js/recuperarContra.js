
async function mandarEmail(numero) {

    try {

        let email = document.getElementById("email").value;




        console.log("https://booksell.store/php/correos/correoRecu.php?email=" + email + "&numero=" + numero);
        let response2 = await fetch("https://booksell.store/php/correos/correoRecu.php?email=" + email + "&numero=" + numero, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });
        enTexto = await response2.text();


    } catch (error) {
        console.log("error" + error);
    }



} 
function comprobarNumero(numero, numero2) {
    if (numero == numero2) {
        return true;
    } else {
        return false;
    }
}

async function cambiarContra() {
    swal("Contraseña cambiada", " ", "success");
    let nueva = document.getElementById("nueva").value;
    let email = document.getElementById("email").value;
    console.log("https://booksell.store/php/correos/recuperarContra.php?email=" + email + "&nueva=" + nueva);
    let response2 = await fetch("https://booksell.store/php/recuperarContra.php?email=" + email + "&nueva=" + nueva, {
        method: "GET",
        headers: { "Content-type": "application/json" }
    });
    enTexto = await response2.text();
    divNumero.innerHTML = `<label for='nueva' class='col-form-label' > Contraseña cambiada correctamente</label >
                    <div class='col-sm-10'>
                        <input type='button' class='btn btn-primary' id='nueva' value="Volver a inicio">
                    </div >
                    <br>
                 `;

    let botonInicio = document.getElementById("nueva");
    botonInicio.addEventListener("click", function (event) {
        window.location.href = "index.html";
    }
    );
}
window.addEventListener("load", function (event) {
    var numero = Math.floor(Math.random() * (9999 - 1000)) + 1000;



    let boton = document.getElementById("mandarEmail");
    boton.addEventListener("click", function (event) {
        mandarEmail(numero);
        boton.classList.add("d-none");

        let divPrin = document.getElementById("divPrin");
        //nuevo div
        let divNumero = document.getElementById("divNumero");
        divNumero.innerHTML = `<label for='nueva' class='col-form-label' > Introduce el número</label >
            <div class='col-sm-10'>
             <input type='text' class='form - control' id='numeroIntro' >
             </div > 
             <br>
             <div class="form-group row">
                                    <div class="col-sm-10">
                                        <input type="button" class="btn btn-primary" value="Comprobar número" id="ComprobarNumero">
                                    </div>
                                </div>
             `;
        let botonComprobar = document.getElementById("ComprobarNumero");
        botonComprobar.addEventListener("click", function (event) {
            let numeroIntro = document.getElementById("numeroIntro").value;
            if (comprobarNumero(numero, numeroIntro)) {
                swal("El número introducido es correcto", " ", "success");
                divNumero.innerHTML = `<label for='nueva' class='col-form-label' > Introduce la nueva contraseña</label >
                <div class='col-sm-10'>
                    <input type='text' class='form - control' id='nueva' >
                </div >
                <br>
                <div class="form-group row">
                                    <div class="col-sm-10">
                                        <input type="button" class="btn btn-primary" value="Cambiar contraseña" id="cambiarContra">
                                    </div>
                                </div>
                 `;
                let botonCambiar = document.getElementById("cambiarContra");
                botonCambiar.addEventListener("click", async function (event) {
                    cambiarContra();


                });


            } else {
                swal("El número introducido es incorrecto", " ", "error");
                divNumero.innerHTML = `<label for='nueva' class='col-form-label' > Número incorrecto</label >
                    <div class='col-sm-10'>
                        <input type='button' class='btn btn-primary' id='nueva' value="Volver a intentarlo">
                    </div >
                    <br>
                 `;

                let botonInicio = document.getElementById("nueva");
                botonInicio.addEventListener("click", function (event) {
                    window.location.href = "recuperarContra.html";
                }
                );
            }

        });
    });
});
