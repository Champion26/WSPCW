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

  $count = $dbh->exec("INSERT INTO employee(FIRST_NAME, LAST_NAME) VALUES ('Steve', 'Smith')");

  /*** echo the number of affected rows ***/
  echo $count;
  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
