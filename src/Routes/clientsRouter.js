import { Router } from "express";
import { addClient, getData, checkAsCompleted, deleteClient } from "../controllers/clientController.js";

const clientsRouter = Router();

clientsRouter.post('/add', addClient);
clientsRouter.get('/:type', getData);
clientsRouter.patch('/:id/update', checkAsCompleted);
clientsRouter.delete('/:id/delete', deleteClient);

export default clientsRouter