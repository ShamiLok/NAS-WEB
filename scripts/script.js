const content = document.getElementById('content');
const path = document.getElementById('path');
const createFolder = document.getElementById('create-folder');
const uploadFile = document.getElementById('upload file');

function browseFolder(folderPath) {
  content.innerHTML = '';
  path.innerText = folderPath;

  fetch('../server/browse.php?folder=' + encodeURIComponent(folderPath))
    .then(response => response.json())
    .then(data => {
      // folder
      data.folders.forEach(folder => {
        const link = document.createElement('a');
        const folderEl = document.createElement('div');
        const icon = document.createElement('img');
        const appendfolderEl = content.appendChild(folderEl);

        link.innerText = folder;
        link.href = '#';
        folderEl.className = 'folder storage_el';

        if (folder === '.') {
          link.onclick = function () {
            let folderPathArr = folderPath.split('\\');
            folderPathArr.pop();
            if (folderPathArr.join('\\')) {
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

      // file
      data.files.forEach((file, index) => {
        const fileEl = document.createElement('div');
        const link = document.createElement('a');
        const size = document.createElement('span');
        const icon = document.createElement('img');
        const appendFileEl = content.appendChild(fileEl);
        const extension = data.fileExtension[index];

        const roundfileSize = function (SizeInByte) {
          if (SizeInByte / (1024 * 1024 * 1024) > 1) {
            // gb
            return Math.round((SizeInByte / (1024 * 1024 * 1024)) * 10) / 10 + 'Gb';
          } else if (SizeInByte / (1024 * 1024) > 1) {
            // mb
            return Math.round((SizeInByte / (1024 * 1024)) * 10) / 10 + 'Mb';
          } else if (SizeInByte / 1024 > 1) {
            // kb
            return Math.round((SizeInByte / 1024) * 10) / 10 + 'Kb';
          } else {
            // b
            return SizeInByte + 'b';
          }
        };

        fileEl.className = 'file storage_el';
        link.innerText = file;
        link.href = '../server/download.php?file=' + encodeURIComponent(folderPath + '\\' + file);
        size.innerText = roundfileSize(data.fileSize[index]);
        icon.src = '/images/icons/' + extension + '.svg';

        appendFileEl.appendChild(icon);
        appendFileEl.appendChild(link);
        appendFileEl.appendChild(size);
      });
    });
}

browseFolder('storage');

document.addEventListener("DOMContentLoaded", () => {
  const createFolderStatus = document.getElementById('create-folder-status');
  const uploadFileStatus = document.getElementById('upload-file-status');

  const ajaxSend = async (formData, url, statusElement) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Error ${url}, error status ${response.status}`);
      }
      const data = await response.text();
      statusElement.innerHTML = data;
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  //Folder
  const createFolderForm = document.getElementById("createFolder");
  createFolderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append('path', path.innerHTML);
    ajaxSend(formData, "../server/create-folder.php", createFolderStatus);
    this.reset();
  });

  //File
  const uploadFileForm = document.getElementById("uploadFile");
  uploadFileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append('path', path.innerHTML);
    ajaxSend(formData, "../server/upload-file.php", uploadFileStatus);
    this.reset();
  });
});