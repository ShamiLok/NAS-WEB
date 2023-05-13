const content = document.getElementById('content');
const path = document.getElementById('path');

function browseFolder(folderPath) {
  // Очищаем содержимое контейнера
  content.innerHTML = '';

  // Отображаем путь
  path.innerText = folderPath;

  // Отправляем AJAX-запрос на сервер
  const xhr = new XMLHttpRequest();
  //инициализация запроса
  xhr.open('GET', 'browse.php?folder=' + encodeURIComponent(folderPath), true);

  // обработчик события свойства readyState
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        //folder
        response.folders.forEach(function (folder) {
          const link = document.createElement('a');
          const folderEl = document.createElement('div');
          folderEl.className = 'folder storage_el';
          link.innerText = folder;
          link.href = '#';
          if(folder == '.') {
            link.onclick = function () {
              let folderPathArr = folderPath.split('\\');
              folderPathArr.pop();
              browseFolder(folderPathArr.join('\\'));
              return false;
            };
          } else {
            link.onclick = function () {
              browseFolder(folderPath + '\\' + folder);
              return false;
           };
          }
          content.appendChild(folderEl).appendChild(link);
        });

        //file
        response.files.forEach(function (file, index) {
          const fileEl = document.createElement('div');
          const link = document.createElement('a');
          const size = document.createElement('span');
          size.innerText = response.fileSize[index] + ' Bytes'
          fileEl.className = 'file storage_el';
          link.innerText = file;
          link.href = 'download.php?file=' + encodeURIComponent(folderPath + '\\' + file);
          let b = content.appendChild(fileEl)
          b.appendChild(link);
          b.appendChild(size);
        });
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(null);
}

browseFolder('storage');