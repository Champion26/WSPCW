<?php

/*** mysql hostname ***/
global $hostname;
$hostname = 'localhost';

/*** mysql username ***/
global $username;
$username = 'root';

/*** mysql password ***/
global $password;
$password = '';

try {
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

  $sql = "SELECT productCode, productName, productType AS type, description, price, quantity
          FROM basket
          INNER JOIN productType
          ON basket.productType = productType.productTypeID;" ?>
  <table class='productTable'>
    <tr>
        <th>Product Code</td>
        <th>Product Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Remove Product?</th>
      </tr>
      <?php foreach ($dbh->query($sql) as $row) : ?>
        <tr>
          <td><?php
          global $prodCode;
          $prodCode = $row ['productCode'];
          echo $prodCode; ?></td>

          <td><?php
          global $prodName;
          $prodName = $row ['productName'];
          echo $prodName; ?></td>

          <td><?php
          global $prodType;
          $prodType = $row ['type'];
          echo $prodType; ?></td>

          <td><?php
          global $desc;
          $desc = $row ['description'];
          echo $desc; ?></td>

          <td><?php
          global $price;
          $price = $row ['price'];
          echo $price; ?></td>

          <td><?php
          global $quantity;
          $quantity = $row ['quantity'];
          echo $quantity ?></td>

          <td>
            <form method="POST" action="
           <?php
           include 'removeFromBasket.php';
            ?>">
              <input type=SUBMIT name='removeItem' value="Remove from Basket">
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </table>
    <form method="POST" action="
    <?php
    include 'clearBasket.php';
    ?>">
    <input type=SUBMIT name='clearBasket' value="Clear Basket">
  </form>
    <?php
    $dbh = null;
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
  ?>
