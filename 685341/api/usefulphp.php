<?php


/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';


      $q = "UPDATE product
            SET productName = :prodName, description = :description, productType = :prodType, price = :price, quantity = :quantity
            WHERE productCode = :prodCode;";

      $query = $dbh->prepare($q);

      $query->bindValue(":prodName", $productName);
      $query->bindValue(":description", $description);
      $query->bindValue(":prodType", $productType);
      $query->bindValue(":price", $price);
      $query->bindValue(":quantity", $quantity);
      $query->bindValue(":prodCode", $productcode);



      echo $productName . ' ' . " has been updated.";


      $dbh = NULL;

if(isset($_POST['deleteRecord'])){
    global $deletedArray;
        $deletedProductCode = $_POST['pCode'];
        $deletedProductName = $_POST['productN'];


      $dbcon = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
      $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $q = "DELETE FROM product
            WHERE productCode = :prodCode;";
      $query = $dbcon->prepare($q);
      $query->bindValue(":prodCode", $deletedProductCode, PDO::PARAM_STR);
      $query -> execute();
      echo $deletedProductName . ' ' . "has been deleted.";
      $dbcon = NULL;
      echo $deletedProductCode;
    }

?>
