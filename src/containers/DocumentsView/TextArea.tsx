import React, { FC } from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { ICoords } from "../../types/ICoords";

const TextAreaStyle = styledTS<ICoords>(styled.textarea)`
  resize: none;
  background: transparent;
  font-family: helvetica;
  font-size: 1rem;
  ${({ x, y }) => `transform: translate3d(${x}px, ${y}px, 0);`};
`;

const TextArea: FC<any> = ({ index, x, y, textAreaRef, onBlur }) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleBlur = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.value;

      onBlur({ x, y, text, index, type: "text" });
      textAreaRef.current.value = "";
    }
  };

  return (
    <TextAreaStyle
      x={x}
      y={y}
      autoFocus
      ref={textAreaRef}
      onClick={handleClick}
      onBlur={handleBlur}
    />
  );
};

export default TextArea;
