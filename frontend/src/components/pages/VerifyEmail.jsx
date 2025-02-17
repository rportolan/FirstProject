import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../services/Api';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(getApiUrl(`/auth/verify-email/${token}`));
        if (response.status === 200) {
          setMessage('E-mail vérifié avec succès! Vous pouvez maintenant vous connecter.');
        } else {
          setError('Erreur lors de la vérification de l\'e-mail.');
        }
      } catch (err) {
        setError('Token invalide ou erreur lors de la vérification.');
      }
    };
    verifyEmail();
  }, [token]);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-tertiary shadow-lg rounded-lg">
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <p className="text-green-600 text-center">{message}</p>
        )}
        {message && (
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 font-medium text-white bg-primary border border-secondary rounded-md hover:bg-primary-dark focus:outline-none"
          >
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
