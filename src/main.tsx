import React from 'react';
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind'; 
import App from './App';
import 'primeicons/primeicons.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{unstyled: false, pt: Tailwind}}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
)
