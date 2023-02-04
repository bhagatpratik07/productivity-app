const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting.controller");

router.get("/", meetingController.findAll);

router.post("/", meetingController.create);

router.get("/:date", meetingController.getMeetingsByDate);

module.exports = router;
