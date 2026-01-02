import {Router} from "express";
import { registerUser } from "../controllers/userController.js";

const usersRouter = Router();

usersRouter.post('/register',registerUser);

export default usersRouter;