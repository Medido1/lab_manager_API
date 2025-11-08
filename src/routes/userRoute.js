import { Router } from "express";
import { 
  registerUser, userLogin,
  authenticateJWT, verifyToken
 } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register',registerUser);
userRouter.post('/login', userLogin);
userRouter.get('/profile', authenticateJWT, verifyToken);

export default userRouter;