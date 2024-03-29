import styled from 'styled-components';
import M from '@/components/Modal';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.white.base};
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  > div {
    padding: 16px;
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    flex-direction: row;
  }
`;

export const ListContainer = styled.div`
  height: 40%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .item-container {
    flex: 1;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    overscroll-behavior: contain;

    .empty-state {
      margin: auto;
      text-align: center;
    }

    .custom-user-list {
      &[data-active='true'] {
        color: ${({ theme }) => theme.colors.white.base};
        background-color: ${({ theme }) => theme.colors.purple.active()};
        cursor: default;
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    height: 100%;
    width: 40%;
  }
`;

export const ConversationContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 60%;
  border-top: 3px solid ${({ theme }) => theme.colors.black.base(0.05)};

  .bubbles-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bubbles-container {
    flex: 1;
    margin: 18px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    overscroll-behavior: contain;

    .empty-state {
      margin: auto;
      text-align: center;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    border: none;
    border-left: 3px solid ${({ theme }) => theme.colors.black.base(0.05)};
    height: 100%;
    width: 60%;
  }
`;

export const Heading = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin-right: 8px;
  }
`;

export const BubbleContainer = styled.div`
  --_profile-dimension: 48px;

  display: flex;
  align-items: flex-end;
  flex-direction: ${({ $isSelf }) => ($isSelf ? 'row-reverse' : 'row')};
  margin-bottom: ${({ $showImg }) => ($showImg ? 'unset' : '-12px')};
  position: relative;
  padding-right: ${({ $isSelf }) => ($isSelf ? 'var(--_profile-dimension)' : 'unset')};
  padding-left: ${({ $isSelf }) => ($isSelf ? 'unset' : 'var(--_profile-dimension)')};

  img {
    position: absolute;
    left: ${({ $isSelf }) => ($isSelf ? 'unset' : '0')};
    right: ${({ $isSelf }) => ($isSelf ? '0' : 'unset')};
    bottom: 0;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 100%;
    visibility: ${({ $showImg }) => ($showImg ? 'visible' : 'hidden')};
  }

  .bubble {
    font-size: 12px;
    background-color: ${({ theme, $isSelf }) =>
      $isSelf ? theme.colors.purple.active() : theme.colors.purple.base()};
    color: ${({ theme, $isSelf }) =>
      $isSelf ? theme.colors.white.base : theme.colors.black.base()};
    padding: 8px 12px;
    border-radius: 16px;
    max-width: calc(90% - var(--_profile-dimension));
    white-space: pre-wrap;

    @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
      max-width: 300px;
    }
  }

  &:first-child {
    margin-top: 50px;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  .custom-text-area {
    flex: 1;
    resize: none;
  }
`;

export const Modal = styled(M)`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .users-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
    max-height: 200px;
    overflow-y: auto;
    overscroll-behavior: contain;

    .empty-state {
      margin: 20px auto;
      text-align: center;
    }
  }

  .guide {
    margin-top: 12px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    span {
      display: block;

      &.bq {
        font-style: italic;
        background-color: ${({ theme }) => theme.colors.black.base(0.05)};
        width: max-content;
        padding: 4px;
        border-radius: 4px;
        display: inline-block;
        font-weight: 600;
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    width: 400px;
  }
`;
