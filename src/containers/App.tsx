import React, { useRef } from "react";
import { Container, Main } from "./styled";
import SidebarView from "./SidebarView";
import DocumentsViewer from "./DocumentsView";
import Toolbar from "./Toolbar";

const DOCUMENT_PATH = "/doc.pdf";

const App = () => {
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

  return (
    <Container>
      <SidebarView docPath={DOCUMENT_PATH} />
      <Main>
        <Toolbar onExport={handleExport} />
        <DocumentsViewer docPath={DOCUMENT_PATH} canvasRef={canvasRef} />
      </Main>
    </Container>
  );
};

export default App;
