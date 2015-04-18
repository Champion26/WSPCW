<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
global $length;

$code = $_POST['code'];
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $sql = "SELECT productCode
            FROM product
            WHERE productCode = '$code';";
    foreach ($db->query($sql) as $row) :
      $length = $row.length;
    endforeach;
   
    if ($length >0){
      echo true;
      echo '1';
    }else {
      echo false;
    }

    $db = null;

?>
