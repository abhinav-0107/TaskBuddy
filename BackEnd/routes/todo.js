const express = require("express");
const bodyParser = require("body-parser");
const {TODOS} = require("../db/index.js");
const { authenticateJwt } = require("../middlewares/auth.js");

const router = express.Router();

router.use(express());
router.use(bodyParser.json());

// Handler for getting all the TODOs
router.get("/", authenticateJwt, async (req, res) => {
  const userId = req.userId;
  const allTodos = await TODOS.find({userId});
  res.json(allTodos);
});

// Handler for getting the TODO with specific id
router.get("/:id", authenticateJwt, async (req, res) => {
  const todoId = req.params.id;
  const userId = req.userId;
  const todo = await TODOS.find({userId, _id : todoId});
  if (todo) {
    res.send(todo);
  } else {
    res.json({ message: `No Todo with ${id} is presnt!` });
  }
});

// Handler for posting new TODOs
router.post("/", authenticateJwt, async (req, res) => {
  const newTitle = req.body.title;
  const newDescription = req.body.description;
  if (newTitle && newDescription) {
    let newTodo = {
      title: newTitle,
      description: newDescription,
      userId : req.userId
    };
    const todoToSave = new TODOS(newTodo);
    await todoToSave.save();
    res.send(todoToSave);
  } else {
    res.send({ message: "Please enter both title and description!" });
  }
});

// Handler for updating the TODO with specific id
router.put("/:id", authenticateJwt, async (req, res) => {
  const todoId = req.params.id;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;

  const updatesTodo = {
    title: updatedTitle,
    description: updatedDescription,
    userId : req.userId
  };

  const newTodo = await TODOS.findOneAndUpdate({_id : todoId , userId : req.userId}, updatesTodo, { new: true });

  if (newTodo) {
    res.json(newTodo);
  } else {
    res.status(404).json({ message: `Todo with ${id} is not present!` });
  }
});

// Handler for deleting the TODO with a specific id
router.delete("/:id", authenticateJwt, async (req, res) => {
  const todoId = req.params.id;
  await TODOS.findOneAndDelete({_id : todoId , userId : req.userId});
  res.json({ message: "Todo has been deleted" });
});

module.exports = router;
