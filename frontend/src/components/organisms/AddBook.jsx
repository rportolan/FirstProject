import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';

const AddBook = ({ onSubmit }) => {
  const options = [
    { value: 'observation', label: 'Observation' },
    { value: 'conseil', label: 'Conseil' },
    { value: 'apprentissage', label: 'Apprentissage' },
    { value: 'idee', label: 'Idée' },
  ];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('observation');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title_message: title, content_message: content, tag_message: tag });
    setTitle('');
    setContent('');
    setTag('observation');
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6 w-full'>
      <h2 className='mb-4'>Nouveau Message</h2>
      <div className="mb-4">
        <Input
          type="text"
          className="w-full bg-tertiary mb-4 p-1 text-sm"
          text="Titre du message"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Select options={options} value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>
        <Textarea
          placeholder="Tapez votre message ici..."
          className="mt-4 w-full h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex justify-center mt-4'>
        <Button type="submit">Ajouter</Button>
      </div>
    </form>
  );
};

AddBook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddBook;


