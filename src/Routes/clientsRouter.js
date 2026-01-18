import { Router } from "express";
import multer from 'multer';
import { 
  addClient, getData, 
  checkAsCompleted, deleteClient, 
  editClient, getAllClients,
  importData, addMultipleClients,
  uploadClientFile
} from "../controllers/clientController.js";

const clientsRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

clientsRouter.post('/add/multi', addMultipleClients);
clientsRouter.post('/add', addClient);
clientsRouter.get('/all', getAllClients);
clientsRouter.post('/import', importData)
clientsRouter.get('/:type', getData);
clientsRouter.patch('/:id/update', checkAsCompleted);
clientsRouter.delete('/:id/delete', deleteClient);
clientsRouter.put('/:id/edit', editClient);
clientsRouter.post('/:id/upload',upload.single('file'), uploadClientFile);


export default clientsRouter