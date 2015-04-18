<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

try {
  global $dbh;
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  echo "Product Type: $type" . "<br>";
  $sql = "SELECT PRODUCT_ID, PRODUCT_NAME, DESCRIPTION, PRICE, QUANTITY
          FROM product
          INNER JOIN product_type
          ON product.PRODUCT_TYPE = product_type.PRODUCT_TYPE_ID
          WHERE product_type.TYPE = '$type'"; ?>
  <table class='productTable'>
    <tr>
        <th>Code</td>
        <th>Product Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Purchase</th>
      </tr>
      <?php foreach ($dbh->query($sql) as $row) : ?>
        <tr>
          <td><?php
          global $prodID;
          $prodID = $row ['PRODUCT_ID'];
          echo $prodID; ?></td>

          <td><?php
          global $prodName;
          $prodName = $row ['PRODUCT_NAME'];
          echo $prodName;  ?></td>

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

          <td>
            <form method="POST">
              <input type=SUBMIT action="
                <?php
                include'addToBasket.php'
                 ?>"
              value="Add To Basket">
            </form>
          </td>
        </tr>
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
