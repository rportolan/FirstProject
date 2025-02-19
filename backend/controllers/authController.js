const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER; // Email du serveur
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD; // Mot de passe de l'email du serveur

// Importer le modèle UserModel
const UserModel = require('../models/UserModel');

// Configurer Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    }
});

// Fonction login avec vérification de l'email
exports.login = async (req, res) => {
  const { email_user, password_user } = req.body;

  if (!email_user || !password_user) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
      // Rechercher l'utilisateur par email
      const user = await UserModel.findOne({ where: { email_user } });

      if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      // Vérifier si l'utilisateur a validé son e-mail
      if (!user.isVerified) {
          return res.status(403).json({ error: 'Veuillez vérifier votre e-mail avant de vous connecter.' });
      }

      // Vérifier le mot de passe
      const passwordIsValid = bcrypt.compareSync(password_user, user.password_user);
      if (!passwordIsValid) {
          return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }

      // Générer le token JWT
      const token = jwt.sign({ id_user: user.id_user }, JWT_SECRET, { expiresIn: '2h' });
      res.status(200).json({ token });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

// Enregistrement avec envoi d'e-mail de vérification
exports.register = async (req, res) => {
    const { name_user, surname_user, email_user, password_user } = req.body;

    if (!name_user || !surname_user || !email_user || !password_user) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password_user, 8);

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await UserModel.findOne({ where: { email_user } });
        if (existingUser) {
            return res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
        }

        // Créer un token de vérification
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Créer l'utilisateur avec "isVerified" = false par défaut
        const newUser = await UserModel.create({
            name_user,
            surname_user,
            email_user,
            password_user: hashedPassword,
            isVerified: false, // Par défaut, l'utilisateur n'est pas vérifié
            verificationToken, // Token de vérification
        });

        // Envoi de l'e-mail de vérification
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        await transporter.sendMail({
            to: newUser.email_user,
            subject: 'Vérification de votre adresse e-mail',
            html: `<p>Merci de vous être inscrit. Veuillez cliquer sur ce lien pour vérifier votre e-mail : <a href="${verificationLink}">${verificationLink}</a></p>`
        });

        res.status(201).json({ message: 'Inscription réussie. Veuillez vérifier votre e-mail pour activer votre compte.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

// Validation de l'e-mail
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Rechercher l'utilisateur par token de vérification
        const user = await UserModel.findOne({ where: { verificationToken: token } });
        if (!user) return res.status(400).json({ error: 'Token de vérification invalide.' });

        // Valider l'e-mail de l'utilisateur
        user.isVerified = true;
        user.verificationToken = null; // Supprimer le token de vérification
        await user.save();

        res.status(200).json({ message: 'E-mail vérifié avec succès. Vous pouvez maintenant vous connecter.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur interne lors de la vérification de l\'e-mail.' });
    }
};




