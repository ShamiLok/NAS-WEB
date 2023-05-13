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

  // console.log(folder)
  //обработчик события свойства readyState
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        //JSON.parse - получить обьект, а не строку
        const response = JSON.parse(xhr.responseText);
         
        //Отображаем содержимое папки
        // response.folders.forEach(function (folder) {
        //   const link = document.createElement('a');
        //   link.innerText = folder;
        //   link.href = '#';
        //   link.onclick = function () {
        //     browseFolder(folderPath + '\\' + folder);
        //     return false;
        //   };
        //   content.appendChild(link);
        //   content.appendChild(document.createElement('br'));
        // });
        response.folders.forEach(function (folder) {
          const link = document.createElement('a');
          link.innerText = folder;
          link.href = '#';
          if(folder == '.') {
            link.onclick = function () {
              let folderPathArr = folderPath.split('\\')
              folderPathArr.pop()
              browseFolder(folderPathArr.join('\\'));
              return false;
            };
          } else {
            link.onclick = function () {
              browseFolder(folderPath + '\\' + folder);
              return false;
           };
          }
          
          content.appendChild(link);
          content.appendChild(document.createElement('br'));
        });
        
        
        response.files.forEach(function (file) {
          const link = document.createElement('a');
          link.innerText = file;
          link.href = 'download.php?file=' + encodeURIComponent(folderPath + '\\' + file);
          // link.href = 'download.php?file=' + (folderPath + '/' + file);
          content.appendChild(link);
          content.appendChild(document.createElement('br'));
        });
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(null);
}

// Начинаем с корневой папки
browseFolder('storage');


