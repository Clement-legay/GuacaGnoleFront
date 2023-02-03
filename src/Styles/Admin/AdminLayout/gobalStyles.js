import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    background: ${({theme}) => theme.palette.bg2.main};
    color: ${({theme}) => theme.palette.text.primary};
    font-family: 'Roboto', sans-serif;
  }
`;