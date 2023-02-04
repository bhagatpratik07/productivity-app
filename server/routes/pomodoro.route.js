const express = require("express");
const router = express.Router();
const PomodoroController = require("../controllers/pomodoro.controller");

router.get("/", PomodoroController.getAllPomodoros);

router.get("/:id", PomodoroController.getPomodoro);

router.post("/:id", PomodoroController.createPomodoro);

router.put("/:id", PomodoroController.updatePomodoro);

router.delete("/:id", PomodoroController.deletePomodoro);

module.exports = router;
