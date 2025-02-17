require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuration Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nom de la base de données
  process.env.DB_USER,     // Utilisateur
  process.env.DB_PASSWORD, // Mot de passe
  {
    host: process.env.DB_HOST,  // Hôte de la base
    port: process.env.DB_PORT,  // Port
    dialect: process.env.DB_DIALECT || 'mysql'
  }
);

module.exports = sequelize;

