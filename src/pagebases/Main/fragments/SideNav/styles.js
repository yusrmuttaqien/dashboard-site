import styled from 'styled-components';
import L from '@/assets/svg/Logo';
import E from '@/assets/svg/Exit';

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.white.base};
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .lower-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      object-fit: cover;
    }
  }
`;

export const Logo = styled(L).attrs(() => ({
  width: 32,
}))`
  color: ${({ theme }) => theme.colors.black.base()};
  margin: 0 4px;
  cursor: pointer;
`;

export const Exit = styled(E).attrs(() => ({
  width: 24,
}))`
  color: ${({ theme }) => theme.colors.black.base()};
  margin: 0 4px;
  cursor: pointer;
`;

export const NavLists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.purple.base()};
  border-radius: 16px;
  padding: 4px;
  gap: 8px;
`;

export const NavList = styled.svg.attrs(() => ({
  width: 26,
  height: 26,
}))`
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.purple.active() : 'transparent'};
  color: ${({ theme, $active }) => ($active ? theme.colors.white.base : theme.colors.black.base())};
  border-radius: 100%;
  padding: 4px;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.purple.active() : theme.colors.purple.active(0.3)};
  }

  &:active {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.purple.active() : theme.colors.purple.active(0.5)};
  }
`;
