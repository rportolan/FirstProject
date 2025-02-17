const GoalModel = require('../models/GoalModel');
const UserModel = require('../models/UserModel');

// Afficher tous les objectifs d'un utilisateur
exports.getAllGoals = async (req, res) => {
  try {
    const userId = req.userId; // Obtenu du middleware de vérification du token

    const goals = await GoalModel.findAll({
      where: { id_user: userId },
      include: [UserModel]
    });

    if (!goals) {
      return res.status(404).json({ error: 'Aucun objectif trouvé pour cet utilisateur.' });
    }

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un message par ID
exports.getGoalById = async (req, res) => {
  const { id_goal } = req.params;
  try {
    const goal = await GoalModel.findByPk(id_goal);
    if (!goal) {
      return res.status(404).json({ error: 'Objectif non trouvé.' });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//création d'un objectif
exports.createGoal = async (req, res) => {
  const { name_goal, start_date_goal, end_date_goal, status_goal, progress_goal } = req.body; //destructuration
  const id_user = req.userId; // Récupérer l'ID utilisateur du token

  if (!name_goal || !start_date_goal || !end_date_goal) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const newGoal = await GoalModel.create({ 
      name_goal, 
      start_date_goal, 
      end_date_goal, 
      status_goal: status_goal || 'en attente', // Optionnel avec une valeur par défaut
      progress_goal: progress_goal || 0, // Optionnel avec une valeur par défaut
      id_user
    });
    console.log('Objectif créé!');
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGoal = async (req, res) => {
  const { id_goal } = req.params;
  const { name_goal, start_date_goal, end_date_goal, status_goal, progress_goal } = req.body;
  const id_user = req.userId;

  try {
    const goal = await GoalModel.findOne({ where: { id_goal, id_user } });

    if (!goal) {
      console.log('Objectif non trouvé ou non autorisé.');
      return res.status(404).json({ error: 'Objectif non trouvé ou non autorisé.' });
    }

    // Mise à jour explicite des champs
    goal.name_goal = name_goal !== undefined ? name_goal : goal.name_goal;
    goal.start_date_goal = start_date_goal !== undefined ? start_date_goal : goal.start_date_goal;
    goal.end_date_goal = end_date_goal !== undefined ? end_date_goal : goal.end_date_goal;
    goal.status_goal = status_goal !== undefined ? status_goal : goal.status_goal;
    goal.progress_goal = progress_goal !== undefined ? progress_goal : goal.progress_goal;

    await goal.save();

    console.log('Objectif mis à jour:', goal);

    res.status(200).json(goal);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'objectif:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Supprimer un objectif d'un utilisateur
exports.deleteGoal = async (req, res) => {
  const { id_goal } = req.params; // Récupérer l'ID de l'objectif depuis les paramètres de l'URL
  const id_user = req.userId; // Récupérer l'ID utilisateur du token

  try {
    // Trouver l'objectif par son ID et vérifier qu'il appartient à l'utilisateur
    const goal = await GoalModel.findOne({
      where: { id_goal, id_user }
    });

    // Vérifier si l'objectif existe et appartient à l'utilisateur
    if (!goal) {
      return res.status(404).json({ error: 'Objectif non trouvé' });
    }

    // Supprimer l'objectif
    await goal.destroy();

    console.log('Objectif supprimé!');
    res.status(200).json({ message: 'Objectif supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







