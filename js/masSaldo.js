function validarNombre(){
    var nombre = document.getElementById("name").value;
    if(nombre==""){
        document.getElementById("name").classList.add("error");
        return false;
    }else{
        document.getElementById("name").classList.remove("error");
        return true;
    }
}
function validarTarjeta(){
    let tarjeta = document.getElementById("number").value;
    if(tarjeta==""){
        document.getElementById("number").classList.add("error");
        return false;
    }else{
        document.getElementById("number").classList.remove("error");
        return true;
    }
}
function validarCaducidad(){
    let caducidad = document.getElementById("expiration").value;
    if(caducidad==""){
        document.getElementById("expiration").classList.add("error");
        return false;
    }else{
        document.getElementById("expiration").classList.remove("error");
        return true;
    }
}
function validarCVC(){
    let cvc = document.getElementById("cvc").value;
    if(cvc==""){
        document.getElementById("cvc").classList.add("error");
        return false;
    }else{
        document.getElementById("cvc").classList.remove("error");
        return true;
    }
}

function validarSaldo(){
    let saldo = document.getElementById("saldo").value;
    if(saldo==""){
        document.getElementById("saldo").classList.add("error");
        return false;
    }else{
        document.getElementById("saldo").classList.remove("error");
        return true;
    }
}
var email = window.sessionStorage.getItem("email");

async function introducirSaldo(saldo) {//eliminar libro de favoritos
    try {
        
        let response = await fetch("https://booksell.store/php/masSaldo.php?saldo=" + saldo + "&email="+email,  {
            method: "GET",
            headers: { "Content-type": "application/json" }
        });

        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);

        if(enTexto==1){
            swal("Saldo introducido correctamente", " ", "success")
          
        }else{
            swal("Error al introducir saldo", " ", "error");
        }
      
        
       
    } catch (error) {
        console.log("error" + error);
    }
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
    let botonFinal=document.getElementById("botonFinal");
    botonFinal.addEventListener("click", function (event) {
        let n=true;
        let t=true;
        let c=true;
        let cv=true;
        let s=true;
        if(validarNombre())n=true; else n=false;
        if(validarTarjeta())t=true; else t=false;
        if(validarCaducidad())c=true; else c=false;
        if(validarCVC())cv=true; else cv=false;
        if(validarSaldo())s=true; else s=false;
        if(n==true && t==true && c==true && cv==true && s==true){
            let saldo = document.getElementById("saldo").value;
            introducirSaldo(saldo);
        }
    });
});