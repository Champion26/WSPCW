<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['code'])){
     $code = $_POST['code'];
     $quantity = $_POST['newValue'];
     echo $quantity;
     $q = "UPDATE product
     SET quantity= :quantity
     WHERE productCode = :prodCode;";


     $query = $dbh->prepare($q);
     $query->bindValue(":prodCode", $code);
     $query->bindValue(":quantity", $quantity);



     $query -> execute();

     echo $code . ' ' . " has been updated.";




} else {
     echo 0;
}
$dbh = null;

?>
