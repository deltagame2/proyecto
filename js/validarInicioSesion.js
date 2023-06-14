async function iniciarSesion() {

    try {

        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("contraseña").value;



        console.log(email);
        console.log("https://booksell.store/php/inicioSesion.php?email=" + email + "&contra=" + password);
        let response = await fetch("https://booksell.store/php/inicioSesion.php?email=" + email + "&contra=" + password, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        enTexto = await response.text();
        console.log(enTexto);

        if (enTexto == 1) {
            if (window.sessionStorage.getItem("idPrestamo") != null) {
                window.sessionStorage.setItem("email", email);
                location.href = "https://booksell.store/visionAp.html";
            } else if (window.sessionStorage.getItem("idventa") != null) {
                window.sessionStorage.setItem("email", email);
                location.href = "https://booksell.store/visionAv.html";
            } else {
                swal("Bienvenido", " ", "success");
                window.sessionStorage.setItem("email", email);
                location.href = "https://booksell.store/index.html";
            }
        } else {
            swal("Email o contraseña  incorrecta", " ", "error");
        }




    } catch (error) {
        console.log("error" + error);
    }



}

window.addEventListener("load", function (event) {
    let email = document.getElementById("inputEmail");
    let password = document.getElementById("contraseña");


    function validarEmail() {
        let er = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
        if (er.test(email.value)) {
            email.classList.remove("error");
            return true;
        }
        else {
            email.classList.add("error");
            return false;
        }
    }

    function validarPassword() {
        let er = /^[a-zA-Z0-9]{4,20}$/;
        if (er.test(password.value)) {
            password.classList.remove("error");
            return true;
        }
        else {
            password.classList.add("error");
            return false;
        }
    }

    let btn = document.getElementById("btn");
    btn.addEventListener("click", function (event) {
        let e = true;
        if (!validarEmail()) {
            e = false;
        }
        let p = true;
        if (!validarPassword()) {
            p = false;
        }
        console.log(e + " " + p);
        if (e || p) {
            iniciarSesion();

        }

    });

});