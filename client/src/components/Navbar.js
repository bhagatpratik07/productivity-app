import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">
            <h1>Productivity App</h1>
          </Link>
        </li>
        <li>
          <Link to="/todo">To Do List</Link>
        </li>
        <li>
          <Link to="/pomodoro">Pomodoro</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
      </ul>
    </div>
  );
}
