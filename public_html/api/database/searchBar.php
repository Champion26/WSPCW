<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';
$code = false;
/*** mysql password ***/
$password = '';
if(isset($_POST['productName'])){
  $prodCode = NULL;
  $prodName = $_POST['productName'];
  $desc = NULL;
  $prodType = NULL;
  $price = NULL;
  $quantity = NULL;
  $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $sql = "SELECT productCode, productName, productType, description, price, quantity
  FROM product
  WHERE productName = '$prodName';";
  foreach ($db->query($sql) as $row) :
    echo (empty($row));
    if (empty($row)){
      $code = true;
      break;
    } else{
          $productCode = $row ['productCode'];
          $prodName = $row ['productName'];
          $desc = $row ['description'];
          $prodType = $row ['productType'];
          $price = $row ['price'];
          $quantity = $row ['quantity'];
          $product = array($productCode, $prodName, $desc, $prodType, $price, $quantity);
          $range[] = $product;
          }

    endforeach;
    if ($code = true){

      $prodName = NULL;
      $prodCode = $_POST['productName'];
      $desc = NULL;
      $prodType = NULL;
      $price = NULL;
      $quantity = NULL;
      $sql2 = "SELECT productCode, productName, productType, description, price, quantity
      FROM product
      WHERE productCode = '$prodCode';";
      foreach ($db->query($sql2) as $row2) :
        $productCode = $row2 ['productCode'];
        $prodName = $row2 ['productName'];
        $desc = $row2 ['description'];
        $prodType = $row2 ['productType'];
        $price = $row2 ['price'];
        $quantity = $row2 ['quantity'];
        $product = array($productCode, $prodName, $desc,$prodType, $price, $quantity);
        for ($i = 1; $i < sizeOf($range); $i++){
          if ($productCode = $range[i][0]){

          } else{
            $range[] = $product;
          }
        }

      endforeach;
    }
    $range[] = $product;
    echo json_encode($range);
    $db = null;
        }
        ?>
