import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';
import axios from 'axios';
import getApiUrl from '../services/Api';

const EditBook = ({ message, onSubmit }) => {
  const options = [
    { value: 'Observation', label: 'Observation' },
    { value: 'Conseil', label: 'Conseil' },
    { value: 'Apprentissage', label: 'Apprentissage' },
    { value: 'Idée', label: 'Idée' },
  ];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    if (message) {
      setTitle(message.title_message);
      setContent(message.content_message);
      setTag(message.tag_message);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(getApiUrl(`/logbook/${message.id_message}`), {
        title_message: title,
        content_message: content,
        tag_message: tag
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onSubmit(response.data); // Passez la réponse de l'API à onSubmit
    } catch (error) {
      console.error("Erreur lors de la mise à jour du message :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6 w-96'>
      <h2 className='mb-4'>Modifier le message</h2>
      <div className="mb-4">
        <Input
          type="text"
          className="w-full mb-4 p-1 text-sm"
          text="Titre du message"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Select options={options} value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>
        <Textarea
          placeholder="Type your message here..."
          className="mt-4 w-full h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex justify-center mt-4'>
        <Button type="submit">Modifier</Button>
      </div>
    </form>
  );
};

EditBook.propTypes = {
  message: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default EditBook;





