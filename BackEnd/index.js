const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let todos = []; // Storing our TODOs in memory

// For finding the Index of a specific TODO
function findIndex(requiredId) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === requiredId) {
      return i;
    }
  }
  return -1;
}

// Handler for getting all the TODOs
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Handler for getting the TODO with specific id
app.get("/todos/:id", (req, res) => {
  let ID = parseInt(req.params.id);
  let Index = findIndex(ID);
  if (Index === -1) {
    res.status(400).send({ message: `Todo with ${ID} do not exist!` });
  } else {
    let requiredTodo = {
      title: todos[Index].title,
      desc: todos[Index].desc,
    };
    res.json(requiredTodo);
  }
});

// Handler for posting new TODOs
app.post("/todos", (req, res) => {
  let obj = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    desc: req.body.desc,
  };
  todos.push(obj);
  res.send(obj);
});

// Handler for updating the TODO with specific id
app.put("/todos/:id", (req, res) => {
  let ID = parseInt(req.params.id);
  let Index = findIndex(ID);
  if (Index === -1) {
    res.status(404).send({ message: `Todo with ${ID} is not present!` });
  } else {
    let newTitle = req.body.title;
    let newDesc = req.body.desc;
    todos[Index].title = newTitle;
    todos[Index].desc = newDesc;
    res.send({ message: `Todo updated!` });
  }
});

// Handler for deleting the TODO with a specific id
app.delete("/todos/:id", (req, res) => {
  let ID = parseInt(req.params.id);
  let indexToDelete = findIndex(ID);
  if (indexToDelete === -1) {
    res.status(404).send({ message: `Todo with ${ID} is not present!` });
  } else {
    todos.splice(indexToDelete, 1);
    res.send({ message: `Todo with ${ID} is deleted now!` });
  }
});

// Serving frontend file from the backend to avoid CORS error.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/index.html"));
});

// listening for the HTTP request.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
