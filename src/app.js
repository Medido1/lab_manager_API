import express from 'express';
import dotenv from "dotenv";
import usersRouter from './Routes/usersRouter.js';
import clientsRouter from './Routes/clientsRouter.js';
import { authenticateJWT } from './middleware/auth.js';
import passport from './config/passport.js';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from '../lib/prisma.js';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


//load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const httpsOptions = {
  key: fs.readFileSync(join(__dirname, 'cert/key.pem')),  // points to src/cert/key.pem
  cert: fs.readFileSync(join(__dirname, 'cert/cert.pem')),
};


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

// creates persistent, signed, cookie-based sessions stored in a database via Prisma.
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 //ms
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 *1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
      }
    )
  })
);

// Initialize Passport and enable persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

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

https.createServer(httpsOptions, app).listen(8000, '0.0.0.0', () => {
  console.log('HTTPS backend running on https://192.168.1.8:8000');
});