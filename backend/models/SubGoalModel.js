const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const GoalModel = require('../models/GoalModel');

const SubgoalModel = sequelize.define('Subgoal', {
  id_subgoal: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_goal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: GoalModel, // Nom du modèle auquel il se réfère
      key: 'id_goal'
    }
  },
  name_subgoal: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  start_date_subgoal: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date_subgoal: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status_subgoal: {
    type: DataTypes.ENUM('en attente', 'en cours', 'terminé'),
    allowNull: false,
    defaultValue: 'en attente'
  },
  progress_subgoal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'subgoals',
  timestamps: false
});

SubgoalModel.belongsTo(GoalModel, { foreignKey: 'id_goal' });

module.exports = SubgoalModel;
