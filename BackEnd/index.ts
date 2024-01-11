import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo";
import userRoutes from "./routes/user";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);
app.use("/user", userRoutes);

mongoose.connect(
  "mongodb+srv://abhinavsinghbiz:SE5rzjkjuivW3vlL@cluster0.wsvcgox.mongodb.net/",
  { dbName: "TaskBuddy" }
);

// To handle all the undefined route. we introduced custom middleware.
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
