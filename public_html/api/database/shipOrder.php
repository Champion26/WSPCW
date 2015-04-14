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
  $number = $_POST['number'];
  echo $number;
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $sql = "UPDATE ordertable
          SET shipped = 1;
          WHERE orderNumber = :orderNumber ;";

          $query = $dbh->prepare($sql);

          $query->bindValue(":orderNumber", $number);

 echo "done";

    $dbh = null;
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
