import express from 'express';
import * as taskController from '../controllers/taskController';

const router = express.Router();

// GET all tasks
router.get('/', taskController.getAllTasks);

// GET a single task by ID
router.get('/:id', taskController.getTaskById);

// POST a new task
router.post('/', taskController.createTask);

// PUT (update) a task
router.put('/:id', taskController.updateTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

export default router; 