import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './appRoutes';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log("Full env object:", process.env);
root.render(
  <Provider store={store}>
  <AppRoutes/>
  </Provider>,
);
reportWebVitals();
