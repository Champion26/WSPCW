<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productType'])){
     $userType = $_POST['productType'];
     $getType = "SELECT productTypeID
                 FROM productType
                 WHERE type = '$userType'";
      foreach ($dbh->query($getType) as $row) :
                   $prodType = $row ['productTypeID'];
      endforeach;
      $deleteAll = "DELETE FROM product
                    WHERE productType = '$prodType'";
      $queryRecords = $dbh->prepare($deleteAll);
      $queryRecords -> execute();

      $deleteTypeQ = "DELETE FROM productType
                     WHERE type = '$userType'";
       $delete = $dbh->prepare($deleteTypeQ);
       $delete -> execute();


} else {
     echo 0;
}
$dbh = null;

?>
