# Task Management System

A modern task management system with a retro-modern design, built using TypeScript, Node.js, Express, and a feature-rich frontend.

![Task Management System Screenshot](https://i.imgur.com/example.png)

## Features

- Create, read, update, and delete tasks
- Set task priorities (low, medium, high)
- Mark tasks as completed/pending
- Task deadline management
- Interactive statistics dashboard
- Local storage persistence
- Responsive design for desktop and mobile
- Modern UI with retro design elements
- Real-time notifications
- Sorting tasks by priority and completion status

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Typed JavaScript superset
- **Body-parser** - Request parsing middleware
- **CORS** - Cross-Origin Resource Sharing middleware

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with:
  - CSS Variables
  - Flexbox & Grid layouts
  - Animations & Transitions
  - Media Queries for responsiveness
- **JavaScript (ES6+)** - Client-side functionality
- **LocalStorage API** - Client-side data persistence
- **Font Awesome** - Icon library

### Development Tools
- **TypeScript Compiler** - Static type checking
- **ts-node** - TypeScript execution
- **Nodemon** - Development server with hot reload

## Getting Started

### System Requirements
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Maks0101aps/TaskManagementSystem.git
   cd TaskManagementSystem
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```
   
   This will install both production and development dependencies defined in package.json.

3. Build the project (transpile TypeScript to JavaScript):
   ```bash
   npm run build
   ```
   
   This creates the `dist` folder with compiled JavaScript files.

### Running the Application

#### Development Mode
To run the application in development mode with automatic restart on file changes:



The server will be available at http://localhost:3000.

#### Production Mode
For production deployment, run:

```bash
npm start
```

This will use the compiled JavaScript from the `dist` directory.

### Complete Setup (If Starting from Scratch)

If you're setting up the project for the first time, here's the complete set of commands:

```bash
# 1. Clone repository
git clone https://github.com/Maks0101aps/TaskManagementSystem.git
cd TaskManagementSystem

# 2. Install dependencies
npm install

# 3. If any dependencies are missing, install them specifically
npm install express cors body-parser
npm install --save-dev typescript ts-node nodemon @types/express @types/cors @types/body-parser @types/node

# 4. Build the project
npm run build

# 5. Start the application
npm start
```

## Usage

1. **Adding Tasks**:
   - Fill out the task form on the left side
   - Tasks require a title, but description and deadline are optional
   - Select an appropriate priority (Low, Medium, High)
   - Click "Add Task" to create the task

2. **Managing Tasks**:
   - View all tasks in the main section
   - Click "Mark as Completed" to toggle task status
   - Use "Delete" to remove a task (confirmation required)
   - Tasks are automatically sorted by priority and completion status

3. **Data Persistence**:
   - All tasks are saved in browser's localStorage
   - Tasks persist between page reloads and browser sessions
   - No account required; data is stored locally on your device

## Project Structure

```
TaskManagementSystem/
├── src/                   # Source files
│   ├── controllers/       # Request handlers
│   │   └── taskController.ts   # Task CRUD operations
│   ├── models/            # Data models
│   │   └── Task.ts        # Task interface and storage
│   ├── routes/            # API routes
│   │   └── taskRoutes.ts  # API endpoints
│   ├── public/            # Static assets
│   │   ├── css/           # Stylesheets
│   │   │   └── styles.css # Main CSS file
│   │   └── js/            # Client-side JavaScript
│   │       └── app.js     # Main frontend functionality
│   ├── views/             # HTML templates
│   │   └── index.html     # Main application page
│   └── server.ts          # Express server configuration
├── dist/                  # Compiled JavaScript
├── node_modules/          # Dependencies
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Dependency lock file
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## Browser Support

The application is compatible with:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest version)

## Troubleshooting

- **Server won't start**: Check if port 3000 is already in use
- **Missing module errors**: Run `npm install` to ensure all dependencies are installed
- **TypeScript errors**: Check your TypeScript version (`npm list typescript`)

## Future Enhancements

- User authentication system
- Task categories and tags
- Advanced filtering and search
- Database integration (MongoDB/PostgreSQL)
- Mobile app using React Native
- Dark mode theme
- Task attachments
- Recurring tasks
- Email notifications

## License

This project is licensed under the MIT License.

## Author

Created by [Maks0101aps](https://github.com/Maks0101aps) 