const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use('/api/v1', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Is Running On Port ${port}`);
});
