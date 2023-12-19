import styled from 'styled-components';

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:checked {
    ~ #box {
      background-color: ${({ theme }) => theme.colors.purple.active()};

      &::after {
        color: ${({ theme }) => theme.colors.white.base};
      }
    }

    ~ p {
      text-decoration: line-through;
      opacity: 0.8;
    }
  }
`;

export const Container = styled.label`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    user-select: none;
    -webkit-user-select: none;
    font-size: 14px;
  }

  &:active #box {
    background-color: ${({ theme }) => theme.colors.purple.active()};
  }
`;

export const Box = styled.div`
  aspect-ratio: 1/1;
  height: 14px;
  border-radius: 4px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.purple.active(0.3)};
  transition: background-color 0.2s ease-in-out;

  &::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: transparent;
  }
`;
