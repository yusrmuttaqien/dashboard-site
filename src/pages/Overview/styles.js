import styled from 'styled-components';
import M from '@/assets/svg/Magnifier';
import OV from './fragments/OverviewVisa';
import OTD from './fragments/OverviewToDo';
import OA from './fragments/OverviewActivity';
import OM from './fragments/OverviewMeter';
import OC from './fragments/OverviewChats';

export const Container = styled.div`
  flex: 1;
  padding: 20px 16px;
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
  grid-auto-rows: max-content;
  grid-template-areas:
    'OV'
    'OTD'
    'OM'
    'OC'
    'OA';

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'OV OTD'
      'OM OA'
      'OC OC';
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, max-content);
    grid-template-areas:
      'OV OTD OTD'
      'OM OA OA'
      'OC OC OC';
  }
`;

export const Visa = styled(OV)`
  grid-area: OV;
`;

export const ToDo = styled(OTD)`
  /* NOTE: Fix for bug in Safari, minimum compromise in other browser */
  height: 250px;
  max-height: max-content;
  grid-area: OTD;

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    height: 150px;
    min-height: 100%;
    max-height: unset;
  }
`;

export const Activity = styled(OA)`
  /* NOTE: Fix for bug in Safari, minimum compromise in other browser */
  height: 250px;
  max-height: max-content;
  grid-area: OA;

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    height: 150px;
    min-height: 100%;
    max-height: unset;
  }
`;

export const Meter = styled(OM)`
  aspect-ratio: 3/2;
  grid-area: OM;
`;

export const Chats = styled(OC)`
  height: 600px;
  max-height: max-content;
  grid-area: OC;

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    height: 300px;
    min-height: 100%;
    max-height: unset;
  }
`;
