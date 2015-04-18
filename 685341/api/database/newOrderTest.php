<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);


     $date = 0000-01-02;
     $cost = 1;
     $name = 'smith';
     $address = 'gjhgkhg';
     $postcode = 'chgkv';

     $q = "INSERT INTO orderTable(orderDate, totalCost, recipient, recipientAddress, postcode)
     VALUES (:dateOrder, :cost, :name, :address, :postcode)";

     $query = $dbh->prepare($q);
     $query->bindValue(":dateOrder", $date);
     $query->bindValue(":cost", $cost);
     $query->bindValue(":name", $name);
     $query->bindValue(":address", $address);
     $query->bindValue(":postcode", $postcode);

     $query -> execute();

     echo $cost;
     $findOrder = "SELECT orderID
                   FROM orderTable;";

     foreach ($dbh->query($findOrder) as $row) :
       $orderID = $row ['orderID'];


       $range[] = $orderID;

     endforeach;
     echo json_encode($range);


$dbh = null;

?>
