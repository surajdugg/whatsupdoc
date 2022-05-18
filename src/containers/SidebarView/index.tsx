import React, { FC, useState } from "react";
import { Document, Page } from "react-pdf";
import Sidebar, { PageCardStyle } from "./Styles";

const SidebarView: FC<any> = ({ activePage, docPath, onScrollTo }) => {
  const [numPages, setNumPages] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Sidebar>
      <Document file={docPath} onLoadSuccess={handleDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <PageCard
            key={`page_${index + 1}`}
            index={index}
            isActive={activePage === index}
            pageNumber={index + 1}
            onScrollTo={onScrollTo}
          />
        ))}
      </Document>
    </Sidebar>
  );
};

const PageCard = ({ index, isActive, pageNumber, onScrollTo }) => {
  const handleScrollTo = () => {
    onScrollTo(index);
  };

  return (
    <PageCardStyle isActive={isActive} onClick={handleScrollTo}>
      <Page
        scale={0.25}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        pageNumber={pageNumber}
      />
    </PageCardStyle>
  );
};

export default SidebarView;
