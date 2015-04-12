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


     $productID = $_POST['id'];
     $orderID = $_POST['order'];


     $q = "INSERT INTO productOrder(productID, orderID)
     VALUES (:productID, :orderID)";

     $query = $dbh->prepare($q);
     $query->bindValue(":productID", $productID);
     $query->bindValue(":orderID", $orderID);

     $query -> execute();

echo "done \n";
echo $productID."\n";
echo $orderID."\n";
$dbh = null;

?>
