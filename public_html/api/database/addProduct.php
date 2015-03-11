<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productCode'])){
     $prodCode = $_POST['productCode'];
     $prodName = $_POST['productName'];
     $desc = $_POST['description'];
     $productType = $_POST['productType'];
     $price = $_POST['productPrice'];
     $quantity = $_POST['productQuantity'];
     $q = "INSERT INTO product(PRODUCT_CODE, PRODUCT_NAME, DESCRIPTION, PRODUCT_TYPE, PRICE, QUANTITY) VALUES (:prodCode, :prodName, :description, :prodType, :price, :quantity)";
     $query = $dbh->prepare($q);
     $results = $query->execute(array(
       ":prodCode" => $prodCode,
       ":prodName" =>$prodName,
       ":description" =>$desc,
       ":prodType" =>$productType,
       ":price" =>$price,
       ":quantity" =>$quantity
     ));
     echo "Product has been successfully added.";
} else {
     echo "The product has not been added into the system.";
}


?>
