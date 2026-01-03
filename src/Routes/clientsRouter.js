import { Router } from "express";
import { addClient } from "../controllers/clientController.js";

const clientsRouter = Router();

clientsRouter.post('/add', addClient);

export default clientsRouter