<?php
/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);


  $code = $_POST['code'];


  $sql = "SELECT productName, productCode, price
          FROM product
          WHERE productID = '$code';";


 $range = array();
 foreach ($dbh->query($sql) as $row) :
          $name = $row['productName'];
          $code = $row['productCode'];
          $price = $row['price'];


          $product = array($name, $code, $price);
          $range[] = $product;

        endforeach;
    echo json_encode($range);

    $dbh = null;
?>
