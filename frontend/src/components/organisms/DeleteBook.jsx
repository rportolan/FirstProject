import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import axios from 'axios';
import getApiUrl from '../services/Api';

const DeleteBook = ({ messageId, onDelete }) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(getApiUrl(`/logbook/${messageId}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onDelete(messageId); // Appeler onDelete après la suppression
    } catch (error) {
      setError("Erreur lors de la suppression du message : " + error.message);
    }
  };

  return (
    <div className='mt-6 w-full text-center'>
      <h2 className='mb-4'>Êtes-vous sûr de vouloir supprimer ce message ?</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex justify-center mt-4'>
        <Button className="mr-2 bg-red-400 border-none" onClick={handleDelete}>Supprimer</Button>
      </div>
    </div>
  );
};

DeleteBook.propTypes = {
  messageId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteBook;
