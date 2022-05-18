import React, { FC, useState, useRef } from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { ICoords } from "../../types/ICoords";
import { IContent } from "../../types/IContent";
import CreatedContent from "./CreatedContent";
import TextArea from "./TextArea";

type IClickCoordsState = undefined | ICoords;

const ContentWrapper = styledTS<{ activeTool: number }>(styled.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  ${({ activeTool }) => {
    if (activeTool === 0) {
      return `cursor: url("/svg/text.svg"), auto`;
    }

    if (activeTool === 1) {
      return `cursor: url("/svg/signature.svg"), auto`;
    }

    if (activeTool === 2) {
      return `cursor: url("/svg/check.svg"), auto`;
    }
  }};
`;

const PDFContentTools: FC<any> = ({
  activeTool,
  index,
  content,
  onContent,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [clickCoords, setClickCoords] = useState<IClickCoordsState>(undefined);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    const bounds = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    setClickCoords({ x, y });

    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }

    if (activeTool === 1) {
      onContent([
        ...content,
        {
          index,
          x,
          y: y - 50,
          type: "signature",
          path: localStorage.getItem("signature"),
        },
      ]);
    }

    if (activeTool === 2) {
      onContent([
        ...content,
        { index, x, y, type: "checkmark", path: "/svg/check.svg" },
      ]);
    }
  };

  const handleBlur = (newContent: IContent) => {
    setClickCoords(undefined);

    if (newContent.text) {
      onContent([...content, newContent]);
    }
  };

  return (
    <ContentWrapper activeTool={activeTool} onClick={handleClick}>
      <CreatedContent
        activeTool={activeTool}
        content={content.filter((item: any) => item.index === index)}
      />
      {clickCoords && activeTool === 0 && (
        <TextArea
          {...clickCoords}
          index={index}
          textAreaRef={textAreaRef}
          onBlur={handleBlur}
        />
      )}
    </ContentWrapper>
  );
};

export default PDFContentTools;
