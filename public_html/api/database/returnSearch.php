<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
if(isset($_POST['productCode'])){
    $prodCode= $_POST['productCode'];
    $productCode = NULL;
    $prodName = NULL;
    $desc = NULL;
    $prodType = NULL;
    $price = NULL;
    $quantity = NULL;
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $sql = "SELECT productCode, productName, productType, description, price, quantity
            FROM product
            WHERE productCode = '$prodCode';";
    foreach ($db->query($sql) as $row) :

      $productCode = $row ['productCode'];
      $prodName = $row ['productName'];
      $desc = $row ['description'];
      $prodType = $row ['productType'];
      $price = $row ['price'];
      $quantity = $row ['quantity'];
      $product = array($prodCode, $prodName, $desc, $prodType, $price, $quantity);
      $range[] = $product;
    endforeach;

    echo json_encode($range);
    $db = null;
  }
  ?>
