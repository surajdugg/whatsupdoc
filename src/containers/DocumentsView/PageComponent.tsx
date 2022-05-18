import React, { FC } from "react";
import { Page } from "react-pdf";

const PageComponent: FC<any> = ({ canvasRef, pageNumber }) => {
  const handleRenderSuccess = () => {
    const importPDFCanvas: HTMLCanvasElement = document.querySelector(
      ".react-pdf__Page canvas"
    );

    canvasRef.current = importPDFCanvas;
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

export default PageComponent;
