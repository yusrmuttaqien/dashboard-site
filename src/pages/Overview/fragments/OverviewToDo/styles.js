import styled from 'styled-components';
import P from '@/assets/svg/Plus';
import B from '@/assets/svg/Bin';
import TI from '@/components/TextInput';
import M from '@/components/Modal';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.white.base};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const HeadingContainer = styled.span`
  p {
    font-size: 14px;
  }
`;

export const AddContainer = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 16px;
  padding: 4px 10px;
  transition: background-color 0.2s ease-in-out;
  align-items: center;

  p {
    font-size: 14px;
    margin-left: 4px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple.active(0.3)};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.purple.active(0.5)};
  }
`;

export const Plus = styled(P).attrs(() => ({
  width: 16,
}))``;

export const Item = styled.div`
  background-color: ${({ theme }) => theme.colors.purple.active(0.1)};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const ItemContainer = styled.div`
  display: grid;
  gap: 4px;
  margin-top: 12px;
  grid-template-columns: 1fr;
  overflow-y: auto;
  overscroll-behavior: contain;

  &[data-stack='false'] {
    place-content: center;
    height: 100%;
  }

  .empty-state {
    margin: 20px;
    text-align: center;
  }
`;

export const Delete = styled(B).attrs(() => ({
  width: 16,
}))`
  color: red;
  flex-shrink: 0;
  cursor: pointer;
`;

export const TextInput = styled(TI)`
  margin-top: 12px;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    margin-top: 20px;
  }
`;

export const Modal = styled(M)`
  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    width: 400px;
  }
`;