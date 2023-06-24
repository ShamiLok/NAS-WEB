import React from "react";
import axios from 'axios';

class Storage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      files: [],
      path: '',
      serverIsAvailable: true
    };
  }

  rootPath = 'storage'

  componentDidMount() {
    this.browseFolder(this.rootPath);
  }

  browseFolder(folderPath) {
    axios
      .get(`http://nas/browse.php?folder=${encodeURIComponent(folderPath)}`, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        const { folders, files } = response.data;
        this.setState({
          folders,
          files,
          path: folderPath,
          serverIsAvailable: true
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.error(error);
        }
        this.setState({serverIsAvailable: false})
      });
  }

  roundFileSize(sizeInBytes) {
    if (sizeInBytes / (1024 * 1024 * 1024) > 1) {
      // gb
      return `${Math.round((sizeInBytes / (1024 * 1024 * 1024)) * 10) / 10}Gb`;
    } else if (sizeInBytes / (1024 * 1024) > 1) {
      // mb
      return `${Math.round((sizeInBytes / (1024 * 1024)) * 10) / 10}Mb`;
    } else if (sizeInBytes / 1024 > 1) {
      // kb
      return `${Math.round((sizeInBytes / 1024) * 10) / 10}Kb`;
    } else {
      // b
      return `${sizeInBytes}b`;
    }
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

  renderFolders() {
    const { folders, path } = this.state;
    return folders.map((folder, index) => {
      const link = folder === '.' ? (
        <a href="#/" onClick={() => this.handleFolderClick(folder)}>..</a>
      ) : (
        <a href="#/" onClick={() => this.handleFolderClick(folder)}>{folder}</a>
      );
      return (
        <div className="folder storage_el" key={`folder_${index}`}>
          {link}
        </div>
      );
    });
  }

  renderFiles() {
    const { files } = this.state;
    return files.map((file, index) => {
      // const { name, size, extension } = file;
      return (
        <div className="file storage_el" key={`file_${index}`}>
          {/* <img src={`/images/icons/${file}.svg`} alt={file} /> */}
          <a href={`http://nas/download.php?file=${encodeURIComponent(this.state.path + '/' + file)}`}>{file}</a>
          {/* <span>{this.roundFileSize(file)}</span> */}
        </div>
      );
    });
  }

  render() {
    if(this.state.serverIsAvailable){
      return (
        <div className="storage-nav">
          <h1>{!this.state.serverIsAvailable && 'asd'}</h1>
          <div id="path">{this.state.path}</div>
          <div className="storage-nav__add">
              <a href="#create-folder-popup" id="create-folder" class="popup-link">Create folder</a>
              <a href="#upload-file-popup" id="upload-file" class="popup-link">Upload file</a>
          </div>
          <div className="storage-nav__info">
              <span>Name</span>
              <span>Size</span>
          </div>
          <div id="content">
            {this.renderFolders()}
            {this.renderFiles()}
          </div>
        </div>
      )
    } else {
      return (
        <div className="server-unavailable">
          Сервер недоступен или возникла ошибка на сервере
        </div>
      )
    }
    
    
  }
}

export default Storage;