<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
$code = $_POST['code'];
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $sql = "SELECT productCode, productName, productType, quantity
            FROM product
            WHERE productCode = '$code';";
    foreach ($db->query($sql) as $row) :
      $productCode = $row ['productCode'];
      $quantity = $row ['quantity'];

      $product = array($productCode, $quantity);
      $range[] = $product;
    endforeach;

    echo json_encode($range);
    $db = null;

?>
