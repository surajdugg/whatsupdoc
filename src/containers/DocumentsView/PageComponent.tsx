import React, { FC } from "react";
import { Page } from "react-pdf";

const PageComponent: FC<any> = ({
  pageNumber,
  children,
  index,
  content,
  onContent,
}) => {
  const handleClick = (e: any) => {
    const el = e.target;
    const elParent = el.parentElement;
    const check1 = elParent.parentElement.classList.contains(
      "squareAnnotation"
    );
    const check2 = elParent.classList.contains("squareAnnotation");
    const check3 = el.classList.contains("squareAnnotation");

    if ((check1 || check2 || check3) && localStorage.getItem("signatures")) {
      const bounds = el.closest(".annotationLayer").getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const signatures = JSON.parse(localStorage.getItem("signatures"));
      const selectedSignature = JSON.parse(
        localStorage.getItem("selectedSignature")
      );

      onContent([
        ...content,
        {
          index,
          x,
          y: y - 50,
          type: "signature",
          path: signatures[selectedSignature],
        },
      ]);
    }
  };

  return (
    <div onClick={handleClick}>
      <Page
        scale={1.5}
        renderTextLayer={false}
        renderAnnotationLayer={true}
        renderInteractiveForms={true}
        pageNumber={pageNumber}
      >
        {children}
      </Page>
    </div>
  );
};

export default PageComponent;
