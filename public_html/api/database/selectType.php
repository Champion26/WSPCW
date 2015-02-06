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
  $sql = "SELECT productCode, productName, productType.type AS type, description, price, quantity
          FROM product
          INNER JOIN producttype
          ON product.productType = productType.productTypeID
          WHERE productType.type = '$type'"; ?>
  <table class='productTable'>
    <tr>
        <th>Product Code</td>
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
         <?php global $addQuantity;
          $addQuantity = 1;?>
            <button data-detail='{"productCode":"<?php echo $prodCode?>",
                                  "productName":"<?php echo $prodName?>",
                                  "productType":"<?php echo $prodType?>",
                                  "description":"<?php echo $desc?>",
                                  "price": "<?php echo $price ?>",
                                  "quantity": "<?php echo $addQuantity ?>" }'>Add to Basket</button>
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
