<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);


     $code = '7231';
     $quantity = '3';
     echo $quantity;
     $q = "UPDATE product
     SET quantity= :quantity
     WHERE productCode = :prodCode;";


     $query = $dbh->prepare($q);
     $query->bindValue(":prodCode", $code);
     $query->bindValue(":quantity", $quantity);



     $query -> execute();

     echo $code . ' ' . " has been updated.";




$dbh = null;

?>
