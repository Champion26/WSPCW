<?php

    $statement = $db->prepare('INSERT INTO basket(PRODUCT_ID, PRODUCT_NAME,  DESCRIPTION, PRODUCT_TYPE, PRICE, QUANTITY)
      VALUES(:id, :prodName, :description, :productType, :productPrice, :productQuantity)');
      $statement->execute(array(
        ':id' => $productID,
        ':prodName' => $productName,
        ':description' => $description,
        ':productType' => $productType,
        ':productPrice' =>  $productPrice,
        ':productQuantity' => $productQuantity
      ));

      echo $productID . ' ' . $productName . ' ' . $productType . ' ' . $description . ' ' . $productPrice . ' ' . $productQuantity;


?>
