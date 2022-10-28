// General set-up steps
    // 1. Create server.js file
    // 2. Create routes folder with apiRoutes.js and htmlRoutes.js files
    // 3. npm install express

// Import dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const noteEntries = require('./Develop/db/db.json');

// Import express server
const app = express();

// Set the PORT
const PORT = process.env.port || 3001;

// Middleware to parse JSON and url encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Sets the function to create a new note
function newNoteEntry (body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

// Post route for submitting notes
app.post('/api/notes', (req, res) => {
    const newNote = newNoteEntry(req.body, noteEntries);
    res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});