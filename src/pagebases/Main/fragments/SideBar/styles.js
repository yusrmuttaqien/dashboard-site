import styled from 'styled-components';

export const Container = styled.aside`
  position: relative;
  width: 100%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.white.base};
  padding: 20px 16px;
  box-shadow: 0px 0px 10px 0px
    ${({ theme, $desktop }) => ($desktop ? 'transparent' : theme.colors.black.base(0.15))};

  .handle {
    --_dimension: 50px;

    font-size: 30px;
    position: absolute;
    display: grid;
    place-items: center;
    top: 50%;
    left: calc(var(--_dimension) / 2 * -1);
    transform: translateY(-50%) ${({ $view }) => ($view ? 'rotate(0deg)' : 'rotate(180deg)')}
      ${({ $desktop }) => ($desktop ? 'scale(0)' : 'scale(1)')};
    height: var(--_dimension);
    aspect-ratio: 1/1;
    border-radius: 100%;
    box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.colors.black.base(0.15)};
    background-color: ${({ theme }) => theme.colors.white.base};
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  .bar-wrapper {
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .update {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.black.base(0.5)};
    }
  }
`;
