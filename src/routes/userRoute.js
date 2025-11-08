import { Router } from "express";
import { 
  registerUser, userLogin,
  authenticateJWT, verifyToken, userLogout
 } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register',registerUser);
userRouter.post('/login', userLogin);
userRouter.get('/profile', authenticateJWT, verifyToken);
userRouter.get('/logout', userLogout);

export default userRouter;