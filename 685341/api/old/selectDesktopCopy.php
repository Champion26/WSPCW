<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

try {
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $type = 'Desktop';
  echo "Product Type: $type" . "<br>";
  $sql = "SELECT *
          FROM product
          INNER JOIN product_type
          ON product.PRODUCT_TYPE = product_type.PRODUCT_TYPE_ID
          WHERE product_type.TYPE = '$type'";


  foreach ($dbh->query($sql) as $row)
  {
    <tr>
      <td><? echo $row ['PRODUCT_ID']; ?></td>
      <td><? echo $row ['PRODUCT_NAME']; ?></td>
      <td><? echo $row ['DESCRIPTION']; ?></td>
      <td><? echo $row ['PRODUCT_TYPE']; ?></td>
      <td><? echo $row ['PRICE']; ?></td>
      <td><? echo $row ['QUANTITY']; ?></td>
   </tr>


  }


  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
