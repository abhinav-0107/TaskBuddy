import express from "express";
import bodyParser from "body-parser";
import { TODOS } from "../db/index.js";
import { authenticateJwt } from "../middlewares/auth.js";
import { z } from "zod"; 

const router = express.Router();

router.use(express());
router.use(bodyParser.json());

const todoInput = z.object({
  title : z.string().min(1).max(10).optional(),
  description : z.string().min(1).max(15).optional(),
  userId : z.string().min(1).optional(),
  IsDone : z.boolean().optional()
});


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
  const parsedInput = todoInput.safeParse({...req.body, userId: req.headers["userId"]});
  if(!parsedInput.success){
    res.json({
      error : parsedInput.error
    });
    return;
  }
  
  const newTitle : string | undefined = parsedInput.data.title;
  const newDescription : string | undefined = parsedInput.data.description;
  const newStatus : boolean | undefined = parsedInput.data.IsDone;

  if (newTitle && newDescription) {
    const newTodo : object = {
      title: newTitle,
      description: newDescription,
      userId: parsedInput.data.userId,
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
  const parsedInput = todoInput.safeParse(req.body);
  if(!parsedInput.success){
    res.json({
      error : parsedInput.error
    }); 
    return;
  }

  const todoId : string = req.params.id;
  const updatedTitle : string | undefined= parsedInput.data.title;
  const updatedDescription : string | undefined = parsedInput.data.description;

  const updatesTodo : object = {
    title: updatedTitle,
    description: updatedDescription,
    userId: parsedInput.data.userId,
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
  const parsedInput = todoInput.safeParse(req.body); 

  if(!parsedInput.success){
    res.json({
      error : parsedInput.error
    });
    return;
  }

  const newStatus : boolean | undefined = parsedInput.data.IsDone;
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
