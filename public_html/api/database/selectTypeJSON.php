<?php

/*** mysql hostname ***/
global $hostname, $username, $password;
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

global $products;
$products = array();
global $i;
$i = 0;
try {
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $sql = "SELECT productCode, productName, productType.type AS type, description, price, quantity, location
          FROM product
          INNER JOIN producttype
          ON product.productType = productType.productTypeID;";

 global $range;
 $range = array();
 foreach ($dbh->query($sql) as $row) :

          global $prodCode;
          $prodCode = $row ['productCode'];



          global $prodName;
          $prodName = $row ['productName'];



          global $prodType;
          $prodType = $row ['type'];



          global $desc;
          $desc = $row ['description'];



          global $price;
          $price = $row ['price'];



          global $quantity;
          $quantity = $row ['quantity'];
          $location = $row ['location'];


          global $addQuantity;
          $addQuantity = 1;
          $product = array($prodCode, $prodName, $desc, $prodType, $price, $quantity,$location);
          $range[] = $product;
          $i++;
        endforeach;
    echo json_encode($range);

    $dbh = null;
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
