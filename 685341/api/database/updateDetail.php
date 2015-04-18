<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['id'])){
     $id = $_POST['id'];
     $content = $_POST['content'];
     $q = "UPDATE siteDetail
     SET content = :content
     WHERE elementID= :id;";

     $query = $dbh->prepare($q);
     $query->bindValue(":id", $id);
     $query->bindValue(":content", $content);

     $query -> execute();
     echo "Preset has been updated";
     echo $id;
     echo $content;


} else {
     echo 0;
}
$dbh = null;

?>
