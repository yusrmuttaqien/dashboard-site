import styled from 'styled-components';
import L from '@/assets/svg/Logo';
import E from '@/assets/svg/Exit';

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.white.base};
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(L)`
  color: ${({ theme }) => theme.colors.black.base};
  font-size: 1.5rem;
  margin: 0 0.4rem;
  cursor: pointer;
`;

export const Exit = styled(E)`
  color: ${({ theme }) => theme.colors.black.base};
  font-size: 1rem;
  margin: 0 0.2rem;
  cursor: pointer;
`;

export const NavLists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.purple.base};
  border-radius: 1rem;
  padding: 0.3rem;
  gap: 0.4rem;
`;

export const NavList = styled.svg`
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.purple.active() : 'transparent'};
  color: ${({ theme, $active }) => ($active ? theme.colors.white.base : theme.colors.black.base)};
  border-radius: 100%;
  padding: 0.3rem;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.purple.active() : theme.colors.purple.active(0.3)};
  }
`;
