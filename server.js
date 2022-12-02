const express = require("express");
const path = require("path");
const app = express();
const api = require("./routes/index");

const PORT = process.env.PORT || 3001;

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/api", api);
app.use(express.static("public"));

//GET Route for homepage
app.get("/", (req,res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

//GET Route for note page
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

//Wildcard route to direct users to a 404 page
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/")))
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));