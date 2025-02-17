const SubGoalModel = require('../models/SubGoalModel');
const GoalModel = require('../models/GoalModel');

exports.getAllSubGoals = async (req, res) => {
    const { id_goal } = req.params;
    const id_user = req.userId;
  
    try {
      const goal = await GoalModel.findOne({ where: { id_goal, id_user } });
  
      if (!goal) {
        return res.status(404).json({ error: 'Objectif non trouvé ou non autorisé.' });
      }
  
      const subgoals = await SubGoalModel.findAll({ where: { id_goal } });
  
      res.status(200).json(subgoals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.createSubGoal = async (req, res) => {
  const { id_goal } = req.params;
  const { name_subgoal, start_date_subgoal, end_date_subgoal, status_subgoal, progress_subgoal } = req.body;
  const id_user = req.userId;

  try {
    console.log('Params:', req.params);
    console.log('Body:', req.body);

    const goal = await GoalModel.findOne({ where: { id_goal, id_user } });
    
    if (!goal) {
      console.error('Objectif non trouvé ou non autorisé.');
      return res.status(404).json({ error: 'Objectif non trouvé ou non autorisé.' });
    }

    const newSubGoal = await SubGoalModel.create({
      id_goal,
      name_subgoal,
      start_date_subgoal: start_date_subgoal || new Date(), // S'assurer que les dates sont correctement gérées
      end_date_subgoal: end_date_subgoal || new Date(),
      status_subgoal: status_subgoal || 'en attente',
      progress_subgoal: progress_subgoal || 0
    });

    res.status(201).json(newSubGoal);
  } catch (error) {
    console.error('Erreur lors de la création du sous-objectif :', error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.updateSubGoal = async (req, res) => {
  const { id_goal, id_subgoal } = req.params;
  const { name_subgoal, start_date_subgoal, end_date_subgoal, status_subgoal, progress_subgoal } = req.body;
  const id_user = req.userId;

  try {
    const goal = await GoalModel.findOne({ where: { id_goal, id_user } });

    if (!goal) {
      console.log('Objectif non trouvé ou non autorisé.');
      return res.status(404).json({ error: 'Objectif non trouvé ou non autorisé.' });
    }

    const subgoal = await SubGoalModel.findOne({ where: { id_subgoal, id_goal } });

    if (!subgoal) {
      console.log('Sous-objectif non trouvé.');
      return res.status(404).json({ error: 'Sous-objectif non trouvé.' });
    }

    // Mise à jour explicite des champs
    subgoal.name_subgoal = name_subgoal !== undefined ? name_subgoal : subgoal.name_subgoal;
    subgoal.start_date_subgoal = start_date_subgoal !== undefined ? start_date_subgoal : subgoal.start_date_subgoal;
    subgoal.end_date_subgoal = end_date_subgoal !== undefined ? end_date_subgoal : subgoal.end_date_subgoal;
    subgoal.status_subgoal = status_subgoal !== undefined ? status_subgoal : subgoal.status_subgoal;
    subgoal.progress_subgoal = progress_subgoal !== undefined ? progress_subgoal : subgoal.progress_subgoal;

    await subgoal.save();

    console.log('Sous-objectif mis à jour:', subgoal);

    res.status(200).json(subgoal);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du sous-objectif:', error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteSubGoal = async (req, res) => {
  const { id_goal, id_subgoal } = req.params;
  const id_user = req.userId;

  try {
    const goal = await GoalModel.findOne({ where: { id_goal, id_user } });

    if (!goal) {
      return res.status(404).json({ error: 'Objectif non trouvé ou non autorisé.' });
    }

    const subgoal = await SubGoalModel.findOne({ where: { id_subgoal, id_goal } });

    if (!subgoal) {
      return res.status(404).json({ error: 'Sous-objectif non trouvé.' });
    }

    await subgoal.destroy();

    res.status(200).json({ message: 'Sous-objectif supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
