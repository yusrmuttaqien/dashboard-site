import styled from 'styled-components';

export const Container = styled.main`
  display: grid;
  place-content: center;
  padding: 0 32px;

  p {
    span {
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.colors.purple.active()};
      }
    }

    &:first-of-type {
      margin-top: 16px;
    }
  }
`;
