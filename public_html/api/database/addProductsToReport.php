<?php
chdir('../../reports/');
echo getcwd();
$code = $_POST['code'];
$name = $_POST['name'];
$quantity = $_POST['quantity'];
$date = $_POST['date'];
$filename = 'stockReport'.$date.'.txt';
$report = fopen($filename, "a");
$newLine = "\r\n";
$productName = "Product Name: ".$name."\r\n";
$productCode = "Product Code: ".$code."\r\n";
$productQuantity = "Quantity: ".$quantity."\r\n";
fwrite($report, $newLine);
fwrite($report, $productCode);
fwrite($report, $productName);
fwrite($report, $productQuantity);
fwrite($report, $newLine);
echo "done";
?>
