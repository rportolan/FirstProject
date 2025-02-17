import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from "../atoms/SearchBar";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import ItemBook from "../molecules/ItemBook";
import Modal from "../templates/Modal";
import AddBook from "../organisms/AddBook";
import getApiUrl from "../services/Api";

import axios from 'axios';

const LogBook = () => {
  const token = localStorage.getItem('token');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    axios.get (getApiUrl("/logbook"), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Récupération des données');
      setBooks(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError("Une erreur est survenue lors de la récupération des données");
      setLoading(false);
    });
  }, [token]);

  const handleAddMessage = async (newMessage) => {
    try {
      const response = await axios.post (getApiUrl("/logbook"), newMessage, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBooks([...books, response.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du message :", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredBooks = books.filter(book => 
    (book.title_message.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.content_message.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedTag === '' || book.tag_message === selectedTag)
  );

  const options = [
    { value: '', label: 'Sélectionnez' },
    { value: 'observation', label: 'Observation' },
    { value: 'conseil', label: 'Conseil' },
    { value: 'apprentissage', label: 'Apprentissage' },
    { value: 'idee', label: 'Idée' },
  ];

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="md:flex justify-between">
        <h3 className='mb-4 lg:mb-0'>Journal de bord</h3>
        <SearchBar placeholder="Rechercher des messages..." value={searchQuery} onChange={handleSearchChange} />
        <div className='flex mt-4 md:mt-0 gap-2'>
          <Select options={options} value={selectedTag} onChange={handleTagChange} />
          <Button onClick={() => setShowAddModal(true)}>Nouveau message</Button>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">  
        {filteredBooks.map(book => (
          <Link key={book.id_message} to={`/logbook/${book.id_message}`}>
            <ItemBook 
              message={book.content_message} 
              title={book.title_message} 
              tag={book.tag_message} 
            />
          </Link>
        ))}
      </div>
  
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <AddBook onSubmit={handleAddMessage} />
      </Modal>
    </>
  );
  
};

export default LogBook;




