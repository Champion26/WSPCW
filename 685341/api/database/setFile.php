<?php
echo getcwd();
chdir('../../reports/');
echo getcwd();
$title = $_POST['title'];
$author = $_POST['author'];
$date = $_POST['date'];
$filename = 'stockReport'.$date.'.txt';
echo $filename."\n";
$report = fopen($filename, "w");
$pageTitle = "Title: ".$title."\n";
$pageAuthor = "Author: ".$author."\n";
$pageDate = "Date: ".$date."\n";
$newLine = "\r\n";
fwrite($report, $pageTitle);
fwrite($report, $newLine);
fwrite($report, $pageAuthor);
fwrite($report, $newLine);
fwrite($report, $pageDate);
fwrite($report, $newLine);
echo $filename;
?>
