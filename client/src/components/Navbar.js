import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import todo from "../styles/icons/todo.svg";
import pomodoro from "../styles/icons/pomodoro.svg";
import calendar from "../styles/icons/calendar.svg";

export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <Link to="/">
                    <h1 className="head">Productivity App</h1>
                </Link>
                <Link to="/todo">
                    <li><img src = {todo} alt="ToDo icon"/> To-Do List</li>
                </Link>
                <Link to="/pomodoro">
                    <li><img src = {pomodoro} alt="Pomodoro icon"/> Pomodoro</li>
                </Link>
                <Link to="/calendar">
                    <li><img src = {calendar} alt="calendar icon"/> Calendar</li>
                </Link>
            </ul>
        </div>
    );
}
