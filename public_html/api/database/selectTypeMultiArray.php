<?php

/*** mysql hostname ***/
global $hostname, $username, $password;
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

global $products;
$products = array();
global $i;
$i = 0;
try {
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  echo "Product Type: $type" . "<br>";
  $sql = "SELECT PRODUCT_ID, PRODUCT_NAME, product_type.TYPE AS TYPE, DESCRIPTION, PRICE, QUANTITY
          FROM product
          INNER JOIN product_type
          ON product.PRODUCT_TYPE = product_type.PRODUCT_TYPE_ID
          WHERE product_type.TYPE = '$type'"; ?>
  <table class='productTable'>
    <tr>
        <th>Code</td>
        <th>Product Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Purchase</th>
      </tr>
      <?php foreach ($dbh->query($sql) as $row) :

        ?>
        <tr>
          <td><?php
          global $prodID;
          $prodID = $row ['PRODUCT_ID'];
          echo $prodID; ?></td>

          <td><?php
          global $prodName;
          $prodName = $row ['PRODUCT_NAME'];
          echo $prodName; ?></td>

          <td><?php
          global $prodType;
          $prodType = $row ['TYPE'];
          echo $prodType; ?></td>

          <td><?php
          global $desc;
          $desc = $row ['DESCRIPTION'];
          echo $desc; ?></td>

          <td><?php
          global $price;
          $price = $row ['PRICE'];
          echo $price; ?></td>

          <td><?php
          global $quantity;
          $quantity = $row ['QUANTITY'];
          echo $quantity ?></td>
          <?php
            $collection = array($prodID, $prodName, $prodType, $desc, $price, $quantity);
            array_push($products, $collection);
            $collection = null;
          ?>
          <td>
            <form method="POST" action="
           <?php
           global $productID, $productName, $productType, $description, $productPrice, $productQuantity;
           $productDetails = array();
           $productDetails = $products[i];
           $productID = $productDetails[0];
           $productName = $productDetails[1];
           $productType = $productDetails[2];
           $description = $productDetails[3];
           $productPrice = $productDetails[4];
           $productQuantity = $productDetails[5];

           include 'echoVariablesTest.php';
            ?>">
              <input type=SUBMIT name='addBasket' value="Add To Basket">
            </form>
          </td>
        </tr>
      <?php $i++; ?>
      <?php endforeach; ?>
    </table>

    <?php
    $dbh = null;
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
  ?>
