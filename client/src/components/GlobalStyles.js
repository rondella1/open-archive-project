import { createGlobalStyle } from 'styled-components';
import globe from "../assets/globe-clipart-lg.png"

const GlobalStyles = createGlobalStyle`

body {
    font-family: Verdana, sans-serif;
    color: darkgrey;
    font-size: 0.9em;
    position: relative;
    background-color: lightsteelblue;
}

body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${globe});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: 280% 90%;
    z-index: -1; 
    opacity: 0.2; 
}

h1, h2 {
   font-family: 'IBM Plex Sans';
   color: darkslategray;
}

h3 {
    font-family: 'IBM Plex Sans';
    color: grey;
}

html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
  }
  button,  input[type="reset"] {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
`;

export default GlobalStyles;