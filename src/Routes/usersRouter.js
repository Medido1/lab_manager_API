import {Router} from "express";
import { registerUser, userLogin, getCurrentUser } from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/auth.js";
import rateLimit from "express-rate-limit";

const usersRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: "Too many login attempts. Try again later."
});

usersRouter.post('/register',registerUser);
usersRouter.post('/login', loginLimiter, userLogin);
usersRouter.get('/profile', authenticateJWT, getCurrentUser);

export default usersRouter;