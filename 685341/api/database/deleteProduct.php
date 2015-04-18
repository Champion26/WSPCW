<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

$code = $_POST['code'];

     $q = "DELETE FROM product

     WHERE productCode = :prodCode;";


     $query = $dbh->prepare($q);
     $query->bindValue(":prodCode", $code);




     $query -> execute();

     echo $code . ' ' . " has been deleted.";




$dbh = null;

?>
