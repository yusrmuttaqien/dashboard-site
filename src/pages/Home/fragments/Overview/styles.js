import styled from 'styled-components';
import M from '@/assets/svg/Magnifier';
import OV from '../OverviewVisa';
import OTD from '../OverviewToDo';
import OA from '../OverviewActivity';
import OM from '../OverviewMeter';

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

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, max-content);
  }
`;

export const Visa = styled(OV)`
  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

export const ToDo = styled(OTD)`
  height: 250px;
  max-height: max-content;

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    height: 150px;
    min-height: 100%;
    max-height: unset;
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    grid-area: 1 / 2 / 2 / 4;
  }
`;

export const Activity = styled(OA)`
  height: 250px;
  max-height: max-content;

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    height: 150px;
    min-height: 100%;
    max-height: unset;
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    grid-area: 2 / 2 / 3 / 4;
  }
`;

export const Meter = styled(OM)`
  aspect-ratio: 3/2;

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;
