<?php
/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

     $delete = "DELETE FROM productSidebar";
     $deleteQuery = $dbh->prepare($delete);
     $deleteQuery -> execute();
     echo "success";
     ?>