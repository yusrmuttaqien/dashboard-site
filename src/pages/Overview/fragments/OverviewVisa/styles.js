import styled from 'styled-components';
import L from '@/assets/svg/Logo';
import LO from '@/assets/svg/LogoOutline';
import V from '@/assets/svg/Visa';

export const Container = styled.figure`
  width: 100%;
  height: max-content;
  background-color: ${({ theme }) => theme.colors.purple.active()};
  color: ${({ theme }) => theme.colors.white.base};
  position: relative;
  display: grid;
  place-content: center;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 3/2;
`;

export const Logo = styled(L).attrs(() => ({
  width: 120,
}))`
  color: ${({ theme }) => theme.colors.purple.base()};
  opacity: 0.5;
`;

export const LogoOutline = styled(LO).attrs(() => ({
  width: 250,
}))`
  color: ${({ theme }) => theme.colors.purple.base()};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CardInfo = styled.figcaption`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${({ $align }) => $align || 'center'};
  gap: 16px;

  .info-container {
    min-width: 0;
    flex: 1;
  }
`;

export const VisaLogo = styled(V).attrs(() => ({
  width: 42,
}))`
  color: ${({ theme }) => theme.colors.white.base};
`;

export const InfoDetails = styled.p`
  font-size: 14px;

  &.card-name {
    margin-top: 4px;
    display: block;
  }
`;
