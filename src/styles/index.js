import { createGlobalStyle } from 'styled-components';

const presets = {
  colors: {
    purple: {
      base: 'rgba(248, 247, 253, 1)',
      active: (alpha = 1) => `rgba(93, 105, 245, ${alpha})`,
    },
    white: {
      base: 'rgba(255, 255, 255, 1)',
    },
    black: {
      base: 'rgba(10, 9, 22, 1)',
    },
  },
  screen: {
    mobile: '319',
    tablet: {
      min: '520',
      max: '768',
    },
    desktop: '1279',
  },
  space: {
    x: {
      mobile: '1.875rem',
      desktop: '5.5rem',
    },
  },
};

export default presets;
export function getScreen(screen) {
  if (screen === 'desktop') return `${presets.screen.desktop}px`;
  if (screen === 'tablet-min') return `${presets.screen.tablet.min}px`;
  if (screen === 'tablet-max') return `${presets.screen.tablet.max}px`;
  return `${presets.screen.mobile}px`;
}
export const GlobalStyle = createGlobalStyle`
* {
  font-family: 'Plus Jakarta Sans';
  margin: 0;
  padding: 0;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  a {
    color: ${({ theme }) => theme.colors.black.base};
  }

  /* width */
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.purple.GlobalStyle};
  }
  
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.purple.active(0.5)};
  }
}

html {
  background-color: ${({ theme }) => theme.colors.purple.base};
  color: ${({ theme }) => theme.colors.black.base};
  font-size: calc(100vw * 16 / ${({ theme }) => theme.screen.mobile});
  min-width: 320px;

  body {
    height: 100svh;

    #root, #root main {
      height: 100%;
    }
  }

  @media (prefers-color-scheme: light) {
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.tablet.min}px) {
    font-size: calc(100vw * 16 / ${({ theme }) => theme.screen.tablet.min});
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}px) {
    font-size: calc(100vw * 16 / ${({ theme }) => theme.screen.desktop});
  }
}
`;
