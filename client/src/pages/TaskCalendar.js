import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
      await axios.post("http://localhost:3001/meetings", meeting);
      setName("");
      alert("Meeting created successfully");
    } catch (error) {
      console.error(error.message);
      alert("Failed to create meeting");
    }
  };

  useEffect(() => {
    async function getMeetings() {
      const response = await fetch(`http://localhost:3001/meetings/`);
      const data = await response.json();
      setMeetings(data);
      console.log(data);
    }
    getMeetings();
  }, []);

  return (
    <div>
      <Calendar value={date} onChange={handleDateChange} />
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleNameChange} />
        <button type="submit">Create Meeting</button>
      </form>
      {meetings.map((meeting) => (
        <div key={meeting._id}>
          <h3>{meeting.name}</h3>
          <h2>{meeting.date}</h2>
        </div>
      ))}
    </div>
  );
};

export default TaskCalendar;