<?php

/*** mysql hostname ***/
global $hostname, $username, $password;
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

global $productType;
$productType = array();
global $i;
$i = 0;
try {
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $sql = "SELECT productTypeID, type
          FROM productType";

 global $range;
 $range = array();
 foreach ($dbh->query($sql) as $row) :

          global $prodTypeID;
          $prodTypeID = $row ['productTypeID'];



          global $type;
          $type = $row ['type'];

          $productType = array($prodTypeID, $type);
          $range[] = $productType;
          $i++;
        endforeach;
    echo json_encode($range);

    $dbh = null;
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
