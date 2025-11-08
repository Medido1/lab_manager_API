import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('hello world')
});

app.listen(PORT, '0.0.0.0', (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`Server running on PORT: ${PORT}`);
});