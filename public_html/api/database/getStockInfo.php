<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $sql = "SELECT productCode, productName, productType, quantity
            FROM product;";
    foreach ($db->query($sql) as $row) :
      $productCode = $row ['productCode'];
      $prodName = $row ['productName'];
      $quantity = $row ['quantity'];

      $product = array($productCode, $prodName, $quantity);
      $range[] = $product;
    endforeach;

    echo json_encode($range);
    $db = null;

?>
