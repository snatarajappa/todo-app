import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from 'components/app';
import { store } from './reducers';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FC9927',
    },
    secondary: {
      main: '#99CCEE',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
