
<h2>Edit Product</h2>
<p>Please enter the product code that you wish to search for.</p>

<?php

global $productCode, $prodCode, $productID, $prodName, $desc, $prodType, $price, $quantity, $deletedArray;
global $inputProdCode, $inputProdName, $inputProdType, $inputProdDesc, $inputProdPrice, $inputProdQuantity;
global $deletedProductCode, $deletedProductName, $deletedProductType, $deletedDesc, $deletedPrice, $deletedQuantity;
global $deletedArray;
$deletedArray = array();


/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';


  if(isset($_POST['checkRecord'])){
    $prodCode= $_POST['productCode'];
    $productCode = NULL;
    $prodName = NULL;
    $desc = NULL;
    $prodType = NULL;
    $price = NULL;
    $quantity = NULL;
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $sql = "SELECT productCode, productName, productType, description, price, quantity
            FROM product
            WHERE productCode = '$prodCode';";
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


  elseif(isset($_POST['submitEdit'])){



      $productcode = $_POST['pCode'];
      $productName = $_POST['productN'];
      $description = $_POST['description'];
      $productType = $_POST['productType'];
      $productPrice = $_POST['price'];
      $productQuantity = $_POST['quantity'];

      $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

      $q = "UPDATE product
            SET productName = :prodName, description = :description, productType = :prodType, price = :price, quantity = :quantity
            WHERE productCode = :prodCode;";

      $query = $dbh->prepare($q);

      $query->bindValue(":prodName", $productName);
      $query->bindValue(":description", $description);
      $query->bindValue(":prodType", $productType);
      $query->bindValue(":price", $price);
      $query->bindValue(":quantity", $quantity);
      $query->bindValue(":prodCode", $productcode);

      $query -> execute();

      echo $productName . ' ' . " has been updated.";


      $dbh = NULL;

  }

  elseif(isset($_POST['deleteRecord'])){
    global $deletedArray;
        $deletedProductCode = $_POST['pCode'];
        $deletedProductName = $_POST['productN'];


      $dbcon = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
      $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $q = "DELETE FROM product
            WHERE productCode = :prodCode;";
      $query = $dbcon->prepare($q);
      $query->bindValue(":prodCode", $deletedProductCode, PDO::PARAM_STR);
      $query -> execute();
      echo $deletedProductName . ' ' . "has been deleted.";
      $dbcon = NULL;
      echo $deletedProductCode;
    }

?>
<script type="text/javascript">
function clicked() {
  if (confirm('Do you wanna to delete this record?')) {
    document.getElementById("delete").submit();
  } else {
    return false;
  }
}
</script>

<form id="searchProduct" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
  <fieldset>
  Product Code:  <input type="text" id="productCode" name="productCode" ><br><br>
  <input type="submit" name='checkRecord' value="Search">
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
