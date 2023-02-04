const express = require("express");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.route");
const pomodoroRoutes = require("./routes/pomodoro.route");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.use("/todos", todoRoutes);
app.use("/pomodoro", pomodoroRoutes);

connectDB();

app.listen(3001, () => {
  console.log("Server started");
});
