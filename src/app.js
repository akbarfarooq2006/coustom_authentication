import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan("dev"));

// routes for /api/auth
app.use('/api/auth', authRouter);


// Export server
export default app;