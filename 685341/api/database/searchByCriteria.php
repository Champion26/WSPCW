
<h2>Edit Product</h2>
<p>Please enter the product code that you wish to search for.</p>

<?php
global $productCode, $prodCode, $productID, $prodName, $desc, $prodType, $price, $quantity, $deletedArray, $multiResult;

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
$sql = NULL;
global $x, $i, $ifPrice, $arraySize, $sql, $q;
$arraySize = sizeof($multiResult);
$i = 0;
$multiResult = array();
$db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
$setCode = isset($_POST['searchCode']);
$setName = isset($_POST['productName']);
$setPrice = isset($_POST['productPrice']);
$ifPrice = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
if (!isset($_POST['searchCode'], $_POST['productName'])){


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

    if (empty($sql)) {
        echo "Please enter a value.";

    } else {
      $j = 0;
      echo "if statement";
      foreach ($db->query($sql) as $row) :
        $length = (sizeof($row));
        if(empty($row)){
          echo "There is no such product.";
        }

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


      endforeach;

      $x = (sizeof($multiResult));
      echo $x;
      $db = null;
  }}

  if (isset($_POST['productPrice'])){
    $minPrice = $_POST['minPrice'];
    $maxPrice = $_POST['maxPrice'];
    $productCode = NULL;
    $prodName = NULL;
    $desc = NULL;
    $prodType = NULL;
    $price = NULL;
    $quantity = NULL;
    $q = "SELECT productCode, productName, productType, description, price, quantity
    FROM product
    WHERE price = 0.00;";

  if (empty($q)) {
    echo "Please enter a value.";
    echo 'not working price';
  }
  else {
    $j = 0;
    foreach ($db->query($q) as $row) :
      if(empty($row)){
        echo "There is no such product.";
      }
      else{

          $productC = $row ['productCode'];

          $prodN = $row ['productName'];

          $des = $row ['description'];

          $prodT = $row ['productType'];

          $pri = $row ['price'];

          $quan = $row ['quantity'];

          $productArray = array ($productC, $prodN, $des, $prodT, $pri, $quan);
          $multiResult[] = $productArray;
          if ($j === sizeof($row)){
              $results = $multiResult[0];
              $productCode = $results[0];
              $prodName = $results [1];
              $desc = $results[2];
              $prodType = $results[3];
              $price = $results[4];
              $quantity = $results[5];
          }
          $j++;
        }
      endforeach;
        $db = null;
      }}



  if (isset ($_POST['next'], $_POST['previous'])){
   if ($arraySize >= 1){
     if (isset($_POST['next'])){
       if ($i === $x){
         echo 'There are no more records to display';
       } else {
         $results = $multiResult[$i];
         $i++;
         $productCode = $results[0];
         $prodName = $results [1];
         $desc = $results[2];
         $prodType = $results[3];
         $price = $results[4];
         $quantity = $results[5];
      }
     }
     else if(isset($_POST['previous'])){
       if ($i === 0){
         echo 'You cannot go back any further.';
       } else{
         $i--;
         $results = $multiResult[$i];
         $productCode = $results[0];
         $prodName = $results [1];
         $desc = $results[2];
         $prodType = $results[3];
         $price = $results[4];
         $quantity = $results[5];
       }
     }
   } else{
     echo "There are no results to cycle through.";
   }
 }
 }

echo $arraySize;
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
    <p>Minimum price (£):</p>  <input type="number" id="minPrice" name="minPrice" ><br><br>
    <p>Maximum price (£):</p>  <input type="number" id="maxPrice" name="maxPrice" ><br><br>
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
<input type="submit" name='next' value="Next">
<input type="submit" name='previous' value="Previous">
</fieldset>
</form>
