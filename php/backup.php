<?php 


include "./includes/credencialesftp.php";
include "./includes/bdl.php";

	exec('mysqldump --user=u288612056_booksell --password="'.$contraseña.'" --host=localhost u288612056_booksell > Backup.sql');
	//echo "Backup realizado correctamente";
	header("Location: ../admin.html");
?>