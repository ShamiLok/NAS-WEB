<?php
$folderName = isset($_POST['folderName']) ? $_POST['folderName'] : '';
// $folderPath = isset($_POST['folderPath']) ? $_POST['folderPath'] : '';
$path = $_POST['path'];
if(!is_dir($path . '/' . $folderName)) {
    mkdir($path . '/' . $folderName);
}
// echo 'The folder has been successfully created';
// echo $folderName;
echo $path;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
?>
