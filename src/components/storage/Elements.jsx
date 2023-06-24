import React from "react";

function Elements(props) {
  const { folders, files, path, handleFolderClick, fileSize } = props;

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
            {link}
          </div>
        );
      })}

      {files.map((file, index) => {
        const filePath = `${path}/${file}`;

        return (
          <div className="file storage_el" key={`file_${index}`}>
            {/* <img src={`/images/icons/${file}.svg`} alt={file} /> */}
            <a href={`http://nas/download.php?file=${encodeURIComponent(filePath)}`}>{file}</a>
            <span>{roundFileSize(fileSize[index])}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Elements;
