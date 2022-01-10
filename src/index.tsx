import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
