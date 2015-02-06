
          <?php
            $collection = array($prodCode, $prodName, $prodType, $desc, $price, $quantity);
            array_push($products, $collection);
            $collection = null;
           global $productID, $productName, $productType, $description, $productPrice, $productQuantity;
           $productDetails = array();
           $productDetails = $products[$i];
           $productCode = $productDetails[0];
           $productName = $productDetails[1];
           $productType = $productDetails[2];
           $description = $productDetails[3];
           $productPrice = $productDetails[4];
           $productQuantity = $productDetails[5];

           include 'echoVariablesTest.php';
            ?>
