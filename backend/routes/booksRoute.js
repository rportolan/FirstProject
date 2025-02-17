const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const verifyToken = require('../middlewares/authMiddleware');

// Définir les routes et les lier aux méthodes du contrôleur
router.get('/', verifyToken, booksController.getAllBooks);
router.get('/:id_message', verifyToken, booksController.getBookById);
router.post('/', verifyToken, booksController.createBook);
router.put('/:id_message', verifyToken, booksController.updateBook);
router.delete('/:id_message', verifyToken, booksController.deleteBook);


module.exports = router;