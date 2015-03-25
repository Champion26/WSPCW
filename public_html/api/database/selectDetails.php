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
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $sql = "SELECT elementID, content
          FROM siteDetail;";

 global $range;
 $range = array();
 foreach ($dbh->query($sql) as $row) :
          $id = $row ['elementID'];
          $content = $row ['content'];

          $detail = array($id, $content);
          $range[] = $detail;

        endforeach;
    echo json_encode($range);

    $dbh = null;
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
