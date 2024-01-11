import express from "express";
import bodyParser from "body-parser";
import { TODOS } from "../db/index.js";
import { authenticateJwt } from "../middlewares/auth.js";

const router = express.Router();

router.use(express());
router.use(bodyParser.json());

// Handler for getting all the TODOs
router.get("/", authenticateJwt, async (req, res) => {
  const userId = req.headers["userId"];
  const allTodos : object = await TODOS.find({ userId });
  res.json(allTodos);
});

// Handler for getting the TODO with specific id
router.get("/:id", authenticateJwt, async (req, res) => {
  const todoId : string = req.params.id;
  const userId = req.headers["userId"];
  const todo : object = await TODOS.find({ userId, _id: todoId });
  if (todo) {
    res.send(todo);
  } else {
    res.json({ message: `No Todo with ${todoId} is presnt!` });
  }
});

// Handler for posting new TODOs
router.post("/", authenticateJwt, async (req, res) => {
  const newTitle : string = req.body.title;
  const newDescription : string= req.body.description;
  const newStatus : boolean = req.body.IsDone;

  if (newTitle && newDescription) {
    const newTodo : object = {
      title: newTitle,
      description: newDescription,
      userId: req.headers["userId"],
      IsDone: newStatus,
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
  const todoId : string = req.params.id;
  const updatedTitle : string= req.body.title;
  const updatedDescription : string = req.body.description;

  const updatesTodo : object = {
    title: updatedTitle,
    description: updatedDescription,
    userId: req.headers["userId"],
  };

  const newTodo = await TODOS.findOneAndUpdate(
    { _id: todoId, userId: req.headers["userId"] },
    updatesTodo,
    { new: true }
  );

  if (newTodo) {
    res.json(newTodo);
  } else {
    res.status(404).json({ message: `Todo with ${todoId} is not present!` });
  }
});

router.put("/status/:id", authenticateJwt, async (req, res) => {
  const newStatus : boolean = req.body.IsDone;
  const TodoId : string = req.params.id;
  const todo = await TODOS.findOneAndUpdate(
    { _id: TodoId },
    { $set: { IsDone: newStatus } },
    { new: true }
  );

  if (todo) {
    res.json({ message: "Congratulations! Keep going." });
  } else {
    res.sendStatus(500);
  }
});

// Handler for deleting the TODO with a specific id
router.delete("/:id", authenticateJwt, async (req, res) => {
  const todoId : string = req.params.id;
  await TODOS.findOneAndDelete({ _id: todoId, userId: req.headers["userId"] });
  res.json({ message: "Todo has been deleted" });
});

export default router;
