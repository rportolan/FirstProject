import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Assure-toi que c'est bien importé

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error('AuthContext est undefined'); // Vérification
  }
  return context;
};



