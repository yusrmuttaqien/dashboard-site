import styled from 'styled-components';
import M from '@/components/Modal';

export const Modal = styled(M)`
  h3 {
    margin-bottom: 12px;
  }

  .custom-button {
    width: 100%;
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    h3 {
      margin-bottom: 20px;
    }

    width: 400px;
  }
`;
