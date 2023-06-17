const express = require('express');
require('dotenv').config();

const booksRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/v1/books', booksRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Connect Sucessfully on port ${port}`);
});
