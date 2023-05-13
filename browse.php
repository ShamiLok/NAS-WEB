<?php
// Получаем имя запрашиваемой папки
$folder = isset($_GET['folder']) ? $_GET['folder'] : '';

// Проверяем существование папки и ее доступность для чтения
if (is_dir($folder) && is_readable($folder)) {
  // Получаем список файлов и папок
  $folders = array();
  $files = array();
  $handle = opendir($folder);
  
  while ($entry = readdir($handle)) {
    if ($entry != '..') {
      if (is_dir($folder . '\\' . $entry)) {
        $folders[] = $entry;
      } else {
        $files[] = $entry;
      }
    }
  }
  closedir($handle);

  // Отправляем JSON-ответ
  header('Content-Type: application/json');
  echo json_encode(array('folders' => $folders, 'files' => $files));
} else {
  header('HTTP/1.1 404 Not Found');
}
?>
