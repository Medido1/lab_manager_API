import { Router } from "express";
import { addClient, getData } from "../controllers/clientController.js";

const clientsRouter = Router();

clientsRouter.post('/add', addClient);
clientsRouter.get('/:type', getData);

export default clientsRouter