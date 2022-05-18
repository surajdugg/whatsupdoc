import React, { FC } from "react";
import ToolbarWrapper, { Left, ToolbarIcon } from "./Styles";
import { Button } from "../Styles";
import { FaSignature } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { FiType } from "react-icons/fi";

const tools = [{ Icon: FiType }, { Icon: FaSignature }, { Icon: MdCheck }];

const Toolbar: FC<any> = ({ activeTool, onExport, onSetActiveTool }) => {
  return (
    <ToolbarWrapper>
      <Left>
        {tools.map((tool: any, index: number) => (
          <Tool
            key={index}
            index={index}
            active={activeTool === index}
            Icon={tool.Icon}
            onSetActiveTool={onSetActiveTool}
          />
        ))}
      </Left>
      <Button onClick={onExport}>Export</Button>
    </ToolbarWrapper>
  );
};

const Tool = ({ Icon, active, index, onSetActiveTool }) => {
  const handleSetActiveTool = () => {
    onSetActiveTool(index);
  };

  return (
    <ToolbarIcon active={active} onClick={handleSetActiveTool}>
      <Icon />
    </ToolbarIcon>
  );
};

export default Toolbar;
