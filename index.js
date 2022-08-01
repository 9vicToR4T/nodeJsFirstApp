const http = require("http");
const chalk = require("chalk");
const { addNote, getNotes, removeNote, update } = require("./notes.controler.js");
const express = require("express");
const path = require("path");

const port = 3000;

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "My express app",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "My express app",
    notes: await getNotes(),
    created: true,
  });
});

app.put("/:id", async (req, res) => {
  await update({id: req.params.id, title: req.body.title})
  res.render("index", {
    title: "My express app",
    notes: await getNotes(),
    created: false,
  });
});

app.delete("/:id", async (req, res) => {
  removeNote(req.params.id);
  res.render("index", {
    title: "My express app",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});

// const yargs = require("yargs");
// const pkg = require("./package.json");
// // node are acces la toate fisierele si le putem obtine in forma de obiecte

// const { addNote, printNotes, removeNote } = require("./notes.controler");

// yargs.version(pkg.version);
// // --version

// yargs.command({
//   command: "add",
//   describe: "Add new note to list",
//   builder: {
//     title: {
//       type: "string",
//       describe: "Note title",
//       demandOption: true,
//     },
//   },
//   handler({ title }) {
//     addNote(title);
//   },
// });

// yargs.command({
//   command: "list",
//   describe: "Print all notes",
//   async handler() {
//     const notes = await printNotes();
//   },
// });

// yargs.command({
//   command: "remove",
//   describe: "Remove note by id",
//   builder: {
//     id: {
//       type: "string",
//       describe: "Remove note",
//       demandOption: true,
//     },
//   },
//   handler({ id }) {
//     removeNote(id);
//   },
// });

// yargs.parse();
// inregistram

// node index.js --help - ne arata toate comenzile si descrierile
// builder : {} - descriem parametrii cu care initiem comanda. demandOption e obligatoriu. Acesti parametri ii putem apoi sa ii folosim la handler

// de exemplu, pentru a seta title pentru add putem folosi comanda node index add --title=Hello
