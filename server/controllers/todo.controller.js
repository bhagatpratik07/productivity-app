const Todo = require("../models/todo.model");

exports.create = (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  todo
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  Todo.findById(req.params.id).then((todo) => {
    if (!todo) {
      return res.status(404).send({
        message: "Todo not found with id " + req.params.id,
      });
    }
    res.send(todo);
  });
};

exports.update = (req, res) => {
  // Find todo and update it with the request body
  Todo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  )
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.id,
        });
      }
      res.send(todo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating todo with id " + req.params.id,
      });
    });
};

exports.delete = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.id,
        });
      }
      res.send({ message: "Todo deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete todo with id " + req.params.id,
      });
    });
};
