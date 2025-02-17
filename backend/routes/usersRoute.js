// usersRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getProfile, updateProfile, updatePassword, deleteProfile } = require('../controllers/usersController');
const verifyToken = require('../middlewares/authMiddleware');
const UserModel = require('../models/UserModel'); // Importer le modèle utilisateur

// Configurer multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes existantes
router.get('/', verifyToken, getProfile);
router.put('/', verifyToken, updateProfile);
router.put('/password', verifyToken, updatePassword);
router.delete('/', verifyToken, deleteProfile);

// Route pour l'upload de la photo de profil
router.post('/profile-picture', verifyToken, upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier téléchargé' });
  }

  try {
    // Mettre à jour la photo de profil de l'utilisateur dans la base de données
    const user = await UserModel.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Supprimer l'ancienne photo si elle existe
    if (user.profile_picture) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', user.profile_picture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    user.profile_picture = req.file.filename;
    await user.save();

    res.json({ filename: req.file.filename, message: 'Téléchargement réussi !' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;





