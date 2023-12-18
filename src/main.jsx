import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import theme, { GlobalStyle } from 'styles/index';
import PageRouter from './pages';
import '@fontsource/plus-jakarta-sans/200.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/800.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageRouter />
    </ThemeProvider>
  </React.StrictMode>
);
