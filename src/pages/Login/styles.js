import styled from 'styled-components';
import TI from '@/components/TextInput';

export const Main = styled.main`
  display: grid;
  place-content: center;
  padding: 0 ${({ theme }) => theme.space.x.mobile};

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    padding: 0 ${({ theme }) => theme.space.x.desktop};
  }
`;

export const TextInput = styled(TI)`
  margin-top: 1rem;
`;
