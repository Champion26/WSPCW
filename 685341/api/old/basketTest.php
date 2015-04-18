<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$prodID='1';
$prodName='Steve';
$desc = 'This product is called Steve. It is named after steve.';
$prodType = '2';
$price = '0.0000';
$quantity = '2';


  try {
    global $db;
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    echo 'connected.';
    $add = $db->exec("INSERT INTO basket(PRODUCT_ID, PRODUCT_NAME,  DESCRIPTION, PRODUCT_TYPE, PRICE, QUANTITY)
    VALUES ('$prodID', '$prodName', '$desc', '$prodType', '$price', '$quantity')");


  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
