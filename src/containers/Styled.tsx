import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: #e8edf7;
  position: relative;
`;

export const Button = styled.button`
  background-color: var(--primary);
  border: 1px solid var(--primary);
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover);
    border-color: var(--primary-hover);
  }
`;
