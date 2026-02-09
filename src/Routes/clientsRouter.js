import { Router } from "express";
import multer from 'multer';
import { 
  addClient, getData, 
  checkAsCompleted, deleteClient, 
  editClient, getAllClients,
  importData, addMultipleClients,
  uploadClientFile, viewClientFile
} from "../controllers/clientController.js";

const clientsRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('UNSUPPORTED_FILE_TYPE'), false);
    }

    cb(null, true);
  }
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
clientsRouter.get('/:id/file', viewClientFile);

export default clientsRouter