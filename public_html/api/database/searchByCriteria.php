
<h2>Edit Product</h2>
<p>Please enter the product code that you wish to search for.</p>

<?php
global $productCode, $prodCode, $productID, $prodName, $desc, $prodType, $price, $quantity, $deletedArray;

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
$db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
if (isset($_POST['searchCode'])) || (isset($_POST['productName'])) || (isset($_POST['productPrice'])){


    if (isset($_POST['productCode'])){
      $prodCode= $_POST['productCode'];
      $productCode = NULL;
      $prodName = NULL;
      $desc = NULL;
      $prodType = NULL;
      $price = NULL;
      $quantity = NULL;
      $sql = "SELECT productCode, productName, productType, description, price, quantity
      FROM product
      WHERE productCode = '$prodCode';";

    }
    if (isset($_POST['productName'])){
      $prodCode= $_POST['productCode'];
      $productCode = NULL;
      $prodName = $_POST['productName'];
      $desc = NULL;
      $prodType = NULL;
      $price = NULL;
      $quantity = NULL;
      $sql = "SELECT productCode, productName, productType, description, price, quantity
      FROM product
      WHERE productName = '$prodName';";
    }
    if (isset($_POST['productPrice'])){
        $minPrice = $_POST['minPrice'];
        $maxPrice = $_POST['maxPrice'];
        $prodCode= $_POST['productCode'];
        $productCode = NULL;
        $prodName = $_POST['productName'];
        $desc = NULL;
        $prodType = NULL;
        $price = NULL;
        $quantity = NULL;
        $sql = "SELECT productCode, productName, productType, description, price, quantity
        FROM product
        WHERE price BETWEEN $minPrice AND $maxPrice;";
    }
    foreach ($db->query($sql) as $row) :
      if(empty($row)){
        echo "There is no such product.";
      }
      else{
        $productCode = $row ['productCode'];
        echo $productCode;
        $prodName = $row ['productName'];
        echo $prodName;
        $desc = $row ['description'];
        echo $desc;
        $prodType = $row ['productType'];
        echo $prodType;
        $price = $row ['price'];
        echo $price;
        $quantity = $row ['quantity'];
        echo $quantity;
      }
    endforeach;
    $db = null;
}

?>
<p>Search by product code.</p>
<form id="searchCode" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
<fieldset>
Product Code:  <input type="text" id="productCode" name="productCode" ><br><br>

<input type="submit" name='searchCode' value="Search">
</fieldset>
</form>

<p>Search by product name.</p>
<form id="searchName" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
  <fieldset>

    Product Name:  <input type="text" id="productName" name="productName" ><br><br>
    <input type="submit" name='searchName' value="Search">
  </fieldset>
</form>

<p>Search by price.</p>
<form id="searchCode" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
  <fieldset>
    Price
    <p>Minimum price (£):</p>  <input type="range" id="minPrice" name="minPrice" min="0" max="500" step="20" ><br><br>
    <p>Maximum price (£):</p>  <input type="range" id="maxPrice" name="maxPrice" min="0" max="500" step="20" ><br><br>
    <input type="submit" name='searchPrice' value="Search">
  </fieldset>
</form>


<p>The results will appear below</p>
<form id="viewProduct" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
<fieldset>
<input type="hidden"  name="pCode" value=<?php echo htmlspecialchars($productCode)?>><br>
<br>
Product Name:  <input type="text" name="productN" value=<?php echo htmlspecialchars($prodName) ?> > <br>
<br>
Description:  <input type="text"   name="description" value="<?php echo htmlspecialchars($desc) ?>"> <br>
<br>
Product Type:  <input type="number" name="productType" value=<?php echo htmlspecialchars($prodType) ?> > <br>
<br>
1: Desktop<br>
2: Laptop<br>
3: Part <br>
<br>
Price (£):  <input type="number" step="any" name="price" value=<?php echo htmlspecialchars($price)?> > <br>
<br>
Quantity:  <input type="number"  name="quantity" value=<?php echo htmlspecialchars($quantity)?> > <br><br>

<input type="submit" name='submitEdit' value="Update">
<input type="submit" onclick="clicked()" id='delete' name='deleteRecord' value="Delete">

</fieldset>
</form>


<script type="text/javascript">
function clicked() {
  if (confirm('Do you wanna to delete this record?')) {
    document.getElementById("delete").submit();
  } else {
    return false;
  }
}
</script>
