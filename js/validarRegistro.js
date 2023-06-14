
var captcha = false;
        
        function captchaValido() {
            captcha = true;
        }
window.addEventListener("load", function (event) {
    let email = document.getElementById("inputRegistro");
    let nombre = document.getElementById("inputRegistro2");
    let apellido = document.getElementById("inputRegistro3");
    let password = document.getElementById("inputRegistro4");
    let checkbox = document.getElementById("gridCheck1");



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

    function validarNombre() {

        if ((nombre.value != "")) {
            nombre.classList.remove("error");
            return true;
        }
        else {
            nombre.classList.add("error");
            return false;
        }
    }

    function validarApellido() {

        if (apellido.value != "") {
            apellido.classList.remove("error");
            return true;
        }
        else {
            apellido.classList.add("error");
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

    function validarCheckbox() {
        if (checkbox.checked) {
            checkbox.classList.remove("error");
            return true;
        }
        else {
            checkbox.classList.add("error");
            return false;
        }
    }

    async function registrarUsuario() {

        try {

            let email = document.getElementById("inputRegistro").value;
            let nombre = document.getElementById("inputRegistro2").value;
            let apellido = document.getElementById("inputRegistro3").value;
            let password = document.getElementById("inputRegistro4").value;
            



            let response = await fetch("https://booksell.store/php/registro.php?email=" +email+"&nombre="+nombre+"&apellidos="+apellido+"&contra="+password, {
                method: "GET",
                headers: { "Content-type": "application/json" }
            });

            window.sessionStorage.setItem("email", email);
            await mandarEmail();
            location.href = "https://booksell.store/index.html";


        } catch (error) {
            console.log("error" + error);
        }



    }

    async function mandarEmail() {

        try {

            let email = document.getElementById("inputRegistro").value;
            let nombre = document.getElementById("inputRegistro2").value;


            console.log("https://booksell.store/php/correos/CorreoBienve.php?email="+email+"&nombre="+nombre);
            let response2 = await fetch("https://booksell.store/php/correos/CorreoBienve.php?email="+email+"&nombre="+nombre, {
                method: "GET",
                headers: { "Content-type": "application/json" }
            });
            enTexto = await response2.text();


        } catch (error) {
            console.log("error" + error);
        }



    }



    let btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.addEventListener("click", (ev) => {
        let e = true;
        let n = true;
        let a = true;
        let p = true;
        let c = true;

        if (!validarEmail()) {
            e = false;
        }

        if (!validarNombre()) {
            n = false;
        }

        if (!validarApellido()) {
            a = false;
        }

        if (!validarPassword()) {
            p = false;
        }

        if (!validarCheckbox()) {
            c = false;
        }

        if (e && n && a && p && c && captcha) {

          
            registrarUsuario();
            
        }

    });

});