import styled from "styled-components";

const PDFWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;

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

export default PDFWrapper;
