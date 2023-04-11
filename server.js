const express = require('express');
const apiRouter = require('./routes/api_routes');
const htmlRouter = require('./routes/html_routes');
const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', htmlRouter);
app.use('/api', apiRouter);
app.use(express.static('public'));
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);