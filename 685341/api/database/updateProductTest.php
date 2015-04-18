<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
$prodCode = "fasd";
$prodName = "asd";
$desc = "adgadfadfadsf";
$productType = 1;
$price = 188.00;
$quantity = 1;

     $q = "UPDATE product
     SET productCode = :prodCode, productName = :prodName, description = :description, productType = :prodType, price = :price, quantity= :quantity
     WHERE productCode = :prodCode;";


     $query = $dbh->prepare($q);
     $query->bindValue(":prodCode", $prodCode);
     $query->bindValue(":prodName", $prodName);
     $query->bindValue(":description", $desc);
     $query->bindValue(":prodType", $productType);
     $query->bindValue(":price", $price);
     $query->bindValue(":quantity", $quantity);


     $query -> execute();

     echo $prodName . ' ' . " has been updated.";



$dbh = null;

?>
