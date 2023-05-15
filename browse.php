<?php
$folder = isset($_GET['folder']) ? $_GET['folder'] : '';

// Проверяем существование папки и ее доступность для чтения
if (is_dir($folder) && is_readable($folder)) {
  // Получаем список файлов и папок
  $folders = array();
  $files = array();
  $fileSize = array();
  $handle = opendir($folder);
  
  while ($entry = readdir($handle)) {
    if ($entry != '..') {
      if (is_dir($folder . '\\' . $entry)) {
        $folders[] = $entry;
      } else {
        $files[] = $entry;
        $fileSize[] = filesize($folder . '\\' . $entry);
      }
    }
  }
  closedir($handle);

  // Отправляем JSON-ответ
  header('Content-Type: application/json');
  echo json_encode(array('folders' => $folders, 'files' => $files, 'fileSize' => $fileSize));
} else {
  header('HTTP/1.1 404 Not Found');
}
?>
