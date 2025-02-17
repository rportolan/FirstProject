const TaskModel = require('../models/TaskModel');
const SubGoalModel = require('../models/SubGoalModel');
const GoalModel = require('../models/GoalModel');

exports.getAllTasks = async (req, res) => {
    const { id_subgoal } = req.params;
    const id_user = req.userId;
  
    try {
      const subgoal = await SubGoalModel.findOne({ where: { id_subgoal }, include: { model: GoalModel, where: { id_user } } });
  
      if (!subgoal) {
        return res.status(404).json({ error: 'Sous-objectif non trouvé ou non autorisé.' });
      }
  
      const tasks = await TaskModel.findAll({ where: { id_subgoal } });
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
  const { id_subgoal } = req.params;
  const { name_task, start_date_task, end_date_task, status_task } = req.body;
  const id_user = req.userId;

  try {
    const subgoal = await SubGoalModel.findOne({ where: { id_subgoal }, include: { model: GoalModel, where: { id_user } } });

    if (!subgoal) {
      return res.status(404).json({ error: 'Sous-objectif non trouvé ou non autorisé.' });
    }

    const newTask = await TaskModel.create({
      id_subgoal,
      name_task,
      start_date_task: start_date_task || new Date(),
      end_date_task: end_date_task || new Date(),
      status_task: status_task || 'en cours'
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id_subgoal, id_task } = req.params;
  const { name_task, start_date_task, end_date_task, status_task } = req.body;
  const id_user = req.userId;

  try {
    const subgoal = await SubGoalModel.findOne({ where: { id_subgoal }, include: { model: GoalModel, where: { id_user } } });

    if (!subgoal) {
      return res.status(404).json({ error: 'Sous-objectif non trouvé ou non autorisé.' });
    }

    const task = await TaskModel.findOne({ where: { id_task, id_subgoal } });

    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée.' });
    }

    task.name_task = name_task || task.name_task;
    task.start_date_task = start_date_task || task.start_date_task;
    task.end_date_task = end_date_task || task.end_date_task;
    task.status_task = status_task || task.status_task;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id_subgoal, id_task } = req.params;
  const id_user = req.userId;

  try {
    const subgoal = await SubGoalModel.findOne({ where: { id_subgoal }, include: { model: GoalModel, where: { id_user } } });

    if (!subgoal) {
      return res.status(404).json({ error: 'Sous-objectif non trouvé ou non autorisé.' });
    }

    const task = await TaskModel.findOne({ where: { id_task, id_subgoal } });

    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée.' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
