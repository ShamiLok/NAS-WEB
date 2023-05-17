<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>NAS WEB</title>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/popup.css">
  </head>
  <body>
    <div class="wrapper">
      <h1>NAS WEB</h1>
      <div class="storage-nav">
        <div id="path"></div>
        <div class="storage-nav__add">
            <a href="#create-folder-popup" id="create-folder" class="popup-link">Create folder</a>
            <a href="#upload-file-popup" id="upload file" class="popup-link">Upload file</a>
        </div>
        <div class="storage-nav__info">
          <span>Name</span>
          <span>Size</span>
        </div>
        <div id="content"></div>
      </div>

      <div id="create-folder-popup" class="popup">
        <div class="popup__body">
          <div class="popup__content">
            <div class="close-popup popup__close">&times</div>
            <form action="" method="post" id="createFolder" class="popup-form">
              <label class="popup-form__item popup-form__label" for="folder-name">Сreate a folder</label>
              <input class="popup-form__item popup-form__input" id="folder-name" type="text" placeholder="Folder name" name="folderName" required>
              <button class="popup-form__item popup-form__btn" type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>

      <div id="upload-file-popup" class="popup">
        <div class="popup__body">
          <div class="popup__content">
            <div class="close-popup popup__close">&times</div>
            <form action="" method="post" id="uploadFile" class="popup-form">
              <label class="popup-form__item popup-form__label" for="select-file">Upload file</label>
              <input class="popup-form__item popup-form__input" id="select-file" type="file" name="fileName" required>
              <button class="popup-form__item popup-form__btn" type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>

      <script src="scripts/script.js"></script>
      <script src="scripts/popup.js"></script>
    </div>
  </body>
</html>
