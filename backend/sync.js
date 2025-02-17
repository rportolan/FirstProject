const sequelize = require('./config/sequelize');

const UserModel = require('./models/UserModel');
const GoalModel = require('./models/GoalModel');
const SubGoalModel = require('./models/SubGoalModel');
const MessageModel = require('./models/MessageModel');
const TaskModel = require('./models/TaskModel');

// Définir les associations
UserModel.hasMany(GoalModel, { foreignKey: 'id_user', onDelete: 'CASCADE' });
GoalModel.belongsTo(UserModel, { foreignKey: 'id_user' });

UserModel.hasMany(MessageModel, { foreignKey: 'id_user', onDelete: 'CASCADE' });
MessageModel.belongsTo(UserModel, { foreignKey: 'id_user' });

GoalModel.hasMany(SubGoalModel, { foreignKey: 'id_goal', onDelete: 'CASCADE' });
SubGoalModel.belongsTo(GoalModel, { foreignKey: 'id_goal' });

SubGoalModel.hasMany(TaskModel, { foreignKey: 'id_subgoal', onDelete: 'CASCADE' });
TaskModel.belongsTo(SubGoalModel, { foreignKey: 'id_subgoal' });

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables synchronized');
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});



