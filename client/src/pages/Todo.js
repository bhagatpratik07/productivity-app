import React, { useEffect, useState } from "react";
import "../styles/ToDo.css";
import pencilIcon from "../styles/icons/pencilIcon.svg";
import deleteIcon from "../styles/icons/deleteIcon.svg";
import editIcon from "../styles/icons/editIcon.svg";

import axios from "axios";

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
}

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
        <div className="toDo">
            <h1 className="heading">To-Do</h1>
            <ul className="taskList">
                {todos.map((todo) => (
                    <li key={todo._id} className="task">
                        <div className="taskDesc">
                            <input
                                type="checkbox"
                                name="taskcheck"
                                className="box"
                                checked={todo.completed}
                                onChange={() => handleCheck(todo._id)}
                            />
                            <label
                                htmlFor="taskcheck"
                                className="strikethrough"
                            >
                                <span className="taskTitle">{todo.title}</span>
                                <br />
                                {todo.description}
                            </label>
                        </div>
                        <div className="btnDiv">
                            <button
                                className="taskBtn"
                                onClick={() => handleDelete(todo._id)}
                            >
                                <img
                                    src={deleteIcon}
                                    className="taskIcons"
                                    alt="Delete"
                                    srcset=""
                                />
                            </button>
                            <button
                                className="taskBtn"
                                onClick={() => handleEdit(todo)}
                            >
                                <img
                                    src={editIcon}
                                    className="taskIcons"
                                    alt="edit"
                                    srcset=""
                                />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    className="titleBar textbox"
                    type="text"
                    placeholder="Title"
                    value={newTodo.title}
                    onChange={(e) =>
                        setNewTodo({ ...newTodo, title: e.target.value })
                    }
                />
                <textarea
                    className="descBar textbox"
                    type="text"
                    placeholder="Description (optional)"
                    value={newTodo.description}
                    onChange={(e) =>
                        setNewTodo({ ...newTodo, description: e.target.value })
                    }
                ></textarea>
                <button className="sbtBtn" type="submit">
                    Add task
                    <img
                        src={pencilIcon}
                        className="pencilicon"
                        alt=""
                        srcset=""
                    />
                </button>
            </form>
        </div>
    );
}

export default TodoList;
