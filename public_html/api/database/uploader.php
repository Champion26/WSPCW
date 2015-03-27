<?php

$dir = $_SERVER['DOCUMENT_ROOT'];



$target_path = $_SERVER['DOCUMENT_ROOT']."/WebScripting/WebCW/public_html/images/";
echo $target_path;
$target_path = $target_path . basename( $_FILES['images']['name']);

if(move_uploaded_file($_FILES['images']['tmp_name'], $target_path)) {
    echo "The file ".  basename( $_FILES['images']['name']).
    " has been uploaded";
} else{
    echo "There was an error uploading the file, please try again!";
}


?>
