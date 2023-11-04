<?php
$folder = isset($_GET['folder']) ? $_GET['folder'] : '';
// print($folder);
if (is_dir($folder) && is_readable($folder)) {
  $folders = array();
  $files = array();
  $fileSize = array();
  $handle = opendir($folder);
  
  while ($entry = readdir($handle)) {
    if ($entry != '..') {
      if (is_dir($folder . DIRECTORY_SEPARATOR . $entry)) {
        $folders[] = $entry;
      } else {
        $iconPath = 'images/icons/' . end(explode(".", $entry)) . '.svg';
        $files[] = $entry;
        $fileSize[] = filesize($folder . DIRECTORY_SEPARATOR . $entry);
        //file extension check
        if (is_file($iconPath)) {
          $fileExtension[] = end(explode(".", $entry));
        } else {
          $fileExtension[] = 'file';
        }
      }
    }
  }
  closedir($handle);

  // Отправляем JSON-ответ
  // header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  echo json_encode(array('folders' => $folders, 'files' => $files, 'fileSize' => $fileSize, 'fileExtension' => $fileExtension));
} else {
  header('HTTP/1.1 404 Not Found');
}
?>
