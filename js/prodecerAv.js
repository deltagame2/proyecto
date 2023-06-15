
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
        var saldo = document.getElementById("saldo");

        emailP.value = enTexto[0].email;
        nombre.value = enTexto[0].nombre;
        apellidos.value = enTexto[0].apellidos;
        codPostal.value = enTexto[0].cod_postal;
        direccion.value = enTexto[0].direccion;
        saldo.innerHTML = enTexto[0].saldo + "€";

        let saldoo = document.getElementById("saldoo");
        saldoo.value = enTexto[0].saldo;


    } catch (error) {
        console.log("error" + error);
    }
}

if (window.sessionStorage.getItem("idventa") == null) {
    window.location.replace("index.html");
} else {
    var idventa = window.sessionStorage.getItem("idventa");
    console.log(idventa);
}

async function datosLibrosComprar() {
    try {
        console.log("localhost/aproyecto/php/consultarLibroV.php?idventa=" + idventa);
        let response = await fetch("https://booksell.store/php/consultarLibroV.php?idventa=" + idventa, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        let titulo = enTexto[0].titulo_libro;
        let foto = enTexto[0].imagen;
        let precio = enTexto[0].precio;
        let vendedor = enTexto[0].emailVendedor;

        let imagen = document.getElementById("imagenLibro");
        imagen.src = foto;
        let tituloLibro = document.getElementById("nombreLibro");
        tituloLibro.innerHTML = titulo;
        let precioLibro = document.getElementById("precioLibro");
        precioLibro.innerHTML = (parseInt(precio) + 4) + "€";

        let preciolibroO = document.getElementById("precioLibroO");
        preciolibroO.value = precio;
        let vededorO = document.getElementById("vendedor");
        vededorO.value = vendedor;







    } catch (error) {
        console.log("error" + error);
    }
}

async function realizarVenta(saldo, precio) {

    try {

        saldo -= precio + 4;



        let response2 = await fetch("https://booksell.store/php/vender.php?id_venta=" + idventa + "&emailComprador=" + email + "&saldo=" + saldo, {
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

        console.log("https://booksell.store/php/correos/correov1.php?email=" + email + "&titulo=" + tituloL);
        let response2 = await fetch("https://booksell.store/php/correos/correov1.php?email=" + email + "&titulo=" + tituloL, {
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

        let emailVendedor1 = document.getElementById("vendedor").value;
        let tituloL = document.getElementById("nombreLibro").textContent;
        tituloL = tituloL.replaceAll(" ", "+");

        console.log("https://booksell.store/php/correos/correov2.php?email=" + emailVendedor1 + "&titulo=" + tituloL);
        let response2 = await fetch("https://booksell.store/php/correos/correov2.php?email=" + emailVendedor1 + "&titulo=" + tituloL, {
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
    datosLibrosComprar();

    let botonFinal = document.getElementById("botonFinal");
    botonFinal.addEventListener("click", async function (event) {
        //quitarle el ultimo carazter al precio
        let saldo1 = document.getElementById("saldoo").value;
        let precioLibro1 = document.getElementById("precioLibroO").value;
        if (parseInt(saldo1) < parseInt(precioLibro1)) {
            swal("no tienes suficiente saldo", " ", "error");
        } else {

            validateCountry();
            validatecodPostal();
            validateDireccion();
            validateApellidos();
            validateNombre();
            validateEmail();



            if (validateCountry() && validatecodPostal() && validateDireccion() && validateEmail() && validateApellidos() && validateNombre() && checkbox()) {

                mandarEmail1();
                mandarEmail2();
                await realizarVenta(parseInt(saldo1), parseInt(precioLibro1));
                let body = document.getElementById("body");
                body.innerHTML = "";
                body.innerHTML = "<h1>¡Enhorabuena!</h1><p>Ya puedes disfrutar de tu libro</p><a href='index.html'>Volver a la página principal</a>";

            } else {
                swal("Rellena todos los datos obligatorios", "Gracias", "error");
            }
        }
    });
});