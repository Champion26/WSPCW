<?php
global $range;
$range = [];
$hostname = 'localhost';

/*** mysql username ***/
$username = 'root';

/*** mysql password ***/
$password = '';
    global $i;
    $i = 0;
    $db = new PDO("mysql:host=$hostname;dbname=webcw", $username, $password);
    $sql = "SELECT pageColour, textColour, navColour, headingColour
            FROM colourScheme;";
    foreach ($db->query($sql) as $row) :
    if ($i >= 1){
       break;
    }
      $page = $row ['pageColour'];
      $text = $row ['textColour'];
      $nav = $row ['navColour'];
      $heading = $row ['headingColour'];

      $scheme = array($page, $text, $nav, $heading);
      $range[] = $scheme;
    $i++;
    endforeach;

    echo json_encode($range);
    $db = null;

?>
