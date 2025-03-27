import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../src/public')));

// API Routes
app.use('/api/tasks', taskRoutes);

// Frontend Routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

// Catch-all route for SPA
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 