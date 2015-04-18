<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

try {
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  /*** echo a message saying we have connected ***/


  $count = $dbh->exec("DELETE FROM basket;");

  print("Deleted $count rows.\n");

  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
