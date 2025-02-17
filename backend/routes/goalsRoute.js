const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, goalsController.getAllGoals);
router.get('/:id_goal', verifyToken, goalsController.getGoalById);
router.post('/', verifyToken, goalsController.createGoal);
router.put('/:id_goal', verifyToken, goalsController.updateGoal);
router.delete('/:id_goal', verifyToken, goalsController.deleteGoal);

module.exports = router;