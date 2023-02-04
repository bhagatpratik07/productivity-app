const Pomodoro = require("../models/pomodoro.model");

exports.getAllPomodoros = (req, res, next) => {
  Pomodoro.find({})
    .then((pomodoros) => res.json(pomodoros))
    .catch((err) => next(err));
};

exports.createPomodoro = (req, res, next) => {
  const { duration, task, date } = req.body;

  Pomodoro.create({ task, time, date })
    .then((pomodoro) => res.json(pomodoro))
    .catch((err) => next(err));
};

exports.updatePomodoro = (req, res, next) => {
  const { duration, task, date } = req.body;
  const { id } = req.params;

  Pomodoro.findByIdAndUpdate(id, { duration, task, date }, { new: true })
    .then((pomodoro) => res.json(pomodoro))
    .catch((err) => next(err));
};

exports.deletePomodoro = (req, res, next) => {
  const { id } = req.params;

  Pomodoro.findByIdAndRemove(id)
    .then((pomodoro) => res.json(pomodoro))
    .catch((err) => next(err));
};

exports.getPomodoro = async (req, res) => {
  try {
    const pomodoro = await Pomodoro.findById(req.params.id);
    if (!pomodoro) return res.status(404).send("Pomodoro not found");

    res.send(pomodoro);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
