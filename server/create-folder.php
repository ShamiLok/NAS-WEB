<?php
$folderName = isset($_POST['folderName']) ? $_POST['folderName'] : '';
$path = $_POST['path'];
if(!is_dir($path . '\\' . $folderName)) {
    mkdir($path . '\\' . $folderName);
}
echo 'The folder has been successfully created';
?>