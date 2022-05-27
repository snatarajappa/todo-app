import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.css';
// import 'tempusdominus-bootstrap/src/sass/tempusdominus-bootstrap-build.scss';npm i react-bootstrap-time-picker --save
import App from 'components/app';
import { store } from './reducers';
import { Provider } from 'react-redux';
import { Dashboard } from 'components/dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="test" element={<App />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
