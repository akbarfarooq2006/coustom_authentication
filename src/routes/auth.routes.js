import { Router } from "express";
import { register, deleteAllUsers, getMe } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post('/register', register);
authRouter.get('/get-me', getMe);
authRouter.delete('/delete', deleteAllUsers);

export default authRouter;
