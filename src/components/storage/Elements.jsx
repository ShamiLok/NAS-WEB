import React, { useState } from "react";
import ElementIcon from "./ElementIcon";
import { deleteElement } from "../../services/DeleteElement";
import Popup from "../Popup";
import { AiOutlineDelete } from 'react-icons/ai';

function Elements(props) {
  const { folders, files, path, handleFolderClick, fileSize, browseFolder } = props;
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [deleteElementType, setDeleteElementType] = useState('')
  const [deleteElementName, setDeleteElementName] = useState('')

  const roundFileSize = (sizeInBytes) => {
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
  };

  const deleteElementHandler = () => {
    deleteElement({deleteElementType, deleteElementName, path})
    browseFolder(path)
    setModalDeleteActive(false)
  }

  return (
    <div id="content">
      {folders.map((folder, index) => {
        const isRootFolder = (!path || path === 'storage');
        const isCurrentFolder = (path !== 'storage');
        const isLinkDot = (folder === '.' && isCurrentFolder);

        if (isRootFolder && folder === '.') {
          return null;
        }

        const link = isLinkDot ? (
          <a href="#/" onClick={() => handleFolderClick(folder)}>.</a>
        ) : (
          <a href="#/" onClick={() => handleFolderClick(folder)}>{folder}</a>
        );
 
        return (
          <div className="folder storage_el" key={`folder_${index}`}>
            <ElementIcon type='folder'/>
            {link}
            <div className="storage__el-actions">
              <a href="#" onClick={() => {setModalDeleteActive(true); setDeleteElementType('folder'); setDeleteElementName(folder)}}>
                <AiOutlineDelete />
              </a>
            </div>
          </div>
        );
      })}

      {files.map((file, index) => {
        const filePath = `${path}/${file}`;

        return (
          <div className="file storage_el" key={`file_${index}`}>
            <ElementIcon file={file} type='file'/>
            <a href={`http://nas/download.php?file=${encodeURIComponent(filePath)}`}>{file}</a>
            <div className="storage__el-actions">
              <span>{roundFileSize(fileSize[index])}</span>
              <a href="#" onClick={() => {setModalDeleteActive(true); setDeleteElementType('file'); setDeleteElementName(file)}}>
                <AiOutlineDelete />
              </a>
              
            </div>
          </div>
        );
      })}

      <Popup active={modalDeleteActive} setActive={setModalDeleteActive}>
        <div className="popup__delete">
          <h3>Are you sure you want to delete the folder?</h3>
          <div className="popup__button-block">
            <button onClick={() => {deleteElementHandler()}}>Yes</button>
            <button onClick={() => {setModalDeleteActive(false)}}>No</button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Elements;
