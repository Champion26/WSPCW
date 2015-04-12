<?php

/*** mysql hostname ***/
global $hostname, $username, $password;
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

global $products;
$products = array();
global $i;
$i = 0;
try {
  $code = $_POST['code'];
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $sql = "SELECT *
          FROM ordertable
          WHERE orderID = '$code';";

 global $range;
 $range = array();
 foreach ($dbh->query($sql) as $row) :
          $date = $row['orderDate'];
          $cost = $row['totalCost'];
          $name = $row['recipient'];
          $address = $row['recipientAddress'];
          $postcode = $row['postcode'];
          $orderN = $row['orderNumber'];


          $product = array($date, $cost, $name, $address, $postcode, $orderN);
          $range[] = $product;

        endforeach;
    echo json_encode($range);

    $dbh = null;
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
