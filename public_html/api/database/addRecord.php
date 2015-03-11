
<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
}
?>
