import { Router } from "express";
import { registerUser, userLogin } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register',registerUser);
userRouter.post('/login', userLogin);

export default userRouter;