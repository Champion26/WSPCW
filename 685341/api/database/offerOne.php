<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

try {
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $type = 'Desktop';
  echo "Offers" . "<br>";
  $sql = "SELECT PRODUCT_ID, PRODUCT_NAME, DESCRIPTION, PRICE, QUANTITY
          FROM product
          ORDER BY RAND()
          LIMIT 5"; ?>
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
          <td><?php echo $row ['PRODUCT_ID']; ?></td>
          <td><?php echo $row ['PRODUCT_NAME']; ?></td>
          <td><?php echo $row ['DESCRIPTION']; ?></td>
          <td><?php echo $row ['PRICE']; ?></td>
          <td><?php echo $row ['QUANTITY']; ?></td>
          <td>
            <button type='button'>Add To Basket</button>
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
