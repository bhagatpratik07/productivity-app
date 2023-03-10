import React, { useEffect, useState } from "react";
import "../styles/TaskCalender.css";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import deleteIcon from "../styles/icons/deleteIcon.svg";

const TaskCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [meetings, setMeetings] = useState([]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const meeting = { name, date };
      const response = await axios.post(
        "http://localhost:3001/meetings",
        meeting
      );
      setName("");
      setMeetings([response.data, ...meetings]);
      alert("Meeting created successfully");
    } catch (error) {
      console.error(error.message);
      alert("Failed to create meeting");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3001/meetings/${id}`)
        .then(setMeetings(meetings.filter((meeting) => meeting._id !== id)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getMeetings() {
      const response = await fetch(`http://localhost:3001/meetings/`);
      const data = await response.json();
      setMeetings(data);
      // console.log(data);
    }
    getMeetings();
  }, []);

  return (
    <div className="calendar">
      <h1 className="heading">Calendar</h1>
      <Calendar value={date} onChange={handleDateChange} />
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleNameChange} />
        <button type="submit">Create Meeting</button>
      </form>
      <div className="meetingDesc">
        {meetings.map((meeting) => (
          <div className="meet" key={meeting._id}>
            <a target="_blank" href="meetlink" rel="noreferrer">
              <h3 className="meetTitle">{meeting.name}</h3>
              <h3 className="meetTIme">{meeting.date}</h3>
            </a>
            <button
              className="deleteBtn"
              onClick={() => handleDelete(meeting._id)}
            >
              <img className="deleteIcon" src={deleteIcon} alt="" srcset="" />
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCalendar;
