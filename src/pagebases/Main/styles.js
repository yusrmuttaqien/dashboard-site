import styled from 'styled-components';
import SB from './fragments/SideBar';

export const Container = styled.main`
  display: flex;
  overflow-x: hidden;
  position: relative;

  .container {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
`;

export const SideBar = styled(SB)`
  background-color: red;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  transform: ${({ $view }) => ($view ? 'translateX(0%)' : 'translateX(100%)')};
  transition: transform 0.2s ease-in-out;

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    position: static;
    transform: translateX(0%);
  }
`;
