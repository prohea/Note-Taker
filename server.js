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
    const { email, feedbackType, feedback } = req.body;

    // If all the required properties are present
    if (email && feedbackType && feedback) {
      // Variable for the object we will save
      const newFeedback = {
        email,
        feedbackType,
        feedback,
        feedback_id: uuidv4(),
      };
  
      readAndAppend(newFeedback, './db/feedback.json');
  
      const response = {
        status: 'success',
        body: newFeedback,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
  });
  
  module.exports = fb;
}

);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
