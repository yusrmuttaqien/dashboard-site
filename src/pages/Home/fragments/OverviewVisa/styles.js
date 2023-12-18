import styled from 'styled-components';
import L from '@/assets/svg/Logo';
import LO from '@/assets/svg/LogoOutline';
import V from '@/assets/svg/Visa';

export const Container = styled.figure`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple.active()};
  color: ${({ theme }) => theme.colors.white.base};
  position: relative;
  display: grid;
  place-content: center;
  border-radius: 16px;
  overflow: hidden;
`;

export const Logo = styled(L)`
  color: ${({ theme }) => theme.colors.purple.base};
  font-size: 120px;
  padding: 40px;
  opacity: 0.5;
`;

export const LogoOutline = styled(LO)`
  color: ${({ theme }) => theme.colors.purple.base};
  font-size: 200px;
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
`;

export const VisaLogo = styled(V)`
  color: ${({ theme }) => theme.colors.white.base};
  font-size: 42px;
`;

export const InfoDetails = styled.p`
  font-size: 14px;
`;
