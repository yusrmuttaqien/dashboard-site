import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.purple.active(0.7)};
  color: ${({ theme }) => theme.colors.white.base};
  border-radius: 8px;
  padding: 8px;
  text-decoration: none;
  outline: none;
  border: none;
  transition-property: background-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  flex-shrink: 0;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.purple.active(0.8)};
  }

  &:not(:disabled):active {
    background-color: ${({ theme }) => theme.colors.purple.active()};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.purple.active(0.2)};
    cursor: not-allowed;
  }
`;
