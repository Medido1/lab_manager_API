import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRoute.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);

app.listen(PORT, '0.0.0.0', (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`Server running on PORT: ${PORT}`);
});