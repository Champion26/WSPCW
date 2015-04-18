<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);


     $range = [];
     $getType = "SELECT *
                 FROM productSidebar;";

      foreach ($dbh->query($getType) as $row) :
                   $type = $row ['name'];
                   $range[]= $type;
      endforeach;
      echo json_encode($range);

      $dbh = null;
      ?>
