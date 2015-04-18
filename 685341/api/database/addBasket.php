<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
/** open connection to DB through PDO **/
try {
  $db = new PDO("mysql:host=$hostname;dbname=employee_record", $username, $password);
  /*** echo a message saying we have connected ***/


  $add = $dbh->exec("INSERT INTO basket(PRODUCT_ID, PRODUCT_NAME,  DESCRIPTION, PRODUCT_TYPE, PRICE, QUANTITY)
  VALUES ($prodID, $prodName, $desc, $prodType, $price, $quantity)");

  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
