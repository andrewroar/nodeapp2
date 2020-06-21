const util = require("util");
const fs = require("fs");

const uuid = require("uuid/v1");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
  readFromFile() {
    return readFile("db/db.json", "utf8");
  }

  writeToFile(newNotes) {
    return writeFile("db/db.json", JSON.stringify(newNotes));
  }

  getAllNotes() {
    return this.readFromFile();
  }

  addToNotes() {
    // you want to take the note object being added and format this with a unique identifier and then add to db.json
    // return getAllNotes..
  }

  deleteNote(id) {
    return this.readFromFile()
      .then((note) => note.filter((notes) => notes.id !== id))
      .then((filteredNotes) => this.writeToFile(filteredNotes));
  }
}

module.exports = new Store();
