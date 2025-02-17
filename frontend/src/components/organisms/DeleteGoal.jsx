import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import axios from 'axios';
import getApiUrl from '../services/Api';

const DeleteGoal = ({ goalId, onDelete }) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(getApiUrl(`/mygoals/${goalId}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onDelete(goalId); // Appeler onDelete après la suppression
    } catch (error) {
      setError("Erreur lors de la suppression de l'objectif : " + error.message);
    }
  };

  return (
    <div className='mt-6 text-center w-full'>
      <h2 className='mb-4'>Êtes-vous sûr de vouloir supprimer cet objectif ainsi que tous les sous-objectifs et tâches associés ?</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex justify-center mt-4'>
        <Button className="mr-2 bg-red-400" onClick={handleDelete}>Supprimer</Button>
      </div>
    </div>
  );
};

DeleteGoal.propTypes = {
  goalId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteGoal;
