const express = require('express');
const router = express.Router();
const subGoalsController = require('../controllers/subGoalsController');
const verifyToken = require('../middlewares/authMiddleware');

// Routes pour les sous-objectifs
router.get('/:id_goal/subgoals', verifyToken, subGoalsController.getAllSubGoals);
router.post('/:id_goal/subgoals', verifyToken, subGoalsController.createSubGoal);
router.put('/:id_goal/subgoals/:id_subgoal', verifyToken, subGoalsController.updateSubGoal);
router.delete('/:id_goal/subgoals/:id_subgoal', verifyToken, subGoalsController.deleteSubGoal);

module.exports = router;
