const express = require('express');
const path = require('path');
const routes = require('../backend/src/routes/routes.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;





