import styled from "styled-components";

const PDFWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;

  .react-pdf__Page {
    margin-bottom: 1rem;
  }

  .annotationLayer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    > section {
      pointer-events: all;
      position: absolute;
      background: rgba(250, 219, 50, 0.4);
      border: 5px solid rgba(250, 219, 50, 1);
      border-radius: 2px;
      cursor: url("/svg/signature.svg"), auto;
      z-index: 9 !important;

      .popupWrapper {
        display: none;
      }
    }
  }

  canvas {
    box-shadow: 0 0 10px 0px rgba(79, 96, 113, 0.1);
  }
`;

export const PageWrapper = styled.div`
  position: relative;
`;

export default PDFWrapper;
