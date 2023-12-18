import styled from 'styled-components';
import M from '@/assets/svg/Magnifier';
import OV from '../OverviewVisa';

export const Container = styled.div`
  flex: 1;
  padding: 20px 16px;
`;

export const Heading = styled.h2`
  margin-bottom: 8px;
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.purple.base};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.purple.base};
  color: ${({ theme }) => theme.colors.black.base};
  margin-right: 16px;
`;

export const Search = styled(M).attrs(() => ({
  width: 20,
}))`
  background-color: ${({ theme }) => theme.colors.white.base};
  color: ${({ theme }) => theme.colors.black.base};
  padding: 8px;
  border-radius: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple.active(0.3)};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.purple.active(0.5)};
  }
`;

export const Mozaic = styled.div`
  display: grid;
  margin-top: 16px;
`;

export const Visa = styled(OV)``;
