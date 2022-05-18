import React, { useRef } from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { ICoords } from "../types/ICoords";

const TextAreaStyle = styledTS<ICoords>(styled.textarea)`
  resize: none;
  background: transparent;
  ${({ x, y }) => `transform: translate3d(${x}px, ${y}px, 0);`};
`;

const TextArea = ({ x, y, textAreaRef }) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TextAreaStyle
      x={x}
      y={y}
      autoFocus
      ref={textAreaRef}
      onClick={handleClick}
    />
  );
};

export default TextArea;
