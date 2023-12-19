import styled from 'styled-components';
import M from '@/assets/svg/Magnifier';
import OV from '../OverviewVisa';
import OTD from '../OverviewToDo';
import OA from '../OverviewActivity';

export const Container = styled.div`
  flex: 1;
  padding: 20px 16px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.h2`
  margin-bottom: 8px;
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.purple.base()};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.purple.base()};
  margin-right: 16px;
`;

export const Search = styled(M).attrs(() => ({
  width: 38,
}))`
  background-color: ${({ theme }) => theme.colors.white.base};
  color: ${({ theme }) => theme.colors.black.base()};
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
  gap: 10px;
  overflow: auto;
  scrollbar-width: none;
  border-radius: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Visa = styled(OV)`
  grid-area: 'visa';
`;

export const ToDo = styled(OTD)`
  grid-area: 'todo';
`;

export const Activity = styled(OA)`
  grid-area: 'activity';
`;
