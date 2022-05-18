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
`;

const CreatedContent: FC<ICreatedContentProps> = ({ content }) => {
  return (
    <div>
      {content.map(({ text, x, y }: IContent) => (
        <ContentNode x={x} y={y}>
          {text}
        </ContentNode>
      ))}
    </div>
  );
};

export default CreatedContent;
