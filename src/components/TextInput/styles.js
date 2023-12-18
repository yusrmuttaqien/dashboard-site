import styled from 'styled-components';

export const Input = styled.input`
  background-color: transparent;
  outline: none;
  box-shadow: none;
  border: 2px solid ${({ theme }) => theme.colors.purple.active(0.3)};
  padding: 0.5rem;
  font-size: 0.7rem;
  border-radius: 0.3rem;
  transition: border 0.2s ease-in-out;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.purple.active()};
  }
`;
