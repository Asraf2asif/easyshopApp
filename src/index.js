import React from 'react';
import './polyfills/index';
import './loadFS';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './asset/style/bootstrap.min.css';
import './scss/index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const loader = document.querySelector('.init-loader');
const body = document.querySelector('body');

const hideLoader = () => {
  loader && loader.classList.add('init-loader--hide');
  body && body.classList.remove('bg-black-i');
};


ReactDOM.render(
  <Provider store={store}>
    <App {...{ hideLoader }} />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
