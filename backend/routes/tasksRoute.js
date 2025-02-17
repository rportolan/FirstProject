const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const verifyToken = require('../middlewares/authMiddleware');

// Routes pour les tâches
router.get('/:id_goal/subgoals/:id_subgoal/tasks', verifyToken, tasksController.getAllTasks);
router.post('/:id_goal/subgoals/:id_subgoal/tasks', verifyToken, tasksController.createTask);
router.put('/:id_goal/subgoals/:id_subgoal/tasks/:id_task', verifyToken, tasksController.updateTask);
router.delete('/:id_goal/subgoals/:id_subgoal/tasks/:id_task', verifyToken, tasksController.deleteTask);

module.exports = router;
