<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

try {
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $type = 'Parts';
  echo "Product Type: $type" . "<br>";
  $sql = "SELECT *
          FROM product
          INNER JOIN product_type
          ON product.PRODUCT_TYPE = product_type.PRODUCT_TYPE_ID
          WHERE product_type.TYPE = '$type'";
  foreach ($dbh->query($sql) as $row)
  {
    print "<br> ID: " . $row ['PRODUCT_ID'] ."<br> Product Name: ". $row ['PRODUCT_NAME'] .'<br> Description: '. $row ['DESCRIPTION'] .'<br> Product Type: '. $row['PRODUCT_TYPE'] .'<br> Price: '. $row['PRICE'] . '<br> Quantity: ' . $row ['QUANTITY'] . '<br />' . '<br>' ;
  }
  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
