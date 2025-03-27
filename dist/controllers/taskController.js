"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const TaskModel = __importStar(require("../models/Task"));
const getAllTasks = (req, res) => {
    const tasks = TaskModel.getAllTasks();
    res.json(tasks);
};
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => {
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
exports.getTaskById = getTaskById;
const createTask = (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};
exports.createTask = createTask;
const updateTask = (req, res) => {
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
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
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
exports.deleteTask = deleteTask;
