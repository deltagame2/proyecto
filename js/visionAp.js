
    var idPrestamo = window.sessionStorage.getItem("idPrestamo");
    console.log(idPrestamo);


async function datosLibrosPrestar() {
    try {
        console.log("localhost/aproyecto/php/consultarLibroP.php?idPrestamo=" + idPrestamo);
        let response = await fetch("https://booksell.store/php/consultarLibroP.php?idPrestamo=" + idPrestamo , {
          method: "GET",
          headers: { "Content-type": "application/json" }
        });
    
        let enTexto = await response.json();//convierte el objeto en json y el await espera a que se ejecute
        console.log(enTexto);
        let titulo = enTexto[0].titulo_libro;
        let autor = enTexto[0].autor_libro;
        let editorial = enTexto[0].editorial_libro;
        let genero = enTexto[0].genero_libro;
        let descripcionLibro = enTexto[0].descripcion_libro;
        let emailPrestador= enTexto[0].emailPrestador;
        let foto= enTexto[0].imagen;
       

        let imagen= document.getElementById("foto");
        imagen.src = foto;
        let tituloLibro = document.getElementById("titulo");
        tituloLibro.innerHTML = titulo;
        let autorLibro = document.getElementById("autor");
        autorLibro.innerHTML ="<b>Autor:</b> "+ autor;
        let editorialLibro = document.getElementById("editorial");
        editorialLibro.innerHTML ="<b>Editorial: </b>"+ editorial;
        let generoLibro = document.getElementById("genero");
        generoLibro.innerHTML ="<b>Genero: </b>"+ genero;
        let descripcion = document.getElementById("descripcion");
        descripcion.innerHTML = descripcionLibro;

        let alquilado = enTexto[0].prestado;
       
        if (alquilado == "si") {
            let disponible= document.getElementById("disponible");
            disponible.innerHTML = "No disponible para prestar en este momento";
        }

    } catch (error) {
        console.log("error" + error);
    }
}

datosLibrosPrestar();
