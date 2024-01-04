import styled from 'styled-components';
import M from '@/assets/svg/Magnifier';

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

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 400px;

  &:first-of-type {
    margin-top: 32px;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;

  p {
    font-weight: 400;
    font-size: 14px;

    span {
      color: green;
      opacity: ${({ $save }) => ($save ? 1 : 0)};
      transition: opacity 0.2s ease-in-out;
      margin-left: 4px;
    }
  }
`;

export const ControlContainer = styled.div`
  margin-top: 16px;

  .option-container {
    display: flex;
    margin-top: 8px;
    gap: 8px;
    flex-wrap: wrap;
  }
`;
