
    var idventa = window.sessionStorage.getItem("idventa");
    console.log(idventa);


async function datosLibrosPrestar() {
    try {
        console.log("localhost/aproyecto/php/consultarLibroV.php?idventa=" + idventa);
        let response = await fetch("https://booksell.store/php/consultarLibroV.php?idventa=" + idventa, {
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
        let emailPrestador = enTexto[0].email_prestador;
        let foto = enTexto[0].imagen;
        let precio = enTexto[0].precio;


        let imagen = document.getElementById("foto");
        imagen.src = foto;
        let tituloLibro = document.getElementById("titulo");
        tituloLibro.innerHTML = titulo;
        let autorLibro = document.getElementById("autor");
        autorLibro.innerHTML = "<b>Autor:</b> " + autor;
        let editorialLibro = document.getElementById("editorial");
        editorialLibro.innerHTML = "<b>Editorial: </b>" + editorial;
        let generoLibro = document.getElementById("genero");
        generoLibro.innerHTML = "<b>Genero: </b>" + genero;
        let descripcion = document.getElementById("descripcion");
        descripcion.innerHTML = descripcionLibro;
        let precioLibro = document.getElementById("precio");
        precioLibro.innerHTML = "<b>Precio: </b>" + precio + "€";
       
      

    } catch (error) {
        console.log("error" + error);
    }
}


datosLibrosPrestar();
