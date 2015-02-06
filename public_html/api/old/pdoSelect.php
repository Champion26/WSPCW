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

  $sql = "SELECT * FROM employee";
  foreach ($dbh->query($sql) as $row)
  {
    print $row ['ID'] .' - '. $row['FIRST_NAME'] .' - '. $row['LAST_NAME'] . '<br />';
  }
  $dbh = null;
}
catch(PDOException $e)
{
  echo $e->getMessage();
}
?>
