import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CoreLayout from './common/layouts/CoreLayout';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout>
      <Routes />
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
