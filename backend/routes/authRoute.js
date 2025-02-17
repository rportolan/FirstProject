const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Routes d'inscription, de connexion, et de vérification de l'e-mail
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;

