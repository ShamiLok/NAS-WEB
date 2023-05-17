<?php
$folderName = isset($_POST['folderName']) ? $_POST['folderName'] : '';
$path = $_POST['path'];
$folderName = $_POST['folderName'];
print_r($path . '\\' . $folderName);
mkdir($path . '\\' . $folderName);
header("Location: index.php");
