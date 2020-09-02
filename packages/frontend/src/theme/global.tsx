import { createGlobalStyle } from 'styled-components';
import { darkTheme } from './colorScheme/main';

export const GlobalStyles = createGlobalStyle`

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  
  html,
  body {
    align-items: center;
    font-family: 'Nunito', sans-serif;
    height: 100%;
    background: ${darkTheme.body};
    color: ${darkTheme.text};
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    margin: 0;
    padding: 0;
  }`;