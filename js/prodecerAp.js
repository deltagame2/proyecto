
if (window.sessionStorage.getItem("email") == null) {
    window.location.replace("inicioSesion.html");
} else if (window.sessionStorage.getItem("email") == 'admin@gmail.com') {
    window.location.replace("admin.html");
} else {
    var email = window.sessionStorage.getItem("email");
}

function checkbox() {
    let check = document.getElementById("same");
    if (check.checked == false) {
        check.style.border = "1px solid red";
        return false;
    } else {
        check.style.border = "1px solid green";
        return true;
    }
}

function validateCountry() {
    let country = document.getElementById("country");
    if (country.value == "") {
        country.style.border = "1px solid red";
        return false;
    } else {
        country.style.border = "1px solid green";
        return true;
    }
}
function validatecodPostal() {
    let codPostal = document.getElementById("codPostal");
    if (codPostal.value == "") {
        codPostal.style.border = "1px solid red";
        return false;
    } else {
        codPostal.style.border = "1px solid green";
        return true;
    }
}

function validateDireccion() {
    let direccion = document.getElementById("direccion");
    if (direccion.value == "") {
        direccion.style.border = "1px solid red";
        return false;
    } else {
        direccion.style.border = "1px solid green";
        return true;
    }
}

function validateNombre() {
    let nombre = document.getElementById("nombre");
    if (nombre.value == "") {
        nombre.style.border = "1px solid red";
        return false;
    } else {
        nombre.style.border = "1px solid green";

        return true;

    }
}

function validateApellidos() {
    let apellidos = document.getElementById("apellidos");
    if (apellidos.value == "") {
        apellidos.style.border = "1px solid red";
        return false;
    } else {
        apellidos.style.border = "1px solid green";
        return true;
    }

}

function validateEmail() {
    let email = document.getElementById("email");
    if (email.value == "") {
        email.style.border = "1px solid red";
        return false;
    } else {
        email.style.border = "1px solid green";
        return true;
    }
}

async function datosPersonales() {
    try {


        console.log("localhost/aproyecto/php/perfil.php?email=" + email);
        let response = await fetch("https://booksell.store/php/perfil.php?email=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);


        let nombre = document.getElementById("nombre");
        let apellidos = document.getElementById("apellidos");
        let codPostal = document.getElementById("codPostal");
        let direccion = document.getElementById("direccion");
        let emailP = document.getElementById("email");

        let saldoo = document.getElementById("saldoo");
        saldoo.value = enTexto[0].saldo;

        emailP.value = enTexto[0].email;
        nombre.value = enTexto[0].nombre;
        apellidos.value = enTexto[0].apellidos;
        codPostal.value = enTexto[0].cod_postal;
        direccion.value = enTexto[0].direccion;




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

if (window.sessionStorage.getItem("idPrestamo") == null) {
    window.location.replace("index.html");
} else {
    var idPrestamo = window.sessionStorage.getItem("idPrestamo");
    console.log(idPrestamo);
}

async function datosLibrosPrestar() {
    try {
        console.log("localhost/aproyecto/php/consultarLibroP.php?idPrestamo=" + idPrestamo);
        let response = await fetch("https://booksell.store/php/consultarLibroP.php?idPrestamo=" + idPrestamo, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        let titulo = enTexto[0].titulo_libro;
        var emailPrestador = enTexto[0].emailPrestador;
        let foto = enTexto[0].imagen;

        let imagen = document.getElementById("imagenLibro");
        imagen.src = foto;
        let tituloLibro = document.getElementById("nombreLibro");
        tituloLibro.innerHTML = titulo;
        let emailPrestador1 = document.getElementById("emailPrestador");
        emailPrestador1.value = emailPrestador;



    } catch (error) {
        console.log("error" + error);
    }
}

async function crearPrestamo() {

    try {




        console.log("https://booksell.store/php/prestar.php?id_prestamo=" + idPrestamo + "&emailPrestado=" + email);
        let response2 = await fetch("https://booksell.store/php/prestar.php?id_prestamo=" + idPrestamo + "&emailPrestado=" + email, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto2 = await response2.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto2);

    } catch (error) {
        console.log("error" + error);
    }



}
async function mandarEmail1() {

    try {

        let nombre1 = document.getElementById("nombre");
        let tituloL = document.getElementById("nombreLibro").textContent;
        tituloL = tituloL.replaceAll(" ", "+");

        console.log("https://booksell.store/php/correos/correop1.php?email=" + email + "&titulo=" + tituloL);
        let response2 = await fetch("https://booksell.store/php/correos/correop1.php?email=" + email + "&titulo=" + tituloL, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });
        enTexto = await response2.text();


    } catch (error) {
        console.log("error" + error);
    }



}
async function mandarEmail2() {

    try {


        let tituloL = document.getElementById("nombreLibro").textContent;
        tituloL = tituloL.replaceAll(" ", "+");

        console.log("https://booksell.store/php/correos/correop2.php?email=" + emailPrestador.value + "&titulo=" + tituloL);
        let response2 = await fetch("https://booksell.store/php/correos/correop2.php?email=" + emailPrestador.value + "&titulo=" + tituloL, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });
        enTexto = await response2.text();


    } catch (error) {
        console.log("error" + error);
    }



}

window.addEventListener("load", function (event) {
    datosPersonales();
    datosLibrosPrestar();

    let botonFinal = document.getElementById("botonFinal");
    botonFinal.addEventListener("click", async function (event) {

        let saldo1 = document.getElementById("saldoo").value;

        if (parseInt(saldo1) < 4) {
            swal("No tienes suficiente saldo", "Recarga tu saldo", "error")
        } else {
            validateCountry();
            validatecodPostal();
            validateDireccion();
            validateApellidos();
            validateNombre();
            validateEmail();
            checkbox();

            if (validateCountry() && validatecodPostal() && validateDireccion() && validateEmail() && validateApellidos() && validateNombre() && checkbox()) {

                crearPrestamo();
                Actualizar();
                await mandarEmail1();
                await mandarEmail2();
                let body = document.getElementById("body");
                body.innerHTML = "";
                body.innerHTML = "<h1>¡Enhorabuena!</h1><p>Ya puedes disfrutar de tu libro</p><a href='index.html'>Volver a la página principal</a>";
            } else {
                swal("Rellena todos los datos obligatorios", "Gracias", "error");
            }
        }
    });
});