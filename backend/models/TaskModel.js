const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const SubGoalModel = require('../models/SubGoalModel');

const TaskModel = sequelize.define('Task', {
  id_task: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_subgoal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SubGoalModel, // Nom du modèle auquel il se réfère
      key: 'id_subgoal'
    }
  },
  name_task: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  start_date_task: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date_task: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status_task: {
    type: DataTypes.ENUM('en cours', 'terminé'),
    allowNull: false,
    defaultValue: 'en cours'
  }
}, {
  tableName: 'task',
  timestamps: false
});

TaskModel.belongsTo(SubGoalModel, { foreignKey: 'id_subgoal' });

module.exports = TaskModel;
