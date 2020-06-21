const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const { promisify } = require("util");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const { response } = require("express");
const uuid = require("uuid/v1");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Function to get the data from db.json
const getNotesFromFile = async () => {
  const filePath = path.join(__dirname, "Develop/db/db.json");
  const notesData = await readFileAsync(filePath, "utf8");
  const notes = JSON.parse(notesData);
  return notes;
};
//Function to write new data from db.json
const writeNotesToFile = async (tables) => {
  const filePath = path.join(__dirname, "Develop/db/db.json");
  await writeFileAsync(filePath, JSON.stringify(tables));
};

//These functions handle the gets method//

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("/assets/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/assets/js/index.js"));
});

app.get("/assets/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/assets/css/styles.css"));
});

app.get("/api/notes", async (req, res) => {
  const noteTables = await getNotesFromFile();
  res.json(noteTables);
});

//This function handle the post method//////////////
app.post("/api/notes", async (req, res) => {
  const newNote = req.body;
  const noteTables = await getNotesFromFile();
  const { title, text } = newNote;
  const formattedNote = { title, text, id: uuid() };
  const newTablewithID = [...noteTables, formattedNote];

  await writeNotesToFile(newTablewithID);
  res.json(newTablewithID);
});

//This function handle the delete method//
app.delete("/api/notes/:id", async (req, res) => {
  const noteTables = await getNotesFromFile();
  const NewTables = noteTables.filter((note) => {
    if (note.id !== req.params.id) {
      return note.id;
    }
  });

  await writeNotesToFile(NewTables);
  res.json({
    status: "Success",
  });
});

app.listen(PORT, () => {
  console.log(PORT + " taking website is running...");
});
