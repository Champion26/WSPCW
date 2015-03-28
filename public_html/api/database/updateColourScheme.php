<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
if(isset($_POST['pageColour'], $_POST['textColour'], $_POST['navColour'], $_POST['headingColour'] )){
  $page = $_POST['pageColour'];
  $text = $_POST['textColour'];
  $nav = $_POST['navColour'];
  $heading = $_POST['headingColour'];
  echo "working";
  $dbh = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
  $q = "DELETE FROM colourScheme;";
  $delete = $dbh->prepare($q);
  $delete -> execute();
  $sql = "INSERT INTO colourScheme (pageColour, textColour, navColour, headingColour)
          VALUES ('$page', '$text', '$nav', '$heading');";
  $query = $dbh->prepare($sql);

          $query -> execute();
  $db = null;
}
?>
