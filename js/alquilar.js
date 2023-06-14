
//esta funcion se ejecuta cuando buscas algun libro, lo que hace es mostrar los libros 
async function llamarLibros(genero) {
  try {

    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let editorial = document.getElementById("editorial").value;
    let emailS = window.sessionStorage.getItem("email");


    console.log("localhost/aproyecto/php/alquilarLibros.php?titulo=" + titulo + "&autor=" + autor + "&editorial=" + editorial + "&genero=" + genero);
    let response = await fetch("https://booksell.store/php/alquilarLibros.php?titulo=" + titulo + "&autor=" + autor + "&editorial=" + editorial + "&genero=" + genero + "&email=" + emailS, {
      method: "GET",
      headers: { "Content-type": "application/json" }
    });

    let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
    console.log(enTexto);


    let divPrincipal = document.getElementById("divPrincipal");
    divPrincipal.textContent = "";
    let divLib = document.createElement("div");
    divLib.classList.add("container");
    let divLibros = document.createElement("div");
    divLibros.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3");

    if(enTexto.length==0){
      divLibros.innerHTML += ` 
      
    
    <div class="card shadow-sm justify-item-center">
      <div class="text-center">   
      <img width="80%" class="blur" height="250" src="./fotos/no-hay-resultados.png"> </div>
        
      </div>
    </div>
  `;
    }


    let totalLibros = enTexto.length;
    let principio = 0;
    let librosPorPagina;
    if (totalLibros > 9) {
       librosPorPagina = 9;
    }else{
       librosPorPagina= enTexto.length;
    }
    
    for (let i = 0; i < librosPorPagina; i++) {
      let tituloLibro = enTexto[i].titulo_libro;
      let autorLibro = enTexto[i].autor_libro;
      let editorialLibro = enTexto[i].editorial_libro;
      let generoLibro = enTexto[i].genero_libro;
      let descripcionLibro = enTexto[i].descripcion_libro;
      let imagenLibro = enTexto[i].imagen;
      let idPrestamo = enTexto[i].id_prestamo;
      let email = enTexto[i].emailPrestador;




      if (enTexto[i].descripcion_libro.length > 80) {
        descripcionLibro = enTexto[i].descripcion_libro.substring(0, 70) + "...";
      } else {
        descripcionLibro = enTexto[i].descripcion_libro;
      }
      divLibros.innerHTML += ` 
      
    <div class="col">
    <div class="card shadow-sm justify-item-center">
      <div class="text-center">   <img width="80%" class="blur" height="250" src="`+ imagenLibro + `"> </div>
        <input type="hidden" id="`+ i + `" value="` + idPrestamo + `">
        <input type="hidden" class="email" value="`+ email + `">
        <input type="hidden" id="titulo" value="`+ tituloLibro + `">
        <div class="card-body">
          <p class="card-header">`+ tituloLibro + `</p>
          <p class="card-text">`+ descripcionLibro + `</p>
          
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary verMas" >Ver mas</button>
            
            </div>
          <div class="divCora"> <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart corazon" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg></div>
          </div>
      </div>
    </div>
  </div>`;






    }
    window.onscroll = function () {

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.6) {
        if ((librosPorPagina + 9) < totalLibros) {
          librosPorPagina += 9;
          principio += 9;
        } else if ((librosPorPagina + 9) > totalLibros) {
          librosPorPagina += totalLibros-librosPorPagina;
          principio += 9 ;
          window.removeEventListener("scroll", this);

        }
        for (let i = principio; i < librosPorPagina; i++) {
          let tituloLibro = enTexto[i].titulo_libro;
          let autorLibro = enTexto[i].autor_libro;
          let editorialLibro = enTexto[i].editorial_libro;
          let generoLibro = enTexto[i].genero_libro;
          let descripcionLibro = enTexto[i].descripcion_libro;
          let imagenLibro = enTexto[i].imagen;
          let idPrestamo = enTexto[i].id_prestamo;
          let email = enTexto[i].emailPrestador;




          if (enTexto[i].descripcion_libro.length > 80) {
            descripcionLibro = enTexto[i].descripcion_libro.substring(0, 70) + "...";
          } else {
            descripcionLibro = enTexto[i].descripcion_libro;
          }
          divLibros.innerHTML += ` 
          
        <div class="col">
        <div class="card shadow-sm justify-item-center">
          <div class="text-center">   <img width="80%" class="blur" height="250" src="`+ imagenLibro + `"> </div>
            <input type="hidden" id="`+ i + `" value="` + idPrestamo + `">
            <input type="hidden" class="email" value="`+ email + `">
            <input type="hidden" id="titulo" value="`+ tituloLibro + `">
            <div class="card-body">
              <p class="card-header">`+ tituloLibro + `</p>
              <p class="card-text">`+ descripcionLibro + `</p>
              
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary verMas" >Ver mas</button>
                
                </div>
              <div class="divCora"> <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart corazon" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg></div>
              </div>
          </div>
        </div>
      </div>`;






        }
      }
      divLibros.innerHTML += "</div>";
    divLibros.innerHTML += "</div>";
    divLibros.innerHTML += "</div>";

    // console.log(divLibros);
    divLib.appendChild(divLibros);
    divPrincipal.appendChild(divLib);
    //esto es para cuando haces click en el libro , te lleva a otra pagina con la descripcion entera 
    for (let i = 0; i < document.getElementsByClassName("blur").length; i++) {
      let todo = document.getElementsByClassName("blur")[i];
      todo.addEventListener("click", function () {
        let idPrestamo = document.getElementById(i).value;
        window.sessionStorage.setItem("idPrestamo", idPrestamo);
        window.location.href = "https://booksell.store/visionAp.html";

      });
    }

    for (let i = 0; i < document.getElementsByClassName("verMas").length; i++) {
      let todo = document.getElementsByClassName("verMas")[i];
      todo.addEventListener("click", function () {
        let idPrestamo = document.getElementById(i).value;
        window.sessionStorage.setItem("idPrestamo", idPrestamo);
        window.location.href = "https://booksell.store/visionAp.html";

      });

    }
    //esto es para cuando haces click en el corazon , llama la funcion favoritos, que añade el libro a tus favoritos
    for (let i = 0; i < document.getElementsByClassName("corazon").length; i++) {

      var emailf = window.sessionStorage.getItem("email");

      let corazon = document.getElementsByClassName("corazon")[i];
      corazon.addEventListener("click", async function () {
        let divCora = document.getElementsByClassName("divCora")[i];

        divCora.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>`;
        let id_Prestamo = document.getElementById(i).value;

        await Favoritos(id_Prestamo, emailf);
        swal("Añadido a favoritos", " ", "success");

      });

    }
    };
    divLibros.innerHTML += "</div>";
    divLibros.innerHTML += "</div>";
    divLibros.innerHTML += "</div>";

    console.log(divLibros);
    divLib.appendChild(divLibros);
    divPrincipal.appendChild(divLib);
    //esto es para cuando haces click en el libro , te lleva a otra pagina con la descripcion entera 
    for (let i = 0; i < document.getElementsByClassName("blur").length; i++) {
      let todo = document.getElementsByClassName("blur")[i];
      todo.addEventListener("click", function () {
        let idPrestamo = document.getElementById(i).value;
        window.sessionStorage.setItem("idPrestamo", idPrestamo);
        window.location.href = "https://booksell.store/visionAp.html";

      });
    }

    for (let i = 0; i < document.getElementsByClassName("verMas").length; i++) {
      let todo = document.getElementsByClassName("verMas")[i];
      todo.addEventListener("click", function () {
        let idPrestamo = document.getElementById(i).value;
        window.sessionStorage.setItem("idPrestamo", idPrestamo);
        window.location.href = "https://booksell.store/visionAp.html";

      });

    }
    //esto es para cuando haces click en el corazon , llama la funcion favoritos, que añade el libro a tus favoritos
    for (let i = 0; i < document.getElementsByClassName("corazon").length; i++) {

      var emailf = window.sessionStorage.getItem("email");

      let corazon = document.getElementsByClassName("corazon")[i];
      corazon.addEventListener("click", async function () {
        let divCora = document.getElementsByClassName("divCora")[i];

        divCora.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>`;
        let id_Prestamo = document.getElementById(i).value;

        await Favoritos(id_Prestamo, emailf);
        swal("Añadido a favoritos", " ", "success");

      });

    }

  } catch (error) {
    console.log("error" + error);
  }


}

