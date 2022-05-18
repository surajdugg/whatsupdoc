import React, { useRef, useState } from "react";
import Modal from "../components/Modal";
import { Container, Main } from "./Styles";
import SidebarView from "./SidebarView";
import DocumentsView from "./DocumentsView";
import Toolbar from "./Toolbar";
import { IContent } from "../types/IContent";

let jsPDF: any;

if (typeof window !== "undefined") {
  jsPDF = require("jspdf");
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
      const pdf = new jsPDF("p", "px", [
        (allCanvases[0] as any).offsetWidth,
        (allCanvases[0] as any).offsetHeight,
      ]);

      allCanvases.forEach((item: any, index) => {
        const isLast = index === lastIndex;
        const canvas = item.getElementsByTagName("canvas")[0];
        const canvasCopy = document.createElement("canvas");

        const scale = canvas.width / canvas.parentElement.offsetWidth;

        canvasCopy.width = canvas.width;
        canvasCopy.height = canvas.height;
        const pageContent = content.filter((item: any) => item.index === index);
        const ctx = canvasCopy.getContext("2d");
        ctx.drawImage(canvas, 0, 0);

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        if (pageContent.length) {
          pageContent.forEach((item: any, index: number) => {
            if (item.text) {
              ctx.font = `${16 * scale}px/1.1 helvetica`;
              ctx.fillText(
                item.text,
                (item.x - 1) * scale,
                (item.y + 13) * scale
              );
            }

            if (item.path && item.type === "signature") {
              // TODO: Signature w/h should not be hardcoded
              const signature = document.getElementById(
                `Signature_${index}`
              ) as any;

              ctx.drawImage(
                signature,
                item.x * scale,
                item.y * scale,
                350 * scale,
                125 * scale
              );
            }

            if (item.path && item.type === "checkmark") {
              const checkmark = document.getElementById("Checkmark") as any;

              ctx.drawImage(
                checkmark,
                item.x * scale,
                item.y * scale,
                checkmark.width * scale,
                checkmark.height * scale
              );
            }
          });
        }

        pdf.addImage(canvasCopy, "PNG", 0, 0, width, height);

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
