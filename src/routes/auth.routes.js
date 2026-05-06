import { Router } from "express";
import { register, deleteAllUsers, deleteAllSessions, getMe,refreshToken, logout} from "../controllers/auth.controller.js";

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

/**
 * DELETE /api/auth/delete-sessions
 */
authRouter.delete('/delete-sessions', deleteAllSessions);

/**
 * POST /api/auth/logout
 */
authRouter.post('/logout', logout)

/**
 * POST /api/auth/logout-all
 */
authRouter.post('/logout-all', logoutAll)






export default authRouter;
