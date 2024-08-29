import React from 'react';
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
/* 
  import Tailwind from 'primereact/passthrough/tailwind'; 
  value={{unstyled: false, pt: Tailwind}}  
*/

import App from './App';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
)
