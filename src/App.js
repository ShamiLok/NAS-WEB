function App() {
  return (
    <div className="App">
      <header>
        <h1>NAS WEB</h1>
        <div id="menu">
          <div id="burger__menu">
            <span></span>
          </div>
          
          <nav id="menu__nav">
            <ul>
              <li>Settings</li>
              <li>Exit</li>
            </ul>
            <div class="menu__empty"></div>
            <div class="menu__theme">
              <span id="menu__theme_text">Enable dark theme</span>
              <input type="checkbox" id="menu__theme_switch" />
              <label for="menu__theme_switch"></label>
            </div>
            <div class="menu__footer">project in development</div>
          </nav>
        </div>
      </header>
      <div class="storage-nav">
        <div id="path"></div>
        <div class="storage-nav__add">
            <a href="#create-folder-popup" id="create-folder" class="popup-link">Create folder</a>
            <a href="#upload-file-popup" id="upload-file" class="popup-link">Upload file</a>
        </div>
        <div class="storage-nav__info">
          <span>Name</span>
          <span>Size</span>
        </div>
        <div id="content"></div>
      </div>
    </div>
  );
}

export default App;
