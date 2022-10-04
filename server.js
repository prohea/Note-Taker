// Calling 
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
const PORT = process.env.port || 3001;
const app = express();

//Importing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
}

);

//Post
app.post('/api/notes', (req, res) => {
    const { noteTitle, noteText} = req.body;

    // If all the required properties are present
    if (noteTitle && noteText) {
      // Variable for the object we will save
      const newNote = {
        noteTitle,
        noteText,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, 'db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });
  
  module.exports = note;

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
