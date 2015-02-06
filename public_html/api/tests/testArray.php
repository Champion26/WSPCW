<?php
$names = array('Steve', 'Dave', 'Matt', 'James');
foreach ($names as &$value){
   print $value. ' ';
}
?>
