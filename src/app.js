import express from 'express';
import dotenv from "dotenv";
import usersRouter from './Routes/usersRouter.js';
import clientsRouter from './Routes/clientsRouter.js';
import { authenticateJWT } from './middleware/auth.js';
import cors from 'cors';
import https from 'https';

//load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',          // React dev server
  'https://mylabmanager.netlify.app',   // Netlify deployment
];

// Allow requests from the frontend
app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or Postman)
    if(!origin) return callback(null, true);

    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  })
});

app.use("/users", usersRouter);
app.use("/clients",authenticateJWT, clientsRouter);

/* https.createServer(app).listen(PORT, () => {
  console.log(`HTTP backend running on port ${PORT}`);
}); */
app.listen(PORT, () => {
  console.log(`HTTP backend running on port ${PORT}`);
});
