import React from "react";
import axios from 'axios';
import Elements from "./Elements";

class Storage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      files: [],
      path: '',
      serverIsAvailable: true,
      fileSize: []
    };
  }

  rootPath = 'storage';

  componentDidMount() {
    this.browseFolder(this.rootPath);
  }

  browseFolder(folderPath) {
    axios
      .get(`http://nas/browse.php?folder=${encodeURIComponent(folderPath)}`, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        const { folders, files, fileSize } = response.data;
        this.setState({
          folders,
          files,
          path: folderPath,
          serverIsAvailable: true,
          fileSize
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.error(error);
        }
        this.setState({ serverIsAvailable: false });
      });
  }

  handleFolderClick = (folder) => {
    const { path } = this.state;
    const folderPath = folder === '.' ? this.getParentFolderPath(path) : `${path}\\${folder}`;
    this.browseFolder(folderPath);
  };

  getParentFolderPath(path) {
    const folderPathArr = path.split('\\');
    folderPathArr.pop();
    return folderPathArr.join('\\');
  }

  render() {
    const { serverIsAvailable, path, folders, files, fileSize } = this.state; // Добавлено fileSize

    if (serverIsAvailable) {
      return (
        <div className="storage-nav">
          <h1>{!serverIsAvailable && 'asd'}</h1>
          <div id="path">{path}</div>
          <div className="storage-nav__add">
            <a href="#create-folder-popup" id="create-folder" className="popup-link">Create folder</a>
            <a href="#upload-file-popup" id="upload-file" className="popup-link">Upload file</a>
          </div>
          <div className="storage-nav__info">
            <span>Name</span>
            <span>Size</span>
          </div>
          <Elements folders={folders} files={files} path={path} fileSize={fileSize} handleFolderClick={this.handleFolderClick} /> {/* Передача fileSize в Elements */}
        </div>
      );
    } else {
      return (
        <div className="server-unavailable">
          Сервер недоступен или возникла ошибка на сервере
        </div>
      );
    }
  }
}

export default Storage;
