
    <?php
    include "./includes/credencialesftp.php";
    include "./includes/bdl.php";

    exec('/volume1/@appstore/MariaDB10/usr/local/mariadb10/bin/mysql --user="u288612056_booksell" --password="'.$contraseña.'" u288612056_booksell < /public_html/php/Backup.sql');
    header("Location: ../pagSuperAdmin.php");
    include("./hyf/footer.php");
    ?>
