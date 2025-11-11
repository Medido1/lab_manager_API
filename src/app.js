import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import clientsRouter from "./routes/clientsRoute.js";
import passport from './config/passport.js';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from './prismaClient.js';
import cors from 'cors';
import { authenticateJWT } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true, // allow cookies (needed for session)
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  })
});

app.use("/users", userRouter);
app.use("/clients",authenticateJWT, clientsRouter);

app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`Server running on PORT: ${PORT}`);
});
