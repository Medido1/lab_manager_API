import { Router } from "express";
import { 
  addClient, getData, 
  checkAsCompleted, deleteClient, 
  editClient, getAllClients,
  importData, addMultipleClients } from "../controllers/clientController.js";

const clientsRouter = Router();

clientsRouter.post('/add/multi', addMultipleClients);
clientsRouter.post('/add', addClient);
clientsRouter.get('/all', getAllClients);
clientsRouter.post('/import', importData)
clientsRouter.get('/:type', getData);
clientsRouter.patch('/:id/update', checkAsCompleted);
clientsRouter.delete('/:id/delete', deleteClient);
clientsRouter.put('/:id/edit', editClient);
clientsRouter.get('/all', getAllClients);


export default clientsRouter