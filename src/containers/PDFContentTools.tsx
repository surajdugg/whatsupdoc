import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ICoords } from "../types/ICoords";
import TextArea from "./TextArea";

type IClickCoordsState = undefined | ICoords;

const ContentWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const PDFContentTools = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [clickCoords, setClickCoords] = useState<IClickCoordsState>(undefined);

  const handleClick = (e: MouseEvent) => {
    const bounds = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    setClickCoords({ x, y });

    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <ContentWrapper onClick={handleClick}>
      {clickCoords && <TextArea {...clickCoords} textAreaRef={textAreaRef} />}
    </ContentWrapper>
  );
};

export default PDFContentTools;
