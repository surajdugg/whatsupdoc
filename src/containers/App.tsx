import React, { useRef, useState } from "react";
import Modal from "../components/Modal";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<number>(0);
  const [content, setContent] = useState<IContent[]>([]);
  const [activePage, setActivePage] = useState<number>(0);
  const mainRef = useRef<any>(null);

  const handleExport = () => {
    if (mainRef.current) {
      const allCanvases = Array.from(
        mainRef.current.children[1].firstChild.children
      );
      const lastIndex = allCanvases.length - 1;
      const pdf = new jsPDF();

      allCanvases.forEach((item: any, index) => {
        const isLast = index === lastIndex;
        const canvas = item.getElementsByTagName("canvas")[0];
        const pageContent = content.filter((item: any) => item.index === index);

        if (pageContent.length) {
          const ctx = canvas.getContext("2d");

          pageContent.forEach((item: any) => {
            if (item.text) {
              ctx.font = "16px/1.1 helvetica";
              ctx.fillText(item.text, item.x - 1, item.y + 13);
            }

            if (item.path) {
              ctx.drawImage(
                document.getElementById("Checkmark"),
                item.x,
                item.y
              );
            }
          });
        }

        let width = canvas.width;
        let height = canvas.height;

        //then we get the dimensions from the 'pdf' file itself
        width = pdf.internal.pageSize.getWidth();
        height = pdf.internal.pageSize.getHeight();
        pdf.internal.scaleFactor = 1.5;
        pdf.addImage(canvas, "PNG", 0, 0, width, height);

        if (!isLast) {
          pdf.addPage();
        }
      });

      pdf.save("download.pdf");
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

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Container>
        <SidebarView
          activePage={activePage}
          docPath={DOCUMENT_PATH}
          onScrollTo={handleScrollTo}
        />
        <Main ref={mainRef}>
          <Toolbar
            activeTool={activeTool}
            onOpen={handleOpen}
            onExport={handleExport}
            onSetActiveTool={setActiveTool}
          />
          <DocumentsView
            activeTool={activeTool}
            docPath={DOCUMENT_PATH}
            content={content}
            onContent={setContent}
          />
        </Main>
      </Container>
      <Modal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default App;
