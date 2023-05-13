<?php
$file = $_GET['file'] ?? '';
$file = realpath($file);

// if ($file === false || strpos($file, 'storage') !== 0 || !is_file($file)) {
//     die('Invalid file');
// }

header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . basename($file) . '"');
header('Content-Length: ' . filesize($file));
readfile($file);