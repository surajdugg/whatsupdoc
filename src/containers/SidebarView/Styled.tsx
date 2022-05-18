import styled from "styled-components";

const Sidebar = styled.aside`
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

export const PageCard = styled.div`
  cursor: pointer;
  width: 153px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 0 3px var(--primary);
  }
`;

export default Sidebar;
