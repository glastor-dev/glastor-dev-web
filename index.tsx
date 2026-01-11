
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Polyfill de seguridad para process.env en navegador
// Evita que el acceso a process.env en AIChat.tsx rompa el renderizado inicial
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { 
    env: { 
      API_KEY: '' 
    } 
  };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('GLASTOR-OS: Kernel React montado correctamente.');
} catch (error) {
  console.error('Fatal error during React boot:', error);
}
