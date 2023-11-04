import React, { useState, useEffect } from "react";
import axios from 'axios';
import Elements from "./Elements";
import Popup from "../Popup";
import { createFolder, uploadFile } from "../../services/AxiosSend";

const Storage = () => {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState('');
  const [serverIsAvailable, setServerIsAvailable] = useState(true);
  const [fileSize, setFileSize] = useState([]);
  const [modalCreateActive, setModalCreateActive] = useState(false);
  const [modalUploadActive, setModalUploadActive] = useState(false);
  const [createFolderStatus, setCreateFolderStatus] = useState('');
  const [uploadFileStatus, setUploadFileStatus] = useState('');
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');


  const rootPath = 'storage';

  useEffect(() => {
    browseFolder(rootPath);
  }, []);

  const browseFolder = (folderPath) => {
    axios
      .get(`http://localhost:8000/browse.php?folder=${encodeURIComponent(folderPath)}`, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        const { folders, files, fileSize } = response.data;
        setFolders(folders);
        setFiles(files);
        setPath(folderPath);
        setServerIsAvailable(true);
        setFileSize(fileSize);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.error(error);
        }
        setServerIsAvailable(false);
      });
  };

  const handleFolderClick = (folder) => {
    const folderPath = folder === '.' ? getParentFolderPath(path) : `${path}/${folder}`;
    browseFolder(folderPath);
  };

  const getParentFolderPath = (path) => {
    const folderPathArr = path.split('/');
    folderPathArr.pop();
    return folderPathArr.join('/');
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const formData = new FormData()
      formData.append('path', path);
      formData.append('folderName', folderName);
      await createFolder(formData);
      setCreateFolderStatus('Folder created successfully.');
      browseFolder(path);
      setTimeout(() => {
        setModalCreateActive(false);
        setCreateFolderStatus('')
        setFolderName('');
      }, 1000)
    } catch (error) {
      console.error(error);
      setCreateFolderStatus('Error creating folder.');
    }
    
  };
  
  const handleUploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('path', path);
      formData.append('fileName', file);
      await uploadFile(formData);
      setUploadFileStatus('File uploaded successfully.');
      browseFolder(path);
      setTimeout(() => {
        setModalUploadActive(false);
        setCreateFolderStatus('')
        setFileName('');
      }, 1000)
    } catch (error) {
      console.error(error);
      setUploadFileStatus('Error uploading file.');
    }
    
  };

  if (serverIsAvailable) {
    return (
      <div className="storage-nav">
        <div id="path">{path}</div>
        <div className="storage-nav__add">
          <a href="#" onClick={() => setModalCreateActive(true)}>Create folder</a>
          <a href="#" onClick={() => setModalUploadActive(true)}>Upload file</a>
        </div>
        <div className="storage-nav__info">
          <span>Name</span>
          <span>Size</span>
        </div>
        <Elements folders={folders} files={files} path={path} fileSize={fileSize} handleFolderClick={handleFolderClick} browseFolder={browseFolder}/>
        <Popup active={modalCreateActive} setActive={setModalCreateActive}>
          <form action="" method="post" id="createFolder" className="popup__form" onSubmit={(e) => { e.preventDefault(); handleCreateFolder(e.target.folderName.value)}}>
            <label className="popup__form__item popup__form__label" htmlFor="folder-name">Create a folder</label>
            <input className="popup__form__item popup__form__input" id="folder-name" type="text" placeholder="Folder name" name="folderName" required 
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}/>
            <div id="create-folder-status" className="popup__form__status">{createFolderStatus}</div>
            <button className="popup__form__item popup__form__btn" type="submit">Create</button>
          </form>
        </Popup>
        <Popup active={modalUploadActive} setActive={setModalUploadActive}>
          <form action="" method="post" id="uploadFile" className="popup__form" onSubmit={(e) => { e.preventDefault(); handleUploadFile(e.target.fileName.files[0])}}>
            <label className="popup__form__item popup__form__label" htmlFor="select-file">Upload file</label>
            <input className="popup__form__item popup__form__input" id="select-file" type="file" name="fileName" required 
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}/>
            <div id="upload-file-status" className="popup__form__status">{uploadFileStatus}</div>
            <button className="popup__form__item popup__form__btn" type="submit">Upload</button>
          </form>
        </Popup>
            
      </div>
    );
  } else {
    return (
      <div className="server-unavailable">
        Сервер недоступен или возникла ошибка на сервере
      </div>
    );
  }
};

export default Storage;