import styled from 'styled-components';
import TI from '@/components/TextInput';

export const Main = styled.main`
  display: grid;
  place-content: center;
  padding: 0 32px;

  .helper {
    font-size: 12px;
    margin-top: 16px;

    span {
      &:first-of-type {
        text-decoration: underline;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.purple.active()};
        }
      }

      &:last-of-type {
        color: green;
        opacity: ${({ $save }) => ($save ? 1 : 0)};
        transition: opacity 0.2s ease-in-out;
      }
    }
  }
`;

export const TextInput = styled(TI)`
  margin-top: 16px;
`;
