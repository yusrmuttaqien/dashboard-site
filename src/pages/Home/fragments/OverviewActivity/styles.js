import styled from 'styled-components';

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
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    flex-direction: row;
  }
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

export const Options = styled.p`
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.purple.active() : theme.colors.black.base()};
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.purple.active()};
  }

  &[data-disabled='true'] {
    pointer-events: none;
    color: ${({ theme }) => theme.colors.black.base(0.5)};
    text-decoration: none;
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black.base(0.2)};

  .date {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.black.base(0.5)};
  }

  .type {
    font-size: 12px;
    flex-shrink: 0;
  }

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.black.base(0.2)};
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
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
