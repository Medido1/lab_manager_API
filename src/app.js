import express from 'express';
import dotenv from "dotenv";
import usersRouter from './Routes/usersRouter.js';
import clientsRouter from './Routes/clientsRouter.js';
import { authenticateJWT } from './middleware/auth.js';
import cors from 'cors';
import morgan from 'morgan';
import https from 'https';

//load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',          // React dev server
  'https://mylabmanager.netlify.app',   // Netlify deployment
];

//allow requests from allowedOrigins or postman
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false); // blocks disallowed origins gracefully
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// log all requests 
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/clients",authenticateJWT, clientsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  })
});

/* https.createServer(app).listen(PORT, () => {
  console.log(`HTTP backend running on port ${PORT}`);
}); */
app.listen(PORT, () => {
  console.log(`HTTP backend running on port ${PORT}`);
});
