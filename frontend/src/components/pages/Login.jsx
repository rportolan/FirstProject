import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getApiUrl from '../services/Api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post (getApiUrl('/auth/login'), {
        email_user: email,
        password_user: password
      });
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/'; // Utilisez window.location.href pour forcer la redirection
      } else {
        setError('Erreur lors de la connexion. Veuillez réessayer.');
      }
      
  
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-8 space-y-8 bg-tertiary shadow-lg rounded-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary font-bold text-center">Connexion</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm lg:text-base font-medium text-primary">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-primary px-4 py-2 mt-1 border bg-tertiary border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm lg:text-base font-medium text-primary">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-primary px-4 py-2 mt-1 border bg-tertiary border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          {error && <p className="text-sm lg:text-base text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-tertiary border border-secondary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;




