declare module 'react-file-viewer' {
  import { Component } from 'react';

  interface FileViewerProps {
    fileType: string;
    filePath: string;
    errorComponent?: React.ReactNode;
    onError?: (error: Error) => void;
    unsupportedComponent?: React.ReactNode;
    onLoad?: (event: { message: string; success: boolean }) => void;
  }

  const FileViewer: React.ComponentType<FileViewerProps>;
  export default FileViewer;
}