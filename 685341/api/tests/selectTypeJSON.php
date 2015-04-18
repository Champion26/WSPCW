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
  $sql = "SELECT productCode, productName, productType.type AS type, description, price, quantity
          FROM product
          INNER JOIN producttype
          ON product.productType = productType.productTypeID;";

 global $range;
 $range = array();
 foreach ($dbh->query($sql) as $row) :          
          $prodCode = $row ['productCode'];  
          $prodName = $row ['productName'];
          $prodType = $row ['type']; 
          $desc = $row ['description'];
          $price = $row ['price'];
          $quantity = $row ['quantity'];
 
          $addQuantity = 1;
          $product = array($prodCode, $prodName, $desc, $prodType, $price, $quantity);
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
