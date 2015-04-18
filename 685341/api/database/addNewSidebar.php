<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
global $range;
$range= [];
$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);


     $type = $_POST['type'];


     $q = "INSERT INTO productSidebar(name)
     VALUES (:name);";

     $query = $dbh->prepare($q);
     $query->bindValue(":name", $type);

     $query -> execute();

$dbh = null;

?>
