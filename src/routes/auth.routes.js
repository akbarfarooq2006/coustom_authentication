import { Router } from "express";
import { register, deleteAllUsers, getMe,refreshToken } from "../controllers/auth.controller.js";

const authRouter = Router();



/** 
 * POST /api/auth/register
 */
authRouter.post('/register', register);


/**
 * GET /api/auth/get-me
 */
authRouter.get('/get-me', getMe);


/**
 * GET /api/auth/refresh-token
 */
authRouter.get('/refresh-token',refreshToken);


/**
 * DELETE /api/auth/delete
 */
authRouter.delete('/delete', deleteAllUsers);

export default authRouter;
