import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthProvider'

console.log(process.env.REACT_APP_ROUTER_BASE)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || '/home'}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
