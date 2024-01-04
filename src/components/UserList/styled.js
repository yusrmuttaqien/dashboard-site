import styled from 'styled-components';

export const Container = styled.figure`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'pointer' : 'default')};

  img {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 100%;
  }

  .info {
    transition: color 0.2s ease-in-out;

    p {
      font-size: 12px;
    }
  }

  &:hover {
    background-color: ${({ theme, $isInteractive }) =>
      $isInteractive ? theme.colors.purple.base() : 'transparent'};
  }

  &:active {
    background-color: ${({ theme, $isInteractive }) =>
      $isInteractive ? theme.colors.purple.active() : 'transparent'};

    .info {
      color: ${({ theme, $isInteractive }) =>
        $isInteractive ? theme.colors.white.base : 'inherit'};
    }
  }
`;
