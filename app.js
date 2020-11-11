const express = require('express');
const router = require('./routes/router'); // использую один файл со всеми роутерами

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
