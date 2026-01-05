import { Router } from "express";
import { 
  addClient, getData, 
  checkAsCompleted, deleteClient, editClient } from "../controllers/clientController.js";

const clientsRouter = Router();

clientsRouter.post('/add', addClient);
clientsRouter.get('/:type', getData);
clientsRouter.patch('/:id/update', checkAsCompleted);
clientsRouter.delete('/:id/delete', deleteClient);
clientsRouter.put('/:id/edit', editClient);

export default clientsRouter