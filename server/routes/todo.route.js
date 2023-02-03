const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

// create todo item
router.post("/", todoController.create);

// read all todo items
router.get("/", todoController.findAll);

// read one todo item
router.get("/:id", todoController.findOne);

// update todo item
router.put("/:id", todoController.update);

// delete todo item
router.delete("/:id", todoController.delete);

module.exports = router;
