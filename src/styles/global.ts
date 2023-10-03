import {createGlobalStyle} from "styled-components";
import bgImg from "../assets/background/commentsBg.jpg";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    background-image: url(${bgImg});
  }
`;
