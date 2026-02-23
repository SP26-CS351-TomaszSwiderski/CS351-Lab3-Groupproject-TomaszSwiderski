import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Button from "./components/Button";
import ToDoItem from "./components/TodoItems";

function App() {
  // Use state for important functions

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Local storage for Inputted To-Dos

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new to-do

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  // Toggles the to do between completed and active

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Deletes the to do

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit the to do 

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === "") return;

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editValue }
          : todo
      )
    );

    setEditingId(null);
    setEditValue("");
  };

  // Clears the completed To-dos

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filters between active and completed to-dos

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Renders the website 

  return (
    <div className="App">
      <Header title="My Todo List" />

      {/* Add Todo */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo..."
          className="todo-input"
        />
        <Button type="submit" text="Add Todo" />
      </form>

      {/* Filter Buttons */}
      <div className="filters">
        <Button text="All" onClick={() => setFilter("all")} />
        <Button text="Active" onClick={() => setFilter("active")} />
        <Button text="Completed" onClick={() => setFilter("completed")} />
      </div>

      {/* Todo Count */}
      <p>{filteredTodos.length} todos</p>

      {/* Todo List */}
      <div className="todo-list">
        {filteredTodos.length === 0 && <p>No todos yet!</p>}

        {filteredTodos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={() => startEditing(todo.id, todo.text)}
            isEditing={editingId === todo.id}
            editValue={editValue}
            setEditValue={setEditValue}
            onSave={() => saveEdit(todo.id)}
          />
        ))}
      </div>

      {/* Clear Completed */}
      {todos.some((todo) => todo.completed) && (
        <Button text="Clear Completed" onClick={clearCompleted} />
      )}
    </div>
  );
}

// Export the App component
export default App;
