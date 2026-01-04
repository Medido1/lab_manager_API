import { Router } from "express";
import { addClient, getData, checkAsCompleted } from "../controllers/clientController.js";

const clientsRouter = Router();

clientsRouter.post('/add', addClient);
clientsRouter.get('/:type', getData);
clientsRouter.patch('/:id/update', checkAsCompleted)

export default clientsRouter