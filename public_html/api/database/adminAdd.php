
<h2>Add Product</h2>
<p>Please complete the form below to add a new product to the website.</p>

<?php



/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productName'])){
  $prodCode = $_POST['productCode'];
  $prodName = $_POST['productName'];
  $desc = $_POST['description'];
  $productType = $_POST['productType'];
  $price = $_POST['price'];
  $quantity = $_POST['quantity'];
  $q = "INSERT INTO product(productCode, productName, description, productType, price, quantity) VALUES (:prodCode, :prodName, :description, :prodType, :price, :quantity)";
  $query = $dbh->prepare($q);
  $results = $query->execute(array(
    ":prodCode" =>$prodCode,
    ":prodName" =>$prodName,
    ":description" =>$desc,
    ":prodType" =>$productType,
    ":price" =>$price,
    ":quantity" =>$quantity
  ));
}
?>

<form id="addProduct" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
  <fieldset>
  Product Code:  <input type="text" id="productCode" name="productCode" ><br>
  <br>
  Product Name:  <input type="text" id="productName" name="productName" ><br>
  <br>
  Description:  <input type="text"  id="description"name="description" ><br>
  <br>
  Product Type:  <input type="number" id="productType"name="productType" ><br>
  <br>
  1: Desktop<br>
  2: Laptop<br>
  3: Part <br>
  <br>
  Price (£):  <input type="number" step="any" id="price" name="price" ><br>
  <br>
  Quantity:  <input type="number" id="quantity" name="quantity"><br><br>
  <input type="submit" value="Add">
</fieldset>
</form>
