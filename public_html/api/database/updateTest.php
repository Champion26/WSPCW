<?php




/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
global $i;


    $productcode = 7231;
    $productName = "Mat";
    $description = "Matt";
    $productType = 1;
    $price = 0.0000;
    $quantity = 2;
    

      $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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

      $query -> execute();



      echo $productName . ' ' . " has been updated.";
      $dbh = NULL;
    
    
?>
