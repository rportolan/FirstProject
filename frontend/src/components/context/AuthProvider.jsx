import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";


// Crée et exporte AuthContext
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    console.log('Déconnexion...');
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Fonction pour vérifier si le token est expiré
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convertir le temps actuel en secondes
      console.log("Date d'expiration du token : ", decodedToken.exp);
      return decodedToken.exp < currentTime; // Retourne vrai si le token est expiré
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return true; // Si le token ne peut pas être décodé, considère qu'il est expiré
    }
  };

  // Surveiller le token au chargement de la page pour vérifier son expiration
  useEffect(() => {
    if (token) {
      console.log("Token détecté :", token);
      if (isTokenExpired(token)) {
        console.log("Token expiré, déconnexion...");
        logout(); // Déconnecte si le token est expiré
      } else {
        console.log("Token encore valide.");
      }
    } else {
      console.log("Aucun token présent.");
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};













