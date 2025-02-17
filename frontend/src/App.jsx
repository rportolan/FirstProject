import { Route, Routes, Navigate } from 'react-router-dom'; // Importation des outils de routage
import { useContext, useEffect } from 'react'; // Utilisation des hooks
import { AuthContext } from './components/context/AuthProvider'; // Utilisation du contexte d'authentification

// Importation des composants nécessaires
import AppTemplate from './components/templates/AppTemplate';
import Dashboard from './components/pages/Dashboard';
import MyGoals from './components/pages/MyGoals';
import NewGoal from './components/pages/NewGoal';
import MyCalendar from './components/pages/MyCalendar';
import LogBook from './components/pages/LogBook';
import Settings from './components/pages/Settings';
import Profile from './components/pages/Profile';
import MyBook from './components/pages/MyBook';
import Goal from './components/pages/Goal';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import UpdateGoal from './components/pages/UpdateGoal';
import LandingPage from './components/pages/LandingPage';
import VerifyEmail from './components/pages/VerifyEmail';

function App() {
  // Utilisation du contexte pour récupérer l'état d'authentification
  const { token } = useContext(AuthContext);

  // Vérification de la connexion et redirection si nécessaire
  useEffect(() => {
    if (!token) {
      // Si pas de token, redirection vers la page de connexion
      console.log("Token absent, redirection vers login");
    }
  }, [token]);

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />


      {/* Routes protégées, accessibles uniquement si l'utilisateur est authentifié */}
      {token ? (
        <Route element={<AppTemplate />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mygoals" element={<MyGoals />} />
          <Route path="/newgoal" element={<NewGoal />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/logbook" element={<LogBook />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logbook/:id_message" element={<MyBook />} />
          <Route path="/goal/:goalId" element={<Goal />} />
          <Route path="/update-goal/:goalId" element={<UpdateGoal />} />
        </Route>
      ) : (
        // Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;











