import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Router ici
import { AuthProvider } from './components/context/AuthProvider'; // AuthProvider ici

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Router doit envelopper toute l'application */}
      <AuthProvider> {/* AuthProvider fournit le contexte d'authentification */}
        <App /> {/* App utilise les routes */}
      </AuthProvider>
    </Router>
  </React.StrictMode>
);


