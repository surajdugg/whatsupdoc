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

  const handleDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  return (
    <PDFWrapper>
      <Document file={docPath} onLoadSuccess={handleDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <PageWrapper key={`page_${index + 1}`}>
            <PageComponent
              pageNumber={index + 1}
              index={index}
              content={content}
              onContent={onContent}
            >
              <PDFTools
                index={index}
                content={content}
                activeTool={activeTool}
                onContent={onContent}
              />
            </PageComponent>
          </PageWrapper>
        ))}
      </Document>
    </PDFWrapper>
  );
};

export default DocumentViewer;
