const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "./db.json");

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title: title,
    id: Date.now().toString(),
  };
  notes.push(note);
  saveNotes(notes);
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  saveNotes(filteredNotes);
  console.log(chalk.red(`Note with id="${id}" was removed`));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.blue("This is notes list: "));
  notes.forEach((note) => {
    console.log(
      chalk.bgWhite(note.id),
      chalk.blue.bgRed.bold(note.title, note.id)
    );
  });
}
async function update(newNote) {
  const notes = await getNotes();
  const index = notes.findIndex(el => el.id === newNote.id)
  notes[index] = {...notes[index], ...newNote}
  // notes.forEach( note =>{
  //   if(note.id === newNote.id){
  //     note.title = newNote.title
  //   }
  // })
  await saveNotes(notes)
  console.log(chalk.bgCyan(`Note with id: ${notes[index].id} was updated`))
}
module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  update,
};
