import React, { useState, useEffect } from 'react';
import Container from "../atoms/Container";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import profilePicture from "../../assets/avatar_default.webp"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../services/Api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get (getApiUrl('/profile'), {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
    });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      const response = await axios.post (getApiUrl('/profile/profile-picture'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setUser({ ...user, profile_picture: response.data.filename });
      alert(response.data.message);
    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      alert('Échec du téléchargement');
    }
  };

  const handleDeletePicture = async () => {
    try {
      await axios.put (getApiUrl('/profile'), { profile_picture: null }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUser({ ...user, profile_picture: null });
      alert('Photo de profil supprimée');
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo de profil:', error);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    axios.put (getApiUrl('/profile'), user, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      setSuccess('Informations personnelles mises à jour avec succès!');
    })
    .catch(error => {
      setError('Erreur lors de la mise à jour des informations personnelles.');
    });
  };

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
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
  
    try {
      const response = await axios.put(getApiUrl('/profile/password'), {
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.status === 200) {
        setSuccess('Mot de passe mis à jour avec succès!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('Erreur lors de la mise à jour du mot de passe.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Erreur lors de la mise à jour du mot de passe.');
      } else {
        setError('Erreur lors de la mise à jour du mot de passe.');
      }
    }
  };
  

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.')) {
      axios.delete ('/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('Compte supprimé avec succès!');
        handleLogout(); // Déconnecter l'utilisateur après la suppression du compte
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du compte:', error);
      });
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h3>Mon profil</h3>
        <Button className={"bg-red-400 border-none"} onClick={handleLogout}>Se déconnecter</Button>
      </div>
      <div className="min-h-screen mt-4 grid grid-cols-1 md:grid-cols-8 grid-rows-auto gap-4">
        <Container className="col-span-1 md:col-span-5 row-span-2 md:min-h-[15rem]">
          <h4 className="p-3">Profile Picture</h4>
          <div className="w-full mx-0 md:mx-2 mb-4 md:mb-0 mt-2">
            <div className='flex flex-col md:flex-row justify-center items-center'>
              <div className='mb-4 md:mb-0 md:mr-12 overflow-hidden w-32 h-32'>
                <img 
                  src={user.profile_picture ? getApiUrl(`/uploads/${user.profile_picture}`) : profilePicture} 
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <input className='w-full md:w-auto p-2 md:p-0 text-center md:text-left' type="file" onChange={handleFileChange} />
            </div>
            <div className="flex mt-6 justify-center gap-4">
              <Button onClick={handleUpload}>Changer la photo</Button>
              <Button className={"bg-red-400 border-none"} onClick={handleDeletePicture}>Supprimer</Button>
            </div>
          </div>
        </Container>

        <Container className="col-span-1 md:col-span-3 row-span-3 md:min-h-[20rem]">
          <h4 className="p-3">Modifier votre mot de passe</h4>
          <form onSubmit={handleUpdatePassword} className="mt-10">
            <div className="w-4/5 mx-auto">
              <Input
                type="password"
                className="w-full p-1 text-sm"
                text="Ancien mot de passe"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-4/5 mx-auto mt-4">
              <Input
                type="password"
                className="w-full p-1 text-sm"
                text="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-4/5 mx-auto mt-4">
              <Input
                type="password"
                className="w-full p-1 text-sm"
                text="Confirmer le nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-center text-red-600 mt-4">{error}</p>}
            {success && <p className="text-sm text-center text-green-600 mt-4">{success}</p>}
            <div className="flex justify-center md:mt-10 mt-0 mb-4 md:mb-0">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Container>

        <Container className="col-span-1 md:col-span-5 row-span-3 md:min-h-[20rem]">
          <h4 className="p-3">Informations personnelles</h4>
          <form onSubmit={handleUpdateProfile} className="w-full mt-10">
            <div className="w-11/12 md:flex flex-wrap mx-auto gap-2">
              <div className="w-full md:w-72 mx-auto">
                <Input
                  text="Nom"
                  type="text"
                  className="w-full text-sm p-1"
                  value={user.name_user || ''}
                  onChange={(e) => setUser({ ...user, name_user: e.target.value })}
                />
              </div>
              <div className="w-full md:w-72 mx-auto">
                <Input
                  text="Prénom"
                  type="text"
                  className="w-full text-sm p-1"
                  value={user.surname_user || ''}
                  onChange={(e) => setUser({ ...user, surname_user: e.target.value })}
                />
              </div>
              <div className="w-full md:w-72 md:ml-2 md:mt-4 mt-0">
                <Input
                  text="Email"
                  type="email"
                  className="w-full text-sm p-1"
                  value={user.email_user || ''}
                  onChange={(e) => setUser({ ...user, email_user: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-center md:mt-10 mt-0 mb-4 md:mb-0">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Container>

        <Container className="col-span-1 md:col-span-3 row-span-2 md:min-h-[15rem]">
          <h4 className="p-3">Suppression du compte</h4>
          <p className="mx-auto px-9 text-center text-xs mt-10">
            Attention, la suppression de votre compte entrainera la suppression de vos objectifs, êtes-vous bien sûr de votre choix ?
          </p>
          <div className="flex justify-center mt-4 mb-4 md:mb-0">
            <Button className={"bg-red-400 border-none"} onClick={handleDeleteAccount}>Supprimer le compte</Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Profile;









