// General set-up steps
    // 1. Create server.js file
    // 2. Create routes folder with apiRoutes.js and htmlRoutes.js files
    // 3. npm install express

// Import dependencies
const express = require('express');

// Import route files
const apiRoutes = require('./Develop/routes/apiRoutes');
const htmlRoutes = require('./Develop/routes/htmlRoutes');

// Import express server
const app = express();

// Set the PORT
const PORT = process.env.port || 3001;

// Middleware to parse JSON and url encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));
app.use('./api', apiRoutes);
app.use('./api', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);