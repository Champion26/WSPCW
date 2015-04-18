<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productType'])){
     $prodType = $_POST['productType'];
     $q = "INSERT INTO productType(type) VALUES (:type)";


     $query = $dbh->prepare($q);
     $query->bindValue(":type", $prodType);     

     $query -> execute();

     echo $prodType . ' ' . " has been updated.";




} else {
     echo 0;
}
$dbh = null;

?>
