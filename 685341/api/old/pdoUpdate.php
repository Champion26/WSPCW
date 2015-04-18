<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

try {
  $dbh = new PDO("mysql:host=$hostname;dbname=employee_record", $username, $password);
  /*** echo a message saying we have connected ***/
  echo 'Connected to database';

  $count = $dbh->exec("UPDATE employee SET FIRST_NAME='Bruce' WHERE FIRST_NAME='Steve' AND LAST_NAME='Smith'");

  /*** echo the number of affected rows ***/
  echo $count;
  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
