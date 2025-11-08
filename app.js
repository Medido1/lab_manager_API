import express from 'express';

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('hello world')
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`Server running on PORT: ${PORT}`);
})