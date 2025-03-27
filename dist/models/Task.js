"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = exports.tasks = void 0;
// In-memory storage for tasks during development
exports.tasks = [];
const getAllTasks = () => {
    return exports.tasks;
};
exports.getAllTasks = getAllTasks;
const getTaskById = (id) => {
    return exports.tasks.find(task => task.id === id);
};
exports.getTaskById = getTaskById;
const createTask = (taskData) => {
    const newTask = {
        id: exports.tasks.length > 0 ? Math.max(...exports.tasks.map(task => task.id)) + 1 : 1,
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    exports.tasks.push(newTask);
    return newTask;
};
exports.createTask = createTask;
const updateTask = (id, taskData) => {
    const taskIndex = exports.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return null;
    }
    exports.tasks[taskIndex] = {
        ...exports.tasks[taskIndex],
        ...taskData,
        updatedAt: new Date()
    };
    return exports.tasks[taskIndex];
};
exports.updateTask = updateTask;
const deleteTask = (id) => {
    const initialLength = exports.tasks.length;
    const filteredTasks = exports.tasks.filter(task => task.id !== id);
    if (filteredTasks.length === initialLength) {
        return false;
    }
    exports.tasks.length = 0; // Clear the array
    exports.tasks.push(...filteredTasks); // Add the filtered tasks
    return true;
};
exports.deleteTask = deleteTask;
