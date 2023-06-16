async function cambiar() {
    var email = window.sessionStorage.getItem("email");
    let  actual = document.getElementById("actual").value;
    let nueva=document.getElementById("nueva").value;
    try {
        // console.log( "https://booksell.store/php/cambioContra.php?nueva=" + nueva + "&email="+email+"&actual="+actual)
        let response = await fetch("https://booksell.store/php/cambioContra.php?nueva=" + nueva + "&email="+email+"&actual="+actual,  {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        if(enTexto==1){
            swal("Contraseña cambiada", " ", "success");
        }else if(enTexto==2){
            swal("Error al actualizar la contraseña", " ", "error");
        }else if(enTexto==3){
            swal("La contraseña actual no coincide", " ", "error");
        }else if(enTexto==4){
            swal("el email es incorrecto o el usuario no existe", " ", "error");
        }


      
        
       
    } catch (error) {
        console.log("error" + error);
    }
}


function comprobarActual(){
    var actual = document.getElementById("actual");
    
    let er = /^[a-zA-Z0-9]{4,20}$/;
    if (er.test(actual.value)) {
        actual.classList.remove("error");
        return true;
    }
    else {
        actual.classList.add("error");
        return false;
    }
    
}

function comprobarNueva(){
    var nueva = document.getElementById("nueva");
    
   
        let er = /^[a-zA-Z0-9]{4,20}$/;
        if (er.test(nueva.value)) {
            nueva.classList.remove("error");
            return true;
        }
        else {
            nueva.classList.add("error");
            return false;
        }
    
     
    
}

async function datosPersonales() {//mostrar datos personales del usuario
    try {
        var email = window.sessionStorage.getItem("email");


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

window.addEventListener("load", function (event) {
    datosPersonales();
 
    var email = window.sessionStorage.getItem("email");
    let emailo=document.getElementById("emailo")
    emailo.value=email;
    let btn = document.getElementById("submit");
   
 
    btn.addEventListener("click", function (event) {
        if(comprobarActual() && comprobarNueva()){
            cambiar();
            document.getElementById("actual").value="";
            document.getElementById("nueva").value="";
        }
       
    });
});
