import styled from 'styled-components';
import M from '@/components/Modal';

export const Modal = styled(M)`
  .cropper {
    border-radius: 8px;
    overflow: hidden;

    img {
      object-fit: contain;
    }
  }

  .custom-button {
    width: 100%;
  }

  .canvas-container {
    position: relative;
    width: 0;
    height: 0;
    overflow: hidden;

    canvas {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    width: 400px;
  }
`;
