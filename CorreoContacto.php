<!-- Correo Text/HTML -->
<?php
session_start();


//Para m�s comodidad creamos las variables $UN_SALTO y $DOS_SALTOS
	$UN_SALTO="\r\n";
	$DOS_SALTOS="\r\n\r\n";

//Creamos el destinatario, asunto, remitente, etc. y tambi�n la parte que
//contiene el c�digo HTML del mensaje

	

	$destinatario=$_SESSION['email'];
	$asunto=$_GET['asunto'];
	$mensaje=$_GET['mensaje'];
	$cuerpo=utf8_decode("<h1>Incidencia reportada</h1>
	<p>
	  Estimado/a equipo de soporte,
	</p>
	<p>
	  Se ha reportado una incidencia en el servicio de BookSell. A continuación, se detalla la información relevante:
	</p>
	<h2>Asunto: ".$asunto."</h2>
	<p>
	  Descripción de la incidencia: ".$mensaje."
	</p>
	<p>
	  Por favor, tomen las acciones necesarias para resolver esta situación y proporcionen una actualización en el menor tiempo posible.
	</p>
	<p>
	  Si se requiere alguna información adicional, no duden en ponerse en contacto con el usuario afectado.
	</p>
	<p>
	  Gracias por su atención y pronta acción.
	</p>
	<p>
	  Atentamente,
	  <br>
	  El equipo de BookSell
	</p>");
	$mensaje = "<!DOCTYPE html>
	<html>
	  <head>
		<title>Notificación de incidencia - BookSell</title>
		<style>
		  body {
			background-color: #f2f2f2;
			font-family: Arial, sans-serif;
		  }
	
		  .container {
			width: 600px;
			margin: 50px auto;
			background-color: #fff;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		  }
	
		  h1 {
			color: #333;
			text-align: center;
		  }
	
		  p {
			color: #555;
			line-height: 1.5;
		  }
		</style>
	  </head>
	  <body>
		<div class='container'>
		  ".$cuerpo."
		</div>
	  </body>
	</html>
	";

	$responder="booksell@booksell.store";
	$remitente="BOOKSELL<booksell@booksell.store>";
	
//Creamos el separador de bloques del mensaje
	$separador ="Separador";

//Creamos la variable cabecera con los elementos y ponemos al final
//de cada elemento UN SALTO DE LINEA
	$cabecera = "Date: ".date("l j F Y, G:i").$UN_SALTO;
	$cabecera .="From: ".$remitente.$UN_SALTO;
	$cabecera .="Cc:booksell@booksell.store".$UN_SALTO;
	$cabecera .="Reply-To: ".$responder.$UN_SALTO;

//Definimos el contenido Multipart, f�jate que lo acabamos con ";"
	$cabecera .="Content-Type: multipart/alternative;".$UN_SALTO;

//Insertamos boundary
	$cabecera .=" boundary=$separador".$DOS_SALTOS;

//Colocamos el primer separador(con los dos guiones delante)
//antes de insertar la primera parte del mensaje
//que es el texto plano para el caso de que el cliente de correo
//no soporte HTML
	$texto_plano ="--$separador".$UN_SALTO;

//Especificamos el tipo de contenido y la codificaci�n
//e insertamos DOS SALTOS AL FINAL ya que ahi acaba la cabecera de esta parte
	$texto_plano .="Content-Type:text/plain; charset=\"ISO-8859-1\"".$UN_SALTO;
	$texto_plano .="Content-Transfer-Encoding: 7bit".$DOS_SALTOS;

//Cambiamos las etiquetas "\r\n" por saltos de l�nea "<br>"
//y luego quitamos todas las etiquetas HTML del cuerpo del mensaje
//ya que el texto plano no debe llevar ese tipo de etiquetas
	$texto_plano .= strip_tags(nl2br($mensaje));

//Insertamos un nuevo separador para se�alar el final
//de la primera parte del mensaje y el comienzo de la segunda
//en este caso ponemos UN SALTO delante del separador ya que de lo contrario
//al componer el mensaje se unir�a con la cadena texto_plano anterior
//que no tiene SALTO DE LINEA AL FINAL
	$texto_html =$UN_SALTO."--$separador".$UN_SALTO;

//Especificamos el encabezado HTML para el siguiente bloque
//y ponemos en la ultima l�nea los DOS SALTOS DE LINEA
	$texto_html .="Content-Type:text/html; charset=\"ISO-8859-1\"".$UN_SALTO;
	$texto_html .="Content-Transfer-Encoding: 7bit".$DOS_SALTOS;

//A�adimos la cadena que contiene el mensaje
	$texto_html .= $mensaje;

//Insertamos solamente un SALTO DE LINEA
//ya que estamos al final del mensaje
	$texto_html .=$UN_SALTO;

//Unimos ambas cadenas para crear el cuerpo del mensaje
	$mensaje=$texto_plano.$texto_html;

//Enviamos el mensaje
	 mail($destinatario, $asunto, $mensaje,$cabecera);
	 header("Location: https://booksell.store/perfil.html");
?>