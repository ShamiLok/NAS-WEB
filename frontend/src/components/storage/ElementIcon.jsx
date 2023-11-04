import React from "react";
import { PiFileHtmlThin, PiFileDocThin, PiFileJpgThin, PiFileJsThin, PiFileTsThin, PiFileVueThin, PiFileZipThin, PiFileCsvThin, PiFilePngThin, PiFilePdfThin, PiFilePptThin, PiFileThin, PiFileVideoThin, PiFileCssThin, PiFolderSimpleFill } from 'react-icons/pi';

const ElementIcon = ({ file, type }) => {
  if(type === 'file') {
    const fileExtension = file ? file.split('.').pop().toLowerCase() : null;

    const extensionIconMap = {
      html: PiFileHtmlThin,
      doc: PiFileDocThin,
      jpg: PiFileJpgThin,
      js: PiFileJsThin,
      ts: PiFileTsThin,
      vue: PiFileVueThin,
      zip: PiFileZipThin,
      csv: PiFileCsvThin,
      png: PiFilePngThin,
      pdf: PiFilePdfThin,
      ppt: PiFilePptThin,
      mp4: PiFileVideoThin,
      avi: PiFileVideoThin,
      css: PiFileCssThin
    };
  
    const IconComponent = extensionIconMap[fileExtension] || PiFileThin;
  
    return <IconComponent />;
  } else {
    return <PiFolderSimpleFill />
  }
};

export default ElementIcon;
