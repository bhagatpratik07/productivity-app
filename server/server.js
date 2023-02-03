const express = require("express");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.route");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.use("/todos", todoRoutes);

connectDB();

app.listen(3001, () => {
  console.log("Server started");
});

//MONGODB_URI=mongodb+srv://pratik:pratik1234@cluster0.mgcr37z.mongodb.net/?retryWrites=true&w=majority
