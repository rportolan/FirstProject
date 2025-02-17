import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getApiUrl from '../services/Api';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const uppercaseRegExp = /[A-Z]/;
    const lowercaseRegExp = /[a-z]/;
    const digitRegExp = /[0-9]/;
    const specialCharRegExp = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return `Le mot de passe doit contenir au moins ${minLength} caractères.`;
    }
    if (!uppercaseRegExp.test(password)) {
      return "Le mot de passe doit contenir au moins une lettre majuscule.";
    }
    if (!lowercaseRegExp.test(password)) {
      return "Le mot de passe doit contenir au moins une lettre minuscule.";
    }
    if (!digitRegExp.test(password)) {
      return "Le mot de passe doit contenir au moins un chiffre.";
    }
    if (!specialCharRegExp.test(password)) {
      return "Le mot de passe doit contenir au moins un caractère spécial.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await axios.post(getApiUrl('/auth/register'), {
        name_user: name,
        surname_user: surname,
        email_user: email,
        password_user: password
      });

      if (response.status === 201) {
        // Inscription réussie, redirection vers la page de vérification d'email
        setSuccess('Inscription réussie ! Veuillez vérifier votre email.');
        setName('');
        setSurname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/email-verification');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Cet utilisateur existe déjà. Veuillez utiliser un autre email.");
      } else {
        setError('Erreur lors de l\'inscription');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-sm md:max-w-md p-8 space-y-8 bg-tertiary shadow-md rounded-lg">
        <h2 className="text-xl md:text-2xl font-bold text-center">Inscription</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-primary px-3 py-2 md:px-4 md:py-2 mt-1 border bg-tertiary border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="surname" className="block text-sm font-medium">Prénom</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full text-primary px-3 py-2 md:px-4 md:py-2 mt-1 border bg-tertiary border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-primary px-3 py-2 md:px-4 md:py-2 mt-1 border bg-tertiary border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-primary px-3 py-2 md:px-4 md:py-2 mt-1 border bg-tertiary border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full text-primary px-3 py-2 md:px-4 md:py-2 mt-1 border bg-tertiary border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-primary border border-secondary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;




