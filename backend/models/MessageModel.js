const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const UserModel = require('./UserModel'); // Assurez-vous que le modèle User est importé

const MessageModel = sequelize.define('Message', {
  id_message: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel, // Nom du modèle auquel il se réfère
      key: 'id_user'
    }
  },
  title_message: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content_message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tag_message: {
    type: DataTypes.ENUM('observation', 'conseil', 'apprentissage', 'idee'),
    allowNull: false,
    defaultValue: 'observation'
  },
  created_at_message: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'messages',
  timestamps: false
});

MessageModel.belongsTo(UserModel, { foreignKey: 'id_user' });

module.exports = MessageModel;
