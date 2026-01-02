import {Router} from "express";
import { registerUser, userLogin } from "../controllers/userController.js";

const usersRouter = Router();

usersRouter.post('/register',registerUser);
usersRouter.post('/login', userLogin);

export default usersRouter;