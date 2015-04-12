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



     $q = "SELECT productID
           FROM product
           WHERE productCode = '$code';";

     foreach ($dbh->query($q) as $row) :
       $code = $row['productID'];


       $range[] = $code;

     endforeach;
     echo json_encode($range);


} else {
     echo 0;
}
$dbh = null;

?>
