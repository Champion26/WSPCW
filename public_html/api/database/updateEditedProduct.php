<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productCode'],$_POST['productName'], $_POST['desc'], $_POST['price'])){
     $prodCode = $_POST['productCode'];
     $prodName = $_POST['productName'];
     $desc = $_POST['desc'];

     $price = $_POST['price'];
     $quantity = $_POST['quantity'];
     $q = "UPDATE product
     SET productName = :prodName, description = :description, price = :price, quantity= :quantity
     WHERE productCode = :prodCode;";


     $query = $dbh->prepare($q);
     $query->bindValue(":prodCode", $prodCode);
     $query->bindValue(":prodName", $prodName);
     $query->bindValue(":description", $desc);
     $query->bindValue(":price", $price);
     $query->bindValue(":quantity", $quantity);



     $query -> execute();

     echo $prodName . ' ' . " has been updated.";




} else {
     echo 0;
}
$dbh = null;

?>
