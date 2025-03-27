export interface Task {
    id: number;
    title: string;
    description: string;
    deadline?: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// In-memory storage for tasks during development
export const tasks: Task[] = [];

export const getAllTasks = (): Task[] => {
    return tasks;
};

export const getTaskById = (id: number): Task | undefined => {
    return tasks.find(task => task.id === id);
};

export const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
    const newTask: Task = {
        id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    tasks.push(newTask);
    return newTask;
};

export const updateTask = (id: number, taskData: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Task | null => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return null;
    }
    
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskData,
        updatedAt: new Date()
    };
    
    return tasks[taskIndex];
};

export const deleteTask = (id: number): boolean => {
    const initialLength = tasks.length;
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === initialLength) {
        return false;
    }
    
    tasks.length = 0; // Clear the array
    tasks.push(...filteredTasks); // Add the filtered tasks
    
    return true;
}; 