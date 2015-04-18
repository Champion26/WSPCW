<?php


$target_path = "images/";

$target_path = $target_path . basename( $_FILES['images']['name']);

if(move_uploaded_file($_FILES['images']['tmp_name'], $target_path)) {
  echo "The file ".  basename( $_FILES['images']['name']).
  " has been uploaded";
} else{
  echo "There was an error uploading the file, please try again!";
}


?>
