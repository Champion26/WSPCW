<?php



/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';

$dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);

if(isset($_POST['productID'])){
  $prodID = $_POST['productID'];
  $sql = "SELECT * FROM product
        WHERE product.PRODUCT_ID = $prodID; ";
  foreach ($dbh->query($sql) as $row) :
    global $prodID, $prodName, $desc, $prodType, $price, $quantity;

    $prodID = $row ['PRODUCT_ID'];
    return $prodID;

    $prodName = $row ['PRODUCT_NAME'];
    return $prodName;

    $desc = $row ['DESCRIPTION'];
    return $desc;


    $prodType = $row ['PRODUCT_TYPE'];
    return $prodType;


    $price = $row ['PRICE'];
    return $price;

    $quantity = $row ['QUANTITY'];
    return $quantity;
  endforeach;
}
?>
