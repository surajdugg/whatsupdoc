import styled from "styled-components";
import styledTS from "styled-components-ts";

const Sidebar = styled.aside`
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 1rem 0;
`;

export const PageCardStyle = styledTS<{ isActive: boolean }>(styled.div)`
  cursor: pointer;
  width: 153px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 0 3px var(--primary);
  }

  ${({ isActive }) => isActive && `box-shadow: 0 0 0 3px var(--primary)`};
`;

export default Sidebar;
