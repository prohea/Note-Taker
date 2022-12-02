const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const {
	readAndAppend,
	readFromFile,
	writeToFile,
} = require("../helpers/fsUtils");

//GET route for getting all the notes
notes.get("/", (req, res) => {
	readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});

//GET route for a specific note
notes.get("/:note_id", (req, res) => {
    const noteId = req.params.note_id;
    readFromFile("/db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that id');
    });
});

//DELETE route for deleting notes
notes.delete("/:note_id", (req, res) => {
	const noteId = req.params.note_id;
	readFromFile("../db/db.json")
		.then((data) => JSON.parse(data))
		.then((json) => {
			console.log(json);
            //Make a new array of all notes except the one with the id provided in the URL
			const result = json.filter((note) => note.note_id !== noteId);

            //Save that array to the filesystem
			writeToFile("../db/db.json", result);

            //Respond to the DELETE request
			res.json(`Item ${noteId} has been deleted`);
		});
});

//POST route for posting notes
notes.post("/", (req, res) => {
    console.log(req.body);
	const { title, text } = req.body;

	if (req.body) {
		const newNotes = {
			title,
			text,
			note_id: uuid4(),
		};

		readAndAppend(newNotes, "../db/db.json");

		const response = {
			status: "success",
			body: newNotes,
		};

		res.json(response);
	} else {
		res.error("Error in posting notes");
	}
});

module.exports = notes;
