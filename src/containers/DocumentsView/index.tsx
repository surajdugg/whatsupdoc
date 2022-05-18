import React, { FC, useState } from "react";
import { Document } from "react-pdf";
import PDFWrapper, { PageWrapper } from "./Styles";
import PDFTools from "./PDFTools";
import PageComponent from "./PageComponent";

const DocumentViewer: FC<any> = ({
  activeTool,
  docPath,
  content,
  onContent,
}) => {
  const [numPages, setNumPages] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <PDFWrapper>
      <Document file={docPath} onLoadSuccess={handleDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <PageWrapper key={`page_${index + 1}`}>
            <PageComponent pageNumber={index + 1} />
            <PDFTools
              activeTool={activeTool}
              index={index}
              content={content}
              onContent={onContent}
            />
          </PageWrapper>
        ))}
      </Document>
    </PDFWrapper>
  );
};

export default DocumentViewer;
