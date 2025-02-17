import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as jwtDecode from 'jwt-decode';

const useTokenExpiration = (token) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const checkTokenExpiration = () => {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Temps actuel en secondes
      if (decodedToken.exp < currentTime) {
        // Le token est expiré
        navigate('/login'); // Redirige vers la page de login
      }
    };

    // Vérification immédiate
    checkTokenExpiration();

    // Optionnel : tu peux aussi vérifier périodiquement (ex : toutes les 30 secondes)
    const intervalId = setInterval(checkTokenExpiration, 30000); // Vérifie toutes les 30 secondes

    return () => clearInterval(intervalId); // Nettoyage quand le composant se démonte
  }, [token, navigate]);
};

export default useTokenExpiration;
