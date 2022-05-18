import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ICoords } from "../../types/ICoords";
import { IContent } from "../../types/IContent";
import CreatedContent from "./CreatedContent";
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
  const [content, setContent] = useState<IContent[]>([]);
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

  const handleBlur = (newContent: IContent) => {
    setContent([...content, newContent]);
  };

  return (
    <ContentWrapper onClick={handleClick}>
      <CreatedContent content={content} />
      {clickCoords && (
        <TextArea
          {...clickCoords}
          textAreaRef={textAreaRef}
          onBlur={handleBlur}
        />
      )}
    </ContentWrapper>
  );
};

export default PDFContentTools;
