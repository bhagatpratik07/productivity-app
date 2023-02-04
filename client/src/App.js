import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Pomodoro from "./pages/Pomodoro";
import TaskCalendar from "./pages/TaskCalendar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/calendar" element={<TaskCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
