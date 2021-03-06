<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productCode'],$_POST['productName'], $_POST['description'], $_POST['productType'], $_POST['productPrice'], $_POST['productQuantity'])){
     $prodCode = $_POST['productCode'];
     $prodName = $_POST['productName'];
     $desc = $_POST['description'];
     $productType = $_POST['productType'];
     $price = $_POST['productPrice'];
     $quantity = $_POST['productQuantity'];
     $location = $_POST['filepath'];
     $q = "INSERT INTO product(productCode, productName, description, productType, price, quantity, location) VALUES (:prodCode, :prodName, :description, :prodType, :price, :quantity, :location)";


     $query = $dbh->prepare($q);
     $query->bindValue(":prodCode", $prodCode);
     $query->bindValue(":prodName", $prodName);
     $query->bindValue(":description", $desc);
     $query->bindValue(":prodType", $productType);
     $query->bindValue(":price", $price);
     $query->bindValue(":quantity", $quantity);
     $query->bindValue(":location", $location);

     $query -> execute();

     echo $prodName . ' ' . " has been updated.";




} else {
     echo 0;
}
$dbh = null;

?>
