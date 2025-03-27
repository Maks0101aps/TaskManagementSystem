document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const tasksContainer = document.getElementById('tasks-container');
    const totalTasksElement = document.getElementById('total-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');
    const pendingTasksElement = document.getElementById('pending-tasks');
    const logoElement = document.getElementById('logo');
    const easterEggElement = document.getElementById('easter-egg');
    
    // Easter egg functionality
    logoElement.addEventListener('click', function() {
        easterEggElement.classList.add('active');
        
        // Close easter egg when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeEasterEgg(e) {
                if (!e.target.closest('.easter-egg-content')) {
                    easterEggElement.classList.remove('active');
                    document.removeEventListener('click', closeEasterEgg);
                }
            });
        }, 100);
    });
    
    // Initialize tasks from localStorage or use default sample tasks
    let tasks = loadTasksFromStorage();
    
    // Display tasks on page load
    renderTasks();
    updateStats();
    
    // Handle form submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const deadline = document.getElementById('task-deadline').value;
        const priority = document.getElementById('task-priority').value;
        
        // Create new task object
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
            title,
            description,
            deadline,
            priority,
            completed: false,
            createdAt: new Date()
        };
        
        // Add to tasks array
        tasks.push(newTask);
        
        // Save to localStorage
        saveTasksToStorage();
        
        // Update display
        renderTasks();
        updateStats();
        
        // Show success message
        showNotification('Task added successfully!', 'success');
        
        // Reset form
        taskForm.reset();
    });
    
    // Function to render tasks in the container
    function renderTasks() {
        tasksContainer.innerHTML = '';
        
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<div class="empty-state"><i class="fas fa-clipboard fa-3x"></i><p>No tasks yet. Add a task to get started!</p></div>';
            return;
        }
        
        // Sort tasks by completion status and then by priority
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.completed === b.completed) {
                const priorityValues = { high: 3, medium: 2, low: 1 };
                return priorityValues[b.priority] - priorityValues[a.priority];
            }
            return a.completed ? 1 : -1;
        });
        
        sortedTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item priority-${task.priority}`;
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.dataset.id = task.id;
            
            const taskStatus = task.completed ? 'completed' : 'pending';
            const priorityIcon = getPriorityIcon(task.priority);
            
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description || 'No description provided'}</p>
                <div class="task-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${formatDate(task.deadline)}</span>
                    <span>${priorityIcon} ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                    <span><i class="fas fa-check-circle"></i> Status: ${taskStatus}</span>
                </div>
                <div class="task-actions">
                    <button class="toggle-status" data-id="${task.id}">
                        <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                        ${task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                    </button>
                    <button class="delete-task" data-id="${task.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            tasksContainer.appendChild(taskElement);
        });
        
        // Add event listeners for task actions
        document.querySelectorAll('.toggle-status').forEach(button => {
            button.addEventListener('click', toggleTaskStatus);
        });
        
        document.querySelectorAll('.delete-task').forEach(button => {
            button.addEventListener('click', deleteTask);
        });
    }
    
    // Update statistics
    function updateStats() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        
        totalTasksElement.textContent = totalTasks;
        completedTasksElement.textContent = completedTasks;
        pendingTasksElement.textContent = pendingTasks;
    }
    
    // Get priority icon based on priority level
    function getPriorityIcon(priority) {
        switch(priority) {
            case 'high':
                return '<i class="fas fa-exclamation-circle" style="color: var(--danger-color);"></i>';
            case 'medium':
                return '<i class="fas fa-flag" style="color: var(--warning-color);"></i>';
            case 'low':
                return '<i class="fas fa-arrow-down" style="color: var(--success-color);"></i>';
            default:
                return '<i class="fas fa-flag"></i>';
        }
    }
    
    // Toggle task status
    function toggleTaskStatus(event) {
        const taskId = parseInt(event.target.closest('.toggle-status').dataset.id);
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = !task.completed;
            saveTasksToStorage();
            renderTasks();
            updateStats();
            
            showNotification(`Task marked as ${task.completed ? 'completed' : 'pending'}`, 'info');
        }
    }
    
    // Delete task
    function deleteTask(event) {
        const taskId = parseInt(event.target.closest('.delete-task').dataset.id);
        const taskToDelete = tasks.find(task => task.id === taskId);
        
        if (confirm(`Are you sure you want to delete "${taskToDelete.title}"?`)) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasksToStorage();
            renderTasks();
            updateStats();
            
            showNotification('Task deleted successfully!', 'warning');
        }
    }
    
    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-bell"></i>';
        }
        
        notification.innerHTML = `${icon} ${message}`;
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return 'No deadline';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // Save tasks to localStorage
    function saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Load tasks from localStorage
    function loadTasksFromStorage() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            return JSON.parse(storedTasks);
        }
        // Default sample tasks if none in storage
        return [
            {
                id: 1,
                title: 'Complete project setup',
                description: 'Set up the basic structure for the task management system',
                deadline: '2025-04-15',
                priority: 'high',
                completed: false,
                createdAt: new Date()
            },
            {
                id: 2,
                title: 'Design database schema',
                description: 'Create database schema for storing tasks and users',
                deadline: '2025-04-20',
                priority: 'medium',
                completed: false,
                createdAt: new Date()
            }
        ];
    }
}); 