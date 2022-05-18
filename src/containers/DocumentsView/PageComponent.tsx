import React, { FC } from "react";
import { Page } from "react-pdf";

const PageComponent: FC<any> = ({ pageNumber }) => {
  return (
    <Page
      scale={1.5}
      renderTextLayer={false}
      renderAnnotationLayer={false}
      pageNumber={pageNumber}
    />
  );
};

export default PageComponent;
