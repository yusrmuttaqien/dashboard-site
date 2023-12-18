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
    mobile: '320',
    tablet: {
      min: '744',
      // max: '768',
    },
    desktop: '1280',
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

  a {
    color: ${({ theme }) => theme.colors.black.base};
  }

  .truncate {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.purple.GlobalStyle};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.purple.active(0.3)};
  }
}

html {
  background-color: ${({ theme }) => theme.colors.purple.base};
  color: ${({ theme }) => theme.colors.black.base};
  min-width: 320px;

  body {
    height: 100svh;

    #root, #root main {
      height: 100%;
    }
  }

  @media (prefers-color-scheme: light) {
  }
}
`;
