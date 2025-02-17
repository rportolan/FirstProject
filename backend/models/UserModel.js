const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserModel = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name_user: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  surname_user: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email_user: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password_user: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  profile_picture: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false // Par défaut, l'utilisateur n'est pas vérifié
  },
  verificationToken: {
    type: DataTypes.STRING(255),
    allowNull: true, // Peut être null une fois que l'utilisateur est vérifié
    defaultValue: null
  },
  verifiedAt: {
    type: DataTypes.DATE,
    allowNull: true, // Peut être null si non vérifié
    defaultValue: null
  }
}, {
  tableName: 'users',
  timestamps: false // Si tu utilises les timestamps par défaut, mets-le à true
});

module.exports = UserModel;


