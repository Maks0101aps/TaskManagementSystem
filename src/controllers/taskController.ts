import { Request, Response } from 'express';
import * as TaskModel from '../models/Task';

export const getAllTasks = (req: Request, res: Response): void => {
    const tasks = TaskModel.getAllTasks();
    res.json(tasks);
};

export const getTaskById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid task ID' });
        return;
    }
    
    const task = TaskModel.getTaskById(id);
    
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    
    res.json(task);
};

export const createTask = (req: Request, res: Response): void => {
    const { title, description, deadline, priority, completed } = req.body;
    
    if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
    }
    
    try {
        const newTask = TaskModel.createTask({
            title,
            description: description || '',
            deadline,
            priority: priority || 'medium',
            completed: completed || false
        });
        
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

export const updateTask = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid task ID' });
        return;
    }
    
    const { title, description, deadline, priority, completed } = req.body;
    
    const updatedTask = TaskModel.updateTask(id, {
        title,
        description,
        deadline,
        priority,
        completed
    });
    
    if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    
    res.json(updatedTask);
};

export const deleteTask = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid task ID' });
        return;
    }
    
    const success = TaskModel.deleteTask(id);
    
    if (!success) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    
    res.status(204).end();
}; 