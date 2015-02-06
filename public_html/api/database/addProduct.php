<?php



/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productName'])){
     $prodName = $_POST['productName'];
     $desc = $_POST['description'];
     $productType = $_POST['productType'];
     $price = $_POST['price'];
     $quantity = $_POST['quantity'];
     $q = "INSERT INTO product(PRODUCT_NAME, DESCRIPTION, PRODUCT_TYPE, PRICE, QUANTITY) VALUES (:prodName, :description, :prodType, :price, :quantity)";
     $query = $dbh->prepare($q);
     $results = $query->execute(array(
       ":prodName" =>$prodName,
       ":description" =>$desc,
       ":prodType" =>$productType,
       ":price" =>$price,
       ":quantity" =>$quantity
     ));
}
?>
