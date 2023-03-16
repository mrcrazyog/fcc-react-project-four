import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Calculator from './Calculator';
import CalculatorButton from './CalculatorButton';
import Display from './Display';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Calculator />
    {/* <CalculatorButton /> */}
    {/* <Display /> */}
  </React.StrictMode>
);
