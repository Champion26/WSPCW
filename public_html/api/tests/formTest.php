
<p>The results will appear below</p>
<form id="viewProduct" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
  Product Name:  <input type="text" id="productName" name="productName" value="<?php $prodID ?>"><br>
  <br>
  Description:  <input type="text"  id="description" name="description" value="<?php $prodName ?>"><br>
  <br>
  Product Type:  <input type="number" id="productType"name="productType" value="<?php $desc ?> "><br>
  <br>
  1: Desktop<br>
  2: Laptop<br>
  3: Part <br>
  <br>
  Price (£):  <input type="number" step="any" id="price" name="price" value="<?php $price?>" ><br>
  <br>
  Quantity:  <input type="number" id="quantity" name="quantity" value="<?php $quantity?> "><br><br>
  <input type="submit" value="Add">
</form>
