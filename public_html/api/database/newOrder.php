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


     $date = $_POST['date'];
     $cost = $_POST['cost'];
     $name = $_POST['name'];
     $address = $_POST['address'];
     $postcode = $_POST['postcode'];
     $number = $_POST['orderNumber'];

     $q = "INSERT INTO orderTable(orderDate, totalCost, recipient, recipientAddress, postcode, orderNumber)
     VALUES (:dateOrder, :cost, :name, :address, :postcode, :orderNumber)";

     $query = $dbh->prepare($q);
     $query->bindValue(":dateOrder", $date);
     $query->bindValue(":cost", $cost);
     $query->bindValue(":name", $name);
     $query->bindValue(":address", $address);
     $query->bindValue(":postcode", $postcode);
     $query->bindValue(":orderNumber", $number);
     $query -> execute();


     $findOrder = "SELECT orderID
                   FROM orderTable
                   WHERE orderNumber = '$number';";

     foreach ($dbh->query($findOrder) as $row) :
       $orderID = $row ['orderID'];


       $range[] = $orderID;

     endforeach;
     echo json_encode($range);


$dbh = null;

?>
