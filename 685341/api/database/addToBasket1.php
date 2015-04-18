<?php

$userName = 'root';
$passWord = '';
$hostName = 'localhost';

try {
  global $db;
  $db = new PDO("mysql:host=$hostName;dbname=webcw", $userName, $passWord);
  $add = $db->exec("INSERT INTO basket(PRODUCT_ID, PRODUCT_NAME,  DESCRIPTION, PRODUCT_TYPE, PRICE, QUANTITY)
  VALUES ($productID, $productName, $description, $productType, $productPrice, $productQuantity)");

  $db = null;

}
catch(PDOException $e)
{
  echo $e->getMessage();
}
