  <?php
     $hostname = 'localhost';
     $username = 'root';
     $password = '';
     $deletedProductCode = 'A10AS';
     $deletedProductName = "Steve";
     $deletedDesc = "adfdsfadsfdf";
     $deletedProductType = 1;
     $deletedPrice = "0.0000";
     $deletedQuantity = 2;

      $dbRe = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
      $q = "INSERT INTO product(productCode, productName, description, productType, price, quantity) VALUES (:prodCode, :prodName, :description, :prodType, :price, :quantity)";
        $query = $dbRe->prepare($q);
        $results = $query->execute(array(
          ":prodCode" =>$deletedProductCode,
          ":prodName" =>$deletedProductName,
          ":description" =>$deletedDesc,
          ":prodType" =>$deletedProductType,
          ":price" =>  $deletedPrice,
          ":quantity" =>  $deletedQuantity
        ));
        echo   $deletedProductName . ' ' . "Record has been re-inserted into the system.";
      $dbRe = null;
  ?>
