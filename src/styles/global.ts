import { createGlobalStyle } from 'styled-components';
import BackgroundImage from '../assets/background2.jpg';
 
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
    background: url(${BackgroundImage}) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
  }

  body {
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }

  section {
    text-align: center;
    height: 90vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  #converter {
    background-color:rgba(0, 0, 0, 0.5);
    padding: 25px 25px 20px;
  }

  #app-info{
    margin-top: 30px;
    color: #F1F1F1;
  }

  #equals {
    font-weight: bold;
  }
`;