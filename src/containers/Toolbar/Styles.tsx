import styled from "styled-components";
import styledTS from "styled-components-ts";

const ToolbarWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: flex-end;
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  background: #fff;
  box-shadow: 0 -2px 6px 0 rgba(40, 50, 57, 0.2);
  border-bottom: 1px solid #e0e6f0;
`;

export const Left = styled.div`
  margin-right: auto;
  display: flex;
`;

export const ToolbarIcon = styledTS<{ active: boolean }>(styled.div)`
  cursor: pointer;
  border: 1px solid #c6cfdf;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border-radius: 4px;
  margin-right: 0.5rem;

  &:hover {
    background-color: #c6cfdf;
  }

  ${({ active }) => active && `background-color: #c6cfdf`};
`;

export default ToolbarWrapper;
