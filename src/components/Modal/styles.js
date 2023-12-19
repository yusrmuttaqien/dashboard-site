import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${({ theme, $stack }) =>
    $stack ? theme.colors.purple.base(0.5) : 'transparent'};
  pointer-events: ${({ $stack }) => ($stack ? 'all' : 'none')};
  transition: ${({ $stack }) =>
    $stack ? 'background-color 0.2s ease-in-out 0.15s' : 'background-color 0.2s ease-in-out'};
  overflow: hidden;
  z-index: ${({ $stack }) => $stack};
`;

export const Content = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white.base};
  box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.colors.black.base(0.15)};
  padding: 24px 18px;
  border-radius: 16px;
  pointer-events: ${({ $stack }) => ($stack ? 'all' : 'none')};
  transform: ${({ $stack }) => ($stack ? 'translateY(0)' : 'translateY(100%)')};
  opacity: ${({ $stack }) => ($stack ? 1 : 0)};
  transition-property: opacity, transform;
  transition-duration: 0.1s, 0.2s;
  transition-timing-function: ease-in-out;
`;
