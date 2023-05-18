import { createGlobalStyle } from "styled-components";
import FiraSansBold from "./assets/fonts/fira-sans/FiraSans-Bold.otf";
import FiraSansBook from "./assets/fonts/fira-sans/FiraSans-Book.otf";
import FiraSansLight from "./assets/fonts/fira-sans/FiraSans-Light.otf";
import FiraSansMedium from "./assets/fonts/fira-sans/FiraSans-Medium.otf";
import FiraSansRegular from "./assets/fonts/fira-sans/FiraSans-Regular.otf";
import FiraSansSemiBold from "./assets/fonts/fira-sans/FiraSans-SemiBold.otf";

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  :root {
    --dark-blue: #233f81;
    --dark-blue-border: #24399b;
    --white: #fff;
    --gray: #c6ceda;
  }

  @font-face {
    font-family: "Fira Sans";
    src: url(${FiraSansLight}) format("opentype");
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: "Fira Sans";
    src: url(${FiraSansBook}) format("opentype");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Fira Sans";
    src: url(${FiraSansRegular}) format("opentype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Fira Sans";
    src: url(${FiraSansMedium}) format("opentype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Fira Sans";
    src: url(${FiraSansSemiBold}) format("opentype");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "Fira Sans";
    src: url(${FiraSansBold}) format("opentype");
    font-weight: 700;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    background: #eaeaea;
    font-family: "Fira Sans", sans-serif;
  }
`;

export default GlobalStyle;
