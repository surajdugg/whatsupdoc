import React, { FC, useState } from "react";
import { Document } from "react-pdf";
import PDFWrapper, { PageWrapper } from "./Styled";
import PDFTools from "./PDFTools";
import PageComponent from "./PageComponent";

const DocumentViewer: FC<any> = ({ docPath, canvasRef }) => {
  const [numPages, setNumPages] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <PDFWrapper>
      <Document file={docPath} onLoadSuccess={handleDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <PageWrapper key={`page_${index + 1}`}>
            <PageComponent canvasRef={canvasRef} pageNumber={index + 1} />
            <PDFTools />
          </PageWrapper>
        ))}
      </Document>
    </PDFWrapper>
  );
};

export default DocumentViewer;
