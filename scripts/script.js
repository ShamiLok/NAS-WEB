const content = document.getElementById('content');
const path = document.getElementById('path');
const createFolder = document.getElementById('create-folder');
const uploadFile = document.getElementById('upload file');

function browseFolder(folderPath) {
  content.innerHTML = '';
  path.innerText = folderPath;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'browse.php?folder=' + encodeURIComponent(folderPath));

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      //folder
      response.folders.forEach(function (folder) {
        const link = document.createElement('a');
        const folderEl = document.createElement('div');
        const icon = document.createElement('img');
        const appendfolderEl = content.appendChild(folderEl);

        link.innerText = folder;
        link.href = '#';
        folderEl.className = 'folder storage_el';

        if(folder == '.') {
          link.onclick = function () {
            let folderPathArr = folderPath.split('\\');
            folderPathArr.pop();
            if(folderPathArr.join('\\')) {
              browseFolder(folderPathArr.join('\\')); 
            }
            return false;
          };
        } else {
          icon.src = '/images/icons/folder.svg';
          appendfolderEl.appendChild(icon);
          link.onclick = function () {
            browseFolder(folderPath + '\\' + folder);
            return false;
          };
        }

        appendfolderEl.appendChild(link);
      });

      //file
      response.files.forEach(function (file, index) {
        const fileEl = document.createElement('div');
        const link = document.createElement('a');
        const size = document.createElement('span');
        const icon = document.createElement('img');
        const appendFileEl = content.appendChild(fileEl);
        const extension = response.fileExtension[index];

        const fileSize = function() {
          if((response.fileSize[index] / (1024 * 1024 * 1024)) > 1){
            //gb
            return Math.round((response.fileSize[index] / (1024 * 1024 * 1024)) * 10) / 10 + 'Gb';
          } else if((response.fileSize[index] / (1024 * 1024)) > 1) {
            //mb
            return Math.round((response.fileSize[index] / (1024 * 1024)) * 10) / 10 + 'Mb';
          } else if((response.fileSize[index] / 1024) > 1) {
            //kb
            return Math.round((response.fileSize[index] / 1024) * 10) / 10 + 'Kb';
          } else {
            //b
            return response.fileSize[index] + 'b';
          }
        }

        fileEl.className = 'file storage_el';
        link.innerText = file;
        link.href = 'download.php?file=' + encodeURIComponent(folderPath + '\\' + file);
        size.innerText = fileSize()
        icon.src = '/images/icons/' + extension +'.svg';

        appendFileEl.appendChild(icon);
        appendFileEl.appendChild(link);
        appendFileEl.appendChild(size);
      });
    }
  }
  xhr.send(null);
}

browseFolder('storage');

//create a folder
document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById('create-folder-status');

  const ajaxSend = async (formData) => {
      const response = await fetch("create-folder.php", {
          method: "POST",
          body: formData
      });
      if (!response.ok) {
          throw new Error(`Error ${url}, error status ${response.status}`);
      }
      return await response.text();
  };

  const form = document.getElementById("createFolder");

  form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      formData.append('path', path.innerHTML)
      ajaxSend(formData)
          .then((response) => {
              status.innerHTML = response;
              console.log(response);
              form.reset();
          })
          .catch((err) => console.error(err))
  });
  

});

// upload file

document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById('upload-file-status')

  const ajaxSend = async (formData) => {
      const response = await fetch("upload-file.php", {
          method: "POST",
          body: formData
      });
      if (!response.ok) {
          throw new Error(`Error ${url}, error status ${response.status}`);
      }
      return await response.text();
  };

  const form = document.getElementById("uploadFile");

  form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      formData.append('path', path.innerHTML)
      ajaxSend(formData)
          .then((response) => {
              status.innerHTML = response;
              console.log(response);
              form.reset();
          })
          .catch((err) => console.error(err))
  });

});