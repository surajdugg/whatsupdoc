import React, { FC, useState } from "react";
import styled from "styled-components";
import { Document, Page } from "react-pdf";
import Sidebar, { PageCard } from "./Styled";

const SidebarView: FC<any> = ({ docPath }) => {
  const [numPages, setNumPages] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Sidebar>
      <Document file={docPath} onLoadSuccess={handleDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <PageCard>
            <Page
              key={`page_${index + 1}`}
              scale={0.25}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              pageNumber={1}
              onRenderSuccess={() => {}}
            />
          </PageCard>
        ))}
      </Document>
    </Sidebar>
  );
};

export default SidebarView;
