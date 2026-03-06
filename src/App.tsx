import React from 'react';
import { Global, css } from '@emotion/react';
import { Calendar } from './components/Calendar';

const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #c1c7d0; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #97a0af; }
`;

const App: React.FC = () => (
  <>
    <Global styles={globalStyles} />
    <Calendar />
  </>
);

export default App;
