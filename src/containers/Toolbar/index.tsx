import React, { FC } from "react";
import ToolbarWrapper, { Left, ToolbarIcon } from "./Styles";
import { Button } from "../Styles";
import { FaSignature } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { FiType } from "react-icons/fi";

const Toolbar: FC<any> = ({ onExport }) => {
  return (
    <ToolbarWrapper>
      <Left>
        <ToolbarIcon>
          <FaSignature />
        </ToolbarIcon>
        <ToolbarIcon>
          <MdCheck />
        </ToolbarIcon>
        <ToolbarIcon>
          <FiType />
        </ToolbarIcon>
      </Left>
      <Button onClick={onExport}>Export</Button>
    </ToolbarWrapper>
  );
};

export default Toolbar;
