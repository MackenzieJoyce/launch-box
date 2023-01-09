import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider, Container } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={
    {
      components: {
        Container: {
          defaultProps: {
            size: {
              xs: 540,
              sm: 720,
              md: 960,
              lg: 1140,
              xl: 1320,
            },
          },
        },
      },
      breakpoints: {
        xs: 500,
        sm: 780,
        md: 1000,
        lg: 1275,
        xl: 1800,
      },
    }
  } >
      <App />
  </MantineProvider>
);

reportWebVitals();
