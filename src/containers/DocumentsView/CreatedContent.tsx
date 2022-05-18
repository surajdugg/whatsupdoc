import React, { FC } from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { ICoords } from "../../types/ICoords";
import { IContent } from "../../types/IContent";

interface ICreatedContentProps {
  content: IContent[];
}

const ContentNode = styledTS<ICoords>(styled.div)`
  ${({ x, y }) => `transform: translate3d(${x}px, ${y}px, 0);`};
  display: inline-block;
  position: absolute;
`;

const CreatedContent: FC<ICreatedContentProps> = ({ content }) => {
  return (
    <>
      {content.map(({ text, path, x, y }: IContent, index: number) => (
        <ContentNode key={index} x={x} y={y}>
          {text && text}
          {path && <img id="Checkmark" src={path} />}
        </ContentNode>
      ))}
    </>
  );
};

export default CreatedContent;
