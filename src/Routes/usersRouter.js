import {Router} from "express";
import { registerUser, userLogin, getCurrentUser, userLogout } from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post('/register',registerUser);
usersRouter.post('/login', userLogin);
usersRouter.get('/profile', authenticateJWT, getCurrentUser);
usersRouter.get('/logout', userLogout);

export default usersRouter;