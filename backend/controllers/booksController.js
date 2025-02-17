const MessageModel = require('../models/MessageModel');
const UserModel = require('../models/UserModel');

// Afficher tous les messages d'un utilisateur
exports.getAllBooks = async (req, res) => {
  try {
    const userId = req.userId; // Obtenu du middleware de vérification du token

    const books = await MessageModel.findAll({
      where: { id_user: userId },
      include: [UserModel]
    });

    if (!books) {
      return res.status(404).json({ error: 'Aucun message trouvé pour cet utilisateur.' });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un message par ID
exports.getBookById = async (req, res) => {
  const { id_message } = req.params;
  try {
    const book = await MessageModel.findByPk(id_message);
    if (!book) {
      return res.status(404).json({ error: 'Message non trouvé.' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//création d'un message
exports.createBook = async (req, res) => {
  const { title_message, content_message, tag_message } = req.body; //destructuration
  const id_user = req.userId; // Récupérer l'ID utilisateur du token

  // Vérifiez que tous les champs nécessaires sont présents
  if (!title_message || !content_message || !tag_message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const newBook = await MessageModel.create({ 
      title_message, 
      content_message,
      tag_message: tag_message || 'observation', // Optionnel avec une valeur par défaut
      id_user // Ajouter l'ID utilisateur au message
    });
    console.log('Message créé!');
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un message d'un utilisateur
exports.updateBook = async (req, res) => {
  const { id_message } = req.params; // Récupérer l'ID du message depuis les paramètres de l'URL
  const { title_message, content_message, tag_message } = req.body;
  const id_user = req.userId; // Récupérer l'ID utilisateur du token

  try {
    // Trouver le message par son ID
    const book = await MessageModel.findOne({
      where: { id_message, id_user }
    });

    // Vérifier si le message existe et appartient à l'utilisateur
    if (!book) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }

    // Mettre à jour le message avec les nouvelles données
    book.title_message = title_message || book.title_message;
    book.content_message = content_message || book.content_message;
    book.tag_message = tag_message || book.tag_message;
    

    // Sauvegarder les modifications
    await book.save();

    console.log('Message mis à jour!');
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un message d'un utilisateur
exports.deleteBook = async (req, res) => {
  const { id_message } = req.params; // Récupérer l'ID du message depuis les paramètres de l'URL
  const id_user = req.userId; // Récupérer l'ID utilisateur du token

  try {
    // Trouver le message par son ID et vérifier qu'il appartient à l'utilisateur
    const book = await MessageModel.findOne({
      where: { id_message, id_user }
    });

    // Vérifier si le message existe et appartient à l'utilisateur
    if (!book) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }

    // Supprimer le message
    await book.destroy();

    console.log('Message supprimé!');
    res.status(200).json({ message: 'Message supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};