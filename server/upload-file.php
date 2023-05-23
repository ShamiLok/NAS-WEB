<?php
$file = isset($_FILES['fileName']) ? $_FILES['fileName'] : '';
$tmp_name = $file["tmp_name"];
$name = $file["name"];
$path = $_POST['path'];
if(!file_exists($path . '\\' . $name)) {
    move_uploaded_file($tmp_name, "$path\\$name");
}
echo 'The file was uploaded successfully';
?> 