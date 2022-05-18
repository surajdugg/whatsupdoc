import React, { FC } from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { ICoords } from "../../types/ICoords";
import { IContent } from "../../types/IContent";

interface ICreatedContentProps {
  content: IContent[];
  activeTool: number;
}

const ContentNode = styledTS<ICoords & { type: string }>(styled.div)`
  ${({ x, y }) => `transform: translate3d(${x}px, ${y}px, 0);`};
  display: inline-block;
  position: absolute;

  ${({ type }) => {
    if (type === "signature") {
      return `
        pointer-events: none;
        img {
          max-width: 50%
        }
      `;
    }

    if (type === "checkmark") {
      return `pointer-events: none`;
    }
  }};
`;

const CreatedContent: FC<ICreatedContentProps> = ({ content, activeTool }) => {
  return (
    <>
      {content.map(({ text, type, path, x, y }: IContent, index: number) => (
        <ContentNode key={index} type={type} x={x} y={y}>
          {text && type === "text" && text}
          {path && type === "signature" && (
            <img id={`Signature_${index}`} src={path} />
          )}
          {path && type === "checkmark" && <img id="Checkmark" src={path} />}
        </ContentNode>
      ))}
    </>
  );
};

export default CreatedContent;
