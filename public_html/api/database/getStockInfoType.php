<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
$type = $_POST['type'];

    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $sql = "SELECT product.productCode, product.productName, product.productType, product.quantity
            FROM product
            INNER JOIN producttype
            ON product.productType = productType.productTypeID
            WHERE productType.type = '$type';";
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
