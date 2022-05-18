import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Container, Sidebar, Main, PDFWrapper, PageWrapper } from "./styled";
import PDFContentTools from "./PDFContentTools";

const App = () => {
  const [numPages, setNumPages] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Container>
      <Sidebar>Sidebar</Sidebar>
      <Main>
        <PDFWrapper>
          <Document file="/doc.pdf" onLoadSuccess={handleDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <PageWrapper key={`page_${index + 1}`}>
                <Page
                  scale={1.5}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  pageNumber={index + 1}
                />
                <PDFContentTools />
              </PageWrapper>
            ))}
          </Document>
        </PDFWrapper>
      </Main>
    </Container>
  );
};

export default App;
