import express from 'express';
import morgan from 'morgan';
import auth from './routes/auth.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan("dev"));

// routes for authentication
app.use('/auth', auth)


// Export server
export default app;