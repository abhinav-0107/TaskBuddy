const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");

const app = express();
const port = 3000;

app.use("/todos",todoRouter);
app.use("/user",userRouter);

mongoose.connect(
  "mongodb+srv://abhinavsinghbiz:SE5rzjkjuivW3vlL@cluster0.wsvcgox.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "TaskBuddy" }
);

// Serving frontend file the backend to avoid CORS error.
app.get("/" ,(req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/index.html"));
});

// To handle all the undefined route. we introduced custom middleware.
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});