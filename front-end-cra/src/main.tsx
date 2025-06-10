import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DappProvider } from './components/DappProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DappProvider>
      <App />
    </DappProvider>
  </React.StrictMode>
);
