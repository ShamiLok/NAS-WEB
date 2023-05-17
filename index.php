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
            <form action="" method="post" id="createFolder">
              <label class="create-folder__item create-folder__label" for="folder-name">Сreate a folder</label>
              <input class="create-folder__item create-folder__input" id="folder-name" type="text" placeholder="Folder name" name="folderName" required>
              <button class="create-folder__item create-folder__btn" type="submit" id="send-folder-name">Create</button>
            </form>
          </div>
        </div>
      </div>

      <div id="upload-file-popup" class="popup">
        <div class="popup__body">
          <div class="popup__content">
            <div class="close-popup popup__close">&times</div>
            <form action="" method="post">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui at error nostrum eos dignissimos consequuntur neque odio, aliquam molestiae aliquid ad, deserunt provident quam iste suscipit cupiditate consequatur accusamus necessitatibus?</p>
            </form>
          </div>
        </div>
      </div>

      <script src="scripts/script.js"></script>
      <script src="scripts/popup.js"></script>
    </div>
  </body>
</html>
