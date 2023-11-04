<?php
function deleteElement($type, $name, $path) {
    $fullPath = $path . '/' . $name; // Полный путь до удаляемого элемента

    if ($type === 'file') {
        if (file_exists($fullPath) && is_file($fullPath)) {
            unlink($fullPath); // Удаляем файл
            return true;
        }
    } elseif ($type === 'folder') {
        if (file_exists($fullPath) && is_dir($fullPath)) {
            $files = glob($fullPath . '/*'); // Получаем список файлов и папок внутри удаляемой папки
            foreach ($files as $file) {
                is_dir($file) ? deleteElement('folder', basename($file), $fullPath) : deleteElement('file', basename($file), $fullPath);
            }
            rmdir($fullPath); // Удаляем пустую папку
            return true;
        }
    }

    return false; // Возвращаем false, если удаление не удалось или элемент не существует
}

// Пример использования:
$type = isset($_POST['deleteElementType']) ? $_POST['deleteElementType'] : '';
$name = isset($_POST['deleteElementName']) ? $_POST['deleteElementName'] : '';
$path = isset($_POST['path']) ? $_POST['path'] : '';

if (!empty($type) && !empty($name) && !empty($path)) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');

    if (deleteElement($type, $name, $path)) {
        echo 'Элемент успешно удален.';
    } else {
        echo 'Не удалось удалить элемент.';
    }
}
?>
