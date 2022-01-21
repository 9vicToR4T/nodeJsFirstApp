const yargs = require("yargs");
const pkg = require("./package.json");
// node are acces la toate fisierele si le putem obtine in forma de obiecte

const { addNote, printNotes, removeNote } = require("./notes.controler");

yargs.version(pkg.version);
// --version

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    const notes = await printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "Remove note",
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();
// inregistram

// node index.js --help - ne arata toate comenzile si descrierile
// builder : {} - descriem parametrii cu care initiem comanda. demandOption e obligatoriu. Acesti parametri ii putem apoi sa ii folosim la handler

// de exemplu, pentru a seta title pentru add putem folosi comanda node index add --title=Hello
