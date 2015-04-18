<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$productID='1';
$productName='Steve';
$description = 'This product is called Steve. It is named after steve.';
$productType = '2';
$productPrice = '0.0000';
$productQuantity = '2';


  try {
    global $db;
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $statement = $db->prepare('INSERT INTO basket(PRODUCT_ID, PRODUCT_NAME,  DESCRIPTION, PRODUCT_TYPE,
      PRICE, QUANTITY)
      VALUES(:id, :prodName, :description, :productType, :productPrice, :productQuantity)');
      $statement->execute(array(
        ':id' => $productID,
        ':prodName' => $productName,
        ':description' => $description,
        ':productType' => $productType,
        ':productPrice' =>  $productPrice,
        ':productQuantity' => $productQuantity
      ));
      echo 'DATA INSERTED.';

  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
