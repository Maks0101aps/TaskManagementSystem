"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
// API Routes
app.use('/api/tasks', taskRoutes_1.default);
// Frontend Routes
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src/views/index.html'));
});
// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src/views/index.html'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
