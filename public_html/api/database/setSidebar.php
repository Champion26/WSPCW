<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['type'])){
     $delete = "DELETE FROM productSidebar";
     $delete -> execute();
     $type = $_POST['type'];
     $location = $_POST['location'];
     $q = "INSERT INTO productSidebar(Name, arrOrder) VALUES (:type, :location)";


     $query = $dbh->prepare($q);
     $query->bindValue(":type", $type);
     $query->bindValue(":location", $location);

     $query -> execute();

     echo $type . ' ' . " has been updated.";




} else {
     echo 0;
}
$dbh = null;

?>
