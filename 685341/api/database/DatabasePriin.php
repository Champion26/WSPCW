<?php
/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
/*** database connection is created ***/
$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
/*** form fields are tied to variables ***/
  $SpeciesName = $_POST['SpeciesName'];
  $BinominalName = $_POST['BinominalName'];
  $PoOrign = $_POST['PlaceOfOrigin'];
  $Notes = $_POST['Notes'];
  /*** query is prepared ***/ 
  $query = "INSERT INTO species(SpeciesName, BinominalName, PlaceOfOrigin, Notes) 
  VALUES (:speciesName, :BinoName, :PoOrigin, :notes)";  
  $query = $dbh->prepare($query);
  /*** values are bound to the query and then executed ***/
  $query->bindValue(":speciesName", $SpeciesName);
  $query->bindValue(":BinoName", $BinominalName);
  $query->bindValue(":PoOrigin", $PoOrign);
  $query->bindValue(":notes", $Notes);      
  $query -> execute();
      
?>