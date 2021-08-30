import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --gray-900: #111827;

    --surface-1: #121212;
    --surface-2: #212121;
    --surface-3: #323232;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 12px;
    line-height: 17px;
    font-family: "Courier New", monospace;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: inherit;
  }
`;
