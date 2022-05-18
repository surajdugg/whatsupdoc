import React, { FC } from "react";
import ToolbarWrapper from "./Styled";
import { Button } from "../Styled";

const Toolbar: FC<any> = ({ onExport }) => {
  return (
    <ToolbarWrapper>
      <Button onClick={onExport}>Export</Button>
    </ToolbarWrapper>
  );
};

export default Toolbar;
