import {createGlobalStyle} from "styled-components";

import {baseTheme} from "./theme";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    background-image: url(${baseTheme.background.image});
    background-attachment: fixed;
    color: ${baseTheme.colors.primary};
    font-family: 'Lato', sans-serif;
    font-size: ${baseTheme.sizes.desktopFontSize};

    @media screen and (${baseTheme.media.medium}) {
      font-size: ${baseTheme.sizes.mobileFontSize};
    }
  }
`;
