import { createGlobalStyle } from "styled-components";
import { darkTheme } from "./colorScheme/colors";

export const GlobalStyles = createGlobalStyle`

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  
  html,
  body {
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    height: 100%;
    background-color: ${darkTheme.main.bodyColor};
    color: ${darkTheme.main.textColor};
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    margin: 0;
    padding: 0;
  }`;
