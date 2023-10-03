import {createGlobalStyle} from "styled-components";

import {baseTheme} from "./theme";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    background-image: url(${baseTheme.background.image});
    color: ${baseTheme.colors.primary};
    font-family: 'Lato', sans-serif;
  }
`;
