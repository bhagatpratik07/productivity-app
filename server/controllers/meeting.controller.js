const Meeting = require("../models/meeting.model");

exports.create = async (req, res) => {
  const meeting = await new Meeting({
    name: req.body.name,
    date: req.body.date,
  });
  meeting
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

exports.findAll = async (req, res) => {
  Meeting.find()
    .then((meetings) => {
      res.send(meetings);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getMeetingsByDate = async (req, res) => {
  try {
    const date = req.query.date;
    const meetings = await Meeting.find({ date });
    res.json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
