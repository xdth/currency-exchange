import { createGlobalStyle } from 'styled-components';
// import BackgroundImage from '../assets/background.jpg';
 
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
 
  #root {
    margin: 0 auto;
  }
 
  html {
    background-color: darkslategray;
  }

  body {
    text-align: center;
  }
  #equals {
    font-weight: bold;

  }
`;