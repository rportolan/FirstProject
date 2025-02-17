const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

// Récupérer les informations de l'utilisateur
exports.getProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour les informations de l'utilisateur
exports.updateProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const { name_user, surname_user, email_user } = req.body;

    user.name_user = name_user || user.name_user;
    user.surname_user = surname_user || user.surname_user;
    user.email_user = email_user || user.email_user;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour le mot de passe de l'utilisateur
exports.updatePassword = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const { old_password, new_password } = req.body;

    // Vérifier que l'ancien mot de passe est correct
    const passwordIsValid = bcrypt.compareSync(old_password, user.password_user);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Ancien mot de passe incorrect' });
    }

    // Hacher le nouveau mot de passe et le mettre à jour
    const hashedPassword = bcrypt.hashSync(new_password, 8);
    user.password_user = hashedPassword;
    await user.save();
    
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Supprimer le compte de l'utilisateur
exports.deleteProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Sequelize doit supprimer toutes les relations CASCADE
    await user.destroy();
    res.status(200).json({ message: 'Compte supprimé avec succès, ainsi que toutes les données associées.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





