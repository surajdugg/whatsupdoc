import React, { useRef, useState } from "react";
import { Container, Main } from "./styled";
import SidebarView from "./SidebarView";
import DocumentsViewer from "./DocumentsView";
import Toolbar from "./Toolbar";

const DOCUMENT_PATH = "/doc.pdf";

const App = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const scrollRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const handleExport = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.font = "20px Georgia";
      ctx.fillText("Hello World!", 10, 50);

      // Convert the Base64 string back to text.
      const byteString = atob(
        canvasRef.current
          .toDataURL()
          .replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
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
    }
  };

  const handleScrollTo = (index: number) => {
    if (scrollRef.current) {
      setActivePage(index);
      const pageTop =
        scrollRef.current.children[1].firstChild.children[index].offsetTop;
      scrollRef.current.scrollTo(0, pageTop);
    }
  };

  return (
    <Container>
      <SidebarView
        activePage={activePage}
        docPath={DOCUMENT_PATH}
        onScrollTo={handleScrollTo}
      />
      <Main ref={scrollRef}>
        <Toolbar onExport={handleExport} />
        <DocumentsViewer docPath={DOCUMENT_PATH} canvasRef={canvasRef} />
      </Main>
    </Container>
  );
};

export default App;
