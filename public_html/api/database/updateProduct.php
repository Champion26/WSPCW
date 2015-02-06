<?php



/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productID'])){
  $productIdent = $_POST['productID'];
  $prodName = $_POST['productName'];
  $desc = $_POST['description'];
  $productType = $_POST['productType'];
  $price = $_POST['price'];
  $quantity = $_POST['quantity'];
  $q = "UPDATE product
        set PRODUCT_NAME = :prodName, DESCRIPTION=:description, PRODUCT_TYPE = :prodType, PRICE = :price, QUANTITY = :quantity
        WHERE PRODUCT_ID = $productIdent;";
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
