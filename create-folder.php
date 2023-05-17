<?php
$folderName = isset($_POST['folderName']) ? $_POST['folderName'] : '';
$path = $_POST['path'];
mkdir($path . '\\' . $folderName);
header("Location: index.php");
?>