// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Seus estilos globais
import { HelmetProvider } from 'react-helmet-async'; // Importar

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider> {/* Adicionar o Provider aqui */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