async function Favoritos(id_Prestamo, email) {


  let titulo = document.getElementById("titulo").value;
  try {
    if (window.sessionStorage.getItem("email") == null) {
      window.location.replace("inicioSesion.html");

    } else {


      console.log("https://booksell.store/php/favoritosP.php?idPrestamo=" + id_Prestamo + "&email=" + email);
      let response = await fetch("https://booksell.store/php/favoritosP.php?idPrestamo=" + id_Prestamo + "&email=" + email, {
        method: "GET",
        headers: { "Content-type": "application/json" }
      });

      let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute




    }
  } catch (error) {
    console.log("error" + error);
  }
}

async function generos() {
  try {
    let response = await fetch("https://booksell.store/php/muestraGeneroP.php", {
      method: "GET",
      headers: { "Content-type": "application/json" }
    });

    let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
    console.log(enTexto);

    //coger los generos que hay en la base de datos
    let genero = document.getElementById("genero");
    let arr = [];
    for (let i = 0; i < enTexto.length; i++) {
      arr.push(enTexto[i].genero_libro);
    }
    //eliminar los repetidos
    let sinrepetidos = new Set(arr);
    let arr2 = Array.from(sinrepetidos);
    console.log(arr2);

    //añadir los generos al select
    for (let i = 0; i < arr2.length; i++) {
      let option = document.createElement("option");
      option.textContent = arr2[i];
      option.value = arr2[i];
      genero.appendChild(option);
    }

  } catch (error) {
    console.log("error" + error);
  }
}

window.addEventListener("load", function (event) {

  //que cuando llegue a al 60% de la pagina cargue mas libros


  generos();
  if (window.sessionStorage.getItem("email")) { //quita el boton de registro
    let botonLogin = document.getElementById("botonLogin");
    botonLogin.style.display = "none";
  }

  let divPrincipal1 = document.getElementById("divPrincipal");
  // divPrincipal1.textContent = "";
  let inputBuscador = document.getElementById("inputBuscador");
  inputBuscador.addEventListener("click", function () {//llama a los libros cuando le das a buscar
    let genero = document.getElementById("genero").value;
    llamarLibros(genero);




  });

  for (let i = 0; i < document.getElementsByClassName("inicio").length; i++) {//llama a los libros cuando le das a un icono de inicio del index
    let inicio = document.getElementsByClassName("inicio")[i];
    inicio.addEventListener("click", function () {
      llamarLibros(inicio.title);
    });

  }






});