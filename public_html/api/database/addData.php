<?php
// Connect to MySQL
$link = mysql_connect('localhost', 'root', '');
if (!$link) {
  die('Could not connect: ' . mysql_error());
}

// Make my_db the current database
$db_selected = mysql_select_db('webcw', $link);

if ($db_selected === 0) {
  // If we couldn't, then it either doesn't exist, or we can't see it.
  $sql = file_get_contents("../sql/data.sql");

  if (mysql_query($sql, $link)) {
    echo "Database my_db created successfully\n";
  } else {
    echo 'Error creating database: ' . mysql_error() . "\n";
  }
} else{
  echo "database already exists";
}

mysql_close($link);
?>
