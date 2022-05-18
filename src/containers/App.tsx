import React, { FC, useState } from "react";
import { Document, Page } from "react-pdf";
import {
  Container,
  Sidebar,
  Main,
  Toolbar,
  Button,
  PDFWrapper,
  PageWrapper,
} from "./styled";
import PDFContentTools from "./PDFContentTools";

// HACK
let canvas;

const App = () => {
  const [numPages, setNumPages] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleExport = () => {
    const ctx = canvas.getContext("2d");
    ctx.font = "20px Georgia";
    ctx.fillText("Hello World!", 10, 50);

    // Convert the Base64 string back to text.
    const byteString = atob(
      canvas.toDataURL().replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
    );

    // Convert that text into a byte array.
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Blob for saving.
    const blob = new Blob([ia], { type: "image/png" });
    document.location.href = window.URL.createObjectURL(blob);
  };

  return (
    <Container>
      <Sidebar>Sidebar</Sidebar>
      <Main>
        <Toolbar>
          <Button onClick={handleExport}>Export</Button>
        </Toolbar>
        <PDFWrapper>
          <Document file="/doc.pdf" onLoadSuccess={handleDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <PageWrapper key={`page_${index + 1}`}>
                <PageComponent pageNumber={index + 1} />
                <PDFContentTools />
              </PageWrapper>
            ))}
          </Document>
        </PDFWrapper>
      </Main>
    </Container>
  );
};

const PageComponent: FC<any> = ({ pageNumber }) => {
  const handleRenderSuccess = () => {
    const importPDFCanvas: HTMLCanvasElement = document.querySelector(
      ".react-pdf__Page canvas"
    );

    canvas = importPDFCanvas;
    // const pdfAsImageSrc = importPDFCanvas.toDataURL();
  };

  return (
    <Page
      scale={1.5}
      renderTextLayer={false}
      renderAnnotationLayer={false}
      pageNumber={pageNumber}
      onRenderSuccess={handleRenderSuccess}
    />
  );
};

export default App;
