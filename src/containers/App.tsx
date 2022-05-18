import React, { useRef, useState } from "react";
import { Container, Main } from "./Styles";
import SidebarView from "./SidebarView";
import DocumentsView from "./DocumentsView";
import Toolbar from "./Toolbar";
import { IContent } from "../types/IContent";

let jsPDF;

if (typeof window !== "undefined") {
  jsPDF = require("jsPDF");
}

const DOCUMENT_PATH = "/doc.pdf";

const App = () => {
  const [content, setContent] = useState<IContent[]>([]);
  const [activePage, setActivePage] = useState<number>(0);
  const mainRef = useRef<any>(null);

  const handleExport = () => {
    if (mainRef.current) {
      const allCanvases = mainRef.current.children[1].firstChild.children;
      const canvas = allCanvases[0].getElementsByTagName("canvas")[0];
      const pageContent = content.filter((item: any) => item.index === 0);

      if (pageContent.length) {
        const ctx = canvas.getContext("2d");

        pageContent.forEach((item: any) => {
          ctx.font = "16px/1.1 helvetica";
          ctx.fillText(item.text, item.x - 1, item.y + 13);
        });

        let width = canvas.width;
        let height = canvas.height;
        let pdf;

        //set the orientation
        if (width > height) {
          pdf = new jsPDF("l", "px", [width, height]);
        } else {
          pdf = new jsPDF("p", "px", [height, width]);
        }

        //then we get the dimensions from the 'pdf' file itself
        width = pdf.internal.pageSize.getWidth();
        height = pdf.internal.pageSize.getHeight();
        pdf.internal.scaleFactor = 1.5;
        pdf.addImage(canvas, "PNG", 0, 0, width, height);
        pdf.save("download.pdf");
      }
    }
  };

  const handleScrollTo = (index: number) => {
    if (mainRef.current) {
      setActivePage(index);
      const pageTop =
        mainRef.current.children[1].firstChild.children[index].offsetTop;
      mainRef.current.scrollTo(0, pageTop - 100);
    }
  };

  return (
    <Container>
      <SidebarView
        activePage={activePage}
        docPath={DOCUMENT_PATH}
        onScrollTo={handleScrollTo}
      />
      <Main ref={mainRef}>
        <Toolbar onExport={handleExport} />
        <DocumentsView
          docPath={DOCUMENT_PATH}
          content={content}
          onContent={setContent}
        />
      </Main>
    </Container>
  );
};

export default App;
