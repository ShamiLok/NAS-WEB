import React from "react";
import { PiFileHtmlThin, PiFileDocThin, PiFileJpgThin, PiFileJsThin, PiFileTsThin, PiFileVueThin, PiFileZipThin, PiFileCsvThin, PiFilePngThin, PiFilePdfThin, PiFilePptThin, PiFileThin, PiFileVideoThin, PiFileCssThin } from 'react-icons/pi';

class FileIcon extends React.Component {
    render() {
        const { file } = this.props;
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
    }
}

export default FileIcon;
