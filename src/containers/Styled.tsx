import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  width: 200px;
`;

export const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  background-color: #e8edf7;
  position: relative;
`;

export const PDFWrapper = styled.div`
  padding: 1rem;

  .react-pdf__Page {
    margin-bottom: 1rem;
  }

  canvas {
    box-shadow: 0 0 10px 0px rgba(79, 96, 113, 0.1);
  }
`;

export const PageWrapper = styled.div`
  position: relative;
`;
