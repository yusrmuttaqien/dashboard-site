import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  aspect-ratio: 3/1;
  border: 2px dashed ${({ theme }) => theme.colors.purple.active(0.3)};
  border-radius: 8px;
  transition-property: background-color, border;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  position: relative;
  display: grid;
  place-content: center;

  &:not([data-disabled='true']) {
    &[data-state='file-hover'],
    &:hover {
      border: 2px dashed ${({ theme }) => theme.colors.purple.active()};
      background-color: ${({ theme }) => theme.colors.purple.active(0.3)};

      p {
        color: ${({ theme }) => theme.colors.purple.active()};
      }
    }
  }

  &[data-state='file-mismatch'] {
    border-color: red;

    p {
      color: red;
    }
  }

  &[data-disabled='true'] {
    p {
      color: ${({ theme }) => theme.colors.black.base(0.5)};
    }
  }

  input {
    opacity: 0;
    position: absolute;
    inset: 0;
    cursor: pointer;

    &:disabled {
      cursor: no-drop;
    }
  }

  p {
    font-size: 14px;
    pointer-events: none;
    transition: color 0.2s ease-in-out;
    padding-inline: 8px;
    text-align: center;
  }
`;
