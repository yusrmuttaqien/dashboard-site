import styled from 'styled-components';

export const MeterContainer = styled.svg`
  position: absolute;
`;

export const MeterBackdrop = styled.circle`
  stroke-dasharray: ${({ $circumference }) => $circumference}
    ${({ $circumference }) => $circumference};
  stroke-dashoffset: ${({ $offset }) => $offset};
  background-color: red;
  transform: rotate(-180deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.2s ease-in-out;
`;

export const MeterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: ${({ $height }) => $height + 8}px;
  width: ${({ $height }) => $height * 2}px;
  margin: auto;
`;

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

export const MeterView = styled.div`
  position: relative;
`;

export const MeterOverview = styled.div`
  margin: 12px 0;
  height: 100%;
  display: grid;
  place-content: center;
`;

export const Percentage = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  h3 {
    font-size: 28px;
  }

  p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.black.base(0.5)};
  }
`;
