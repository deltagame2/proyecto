
async function libros() {
    // try {
    let form = document.getElementById("formSubirLibro");
    let titulo = document.getElementById("inputRegistro").value;
    let autor = document.getElementById("inputRegistro2");
    let editorial = document.getElementById("inputRegistro3");
    let genero = document.getElementById("inputRegistro4");
    let descripcion = document.getElementById("inputRegistro6");
    let checkbox = document.getElementsByName("elecion");
    let precio = document.getElementById("inputRegistro5");
    


    
    titulo = titulo.replaceAll(" ", "+");
    console.log("https://www.googleapis.com/books/v1/volumes?q=" + titulo);
    let response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + titulo, {
        method: "GET",
        mode: "cors"
    });

    let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
    console.log(enTexto);
    let i = 0;
    do {

        if (enTexto.items[i].volumeInfo.authors) {
            var autorLibro = enTexto.items[i].volumeInfo.authors[0];
        };
        i++;
    } while (!autorLibro);
     i = 0;
    do {

        if (enTexto.items[i].volumeInfo.imageLinks) {
            var foto = enTexto.items[i].volumeInfo.imageLinks.thumbnail;
        };
        i++;
    } while (!foto);

    i = 0;
    do {

        if (enTexto.items[i].volumeInfo.categories) {
            var generoLibro = enTexto.items[i].volumeInfo.categories[0];
        };
        i++;
    } while (!generoLibro);
   
    i = 0;
    do {

        if (enTexto.items[i].volumeInfo.publisher) {
            var editorialLibro = enTexto.items[i].volumeInfo.publisher;
        };
        i++;
    } while (!editorialLibro);
   
    i = 0;
    do {

        if (enTexto.items[i].volumeInfo.description) {
            var descripcionLibro = enTexto.items[i].volumeInfo.description;
        };
        i++;
    } while (!descripcionLibro);
    



    // autor.addEventListener("blur", function () {
    //     if (autorLibro != autor.value) {
    //         autor.classList.add("error");
    //     } else {
    //         autor.classList.remove("error");
    //         editorial.value = editorialLibro;
    //         genero.value = generoLibro;
    //         descripcion.value = descripcionLibro;
    //         document.getElementById("imagen").src = foto;
    //     }
    // });
    titulo.value = enTexto.items[0].volumeInfo.title;
    autor.value = autorLibro;
    editorial.value = editorialLibro;
    genero.value = generoLibro;
    descripcion.textContent = descripcionLibro;
    document.getElementById("fotoSubirLibro").src = foto;
    document.getElementById("fotoSubirLibro").style.display = "block";
    


    // } catch (error) {
    //     console.log("error" + error);
    // }
}



window.addEventListener("load", function () {
    var emailUser = window.sessionStorage.getItem("email");
    let form = document.getElementById("formSubirLibro");
    let titulo = document.getElementById("inputRegistro");
    let autor = document.getElementById("inputRegistro2");
    let editorial = document.getElementById("inputRegistro3");
    let genero = document.getElementById("inputRegistro4");
    let descripcion = document.getElementById("inputRegistro6");
    let checkbox = document.getElementsByName("elecion");
    let precio = document.getElementById("inputRegistro5");
 
    
    titulo.addEventListener("blur", function () {
       
        libros();
       
    });

    function validarTitulo() {
        if (titulo.value.length > 0) {
            titulo.classList.remove("error");
            return true;
        } else {
            titulo.classList.add("error");
            return false;
        }
    }

    function validarAutor() {
        if (autor.value.length > 0) {
            autor.classList.remove("error");
            return true;
        } else {
            autor.classList.add("error");
            return false;
        }
    }

    function validarEditorial() {
        if (editorial.value.length > 0) {
            editorial.classList.remove("error");
            return true;
        } else {
            editorial.classList.add("error");
            return false;
        }
    }

    function validarGenero() {
        if (genero.value.length > 0) {
            genero.classList.remove("error");
            return true;
        } else {
            genero.classList.add("error");
            return false;
        }
    }

    function validarDescripcion() {
        if (descripcion.textContent !="") {
            descripcion.style.border = "1px solid black";
            return true;
        } else {
            descripcion.style.border = "1px solid red";
            return false;
        }
    }

    function validarCheckbox() {
        if (checkbox[0].checked || checkbox[1].checked) {
            checkbox[0].classList.remove("error");
            checkbox[1].classList.remove("error");
            
            return true;
        } else {
            checkbox[0].classList.add("error");
            checkbox[1].classList.add("error");
          

            return false;
        }
    }

    function validarPrecio() {
       
        if(checkbox[0].checked){
            precio.classList.remove("error");
            return true;
        }else{
            if (precio.value.length > 0) {
                precio.classList.remove("error");
                return true;
            } else {
                precio.classList.add("error");
                return false;
            }
        }
       
    }
    
    let email = document.getElementById("email");
    email.value = emailUser;

    form.addEventListener("submit", function (event) {
        
        let oculto = document.getElementById("oculto");
        oculto.value= document.getElementById("fotoSubirLibro").src;

        if (!validarTitulo()) {
            event.preventDefault();
        }
        if (!validarAutor()) {
            event.preventDefault();
        }
        if (!validarEditorial()) {
            event.preventDefault();
        }
        if (!validarGenero()) {
            event.preventDefault();
        }
        if (!validarDescripcion()) {
            event.preventDefault();
        }
        if (!validarCheckbox()) {
            event.preventDefault();
        }
        if (!validarPrecio()) {
            event.preventDefault();
        }

        
       
    });


});