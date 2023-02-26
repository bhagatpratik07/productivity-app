import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Pomodoro from "./pages/Pomodoro";
import TaskCalendar from "./pages/TaskCalendar";

function App() {
  return (
    <div className="parent">
      <Navbar />
      <Routes>
        <Route className="child" path="/" element={<Home />} />
        <Route className="child" path="/todo" element={<Todo />} />
        <Route className="child" path="/pomodoro" element={<Pomodoro />} />
        <Route className="child" path="/calendar" element={<TaskCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
