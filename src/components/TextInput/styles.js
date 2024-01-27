import styled from 'styled-components';

export const Input = styled.input`
  box-sizing: border-box;
  background-color: transparent;
  outline: none;
  box-shadow: none;
  border: 2px solid ${({ theme }) => theme.colors.purple.active(0.3)};
  padding: 8px;
  font-size: 12px;
  border-radius: 8px;
  transition: border 0.2s ease-in-out;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.purple.active()};
  }

  &:invalid {
    border-color: red;
  }
`;
