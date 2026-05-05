import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// Logging middleware
app.use(morgan("dev"));

// routes for /api/auth
app.use('/api/auth', authRouter);


// Export server
export default app;