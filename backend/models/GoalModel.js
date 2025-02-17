const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const UserModel = require('./UserModel');

const GoalModel = sequelize.define('Goal', {
  id_goal: {
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
  name_goal: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  start_date_goal: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date_goal: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status_goal: {
    type: DataTypes.ENUM('en attente', 'en cours', 'terminé'),
    allowNull: false,
    defaultValue: 'en attente'
  },
  progress_goal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'goals',
  timestamps: false
});

GoalModel.belongsTo(UserModel, { foreignKey: 'id_user' });

module.exports = GoalModel;

