import React, { useEffect, useState } from "react";
import "../styles/ToDo.css";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:3001/todos");
      const response = await res.json();
      setTodos(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3001/todos", newTodo);
  //     setTodos([...todos, response.data]);
  //     setNewTodo({ title: "", description: "" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      try {
        const response = await axios.post(
          "http://localhost:3001/todos",
          newTodo
        );
        setTodos([...todos, response.data]);
        setNewTodo({ title: "", description: "" });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:3001/todos/${currentTodo._id}`,
          newTodo
        );
        const updatedTodoList = todos.map((item) => {
          if (item._id === currentTodo._id) {
            return response.data;
          }
          return item;
        });
        setTodos(updatedTodoList);
        setEditing(false);
        setNewTodo({ title: "", description: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (todo) => {
    setEditing(true);
    setCurrentTodo(todo);
    setNewTodo({ title: todo.title, description: todo.description });
  };

  // checkbox
  const handleCheck = async (id) => {
    try {
      const todo = todos.find((todo) => todo._id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };
      const response = await axios.put(
        `http://localhost:3001/todos/${id}`,
        updatedTodo
      );
      const updatedTodoList = todos.map((item) => {
        if (item._id === id) {
          return response.data;
        }
        return item;
      });
      setTodos(updatedTodoList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheck(todo._id)}
            />
            {todo.title} - {todo.description}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            <button onClick={() => handleEdit(todo)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
