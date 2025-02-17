import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Button from "../atoms/Button";
import ItemBook from "../molecules/ItemBook";
import Modal from "../templates/Modal";
import EditBook from "../organisms/EditBook";
import DeleteBook from "../organisms/DeleteBook"; 
import axios from 'axios';
import getApiUrl from "../services/Api";

const MyBook = () => {
  const { id_message } = useParams();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    axios.get (getApiUrl(`/logbook/${id_message}`), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setMessage(response.data);
      setSelectedMessage(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError("Une erreur est survenue lors de la récupération des données");
      setLoading(false);
    })
  }, [id_message, token]);

  const handleEditMessage = (editedMessage) => {
    console.log('Message edited:', editedMessage);
    setMessage(editedMessage);
    setShowEditModal(false);
  };

  const handleDeleteMessage = () => {
    console.log('Message deleted');
    navigate('/logbook');
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!message) return <p>Message non trouvé</p>;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h3 className="mb-4 sm:mb-0">Journal de bord</h3>
        <div className="flex gap-2">
          <Button className="bg-red-400 border-none" onClick={() => setShowDeleteModal(true)}>
            Supprimer
          </Button>
          <Button onClick={() => setShowEditModal(true)}>
            Modifier message
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <ItemBook message={message.content_message} title={message.title_message} tag={message.tag_message} />
      </div>

      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <EditBook message={selectedMessage} onSubmit={handleEditMessage} />
      </Modal>

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DeleteBook messageId={message.id_message} onDelete={handleDeleteMessage} />
      </Modal>
    </>
  );
};

export default MyBook;







