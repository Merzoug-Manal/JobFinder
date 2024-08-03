import React from 'react';

const PDFViewer = ({ fileUrl }) => {
  return (
    <div>
      <iframe src={fileUrl} width="100%" height="600px" title="PDF Viewer" />
    </div>
  );
};

export default PDFViewer;
