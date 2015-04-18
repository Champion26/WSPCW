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
     $q = "INSERT INTO siteDetail(elementID, content) VALUES (:id, :content)";


     $query = $dbh->prepare($q);
     $query->bindValue(":id", $id);
     $query->bindValue(":content", $content);

     $query -> execute();
     echo "Preset has been added";


} else {
     echo 0;
}
$dbh = null;

?>
