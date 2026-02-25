import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Button from "./components/Button";
import ToDoItem from "./components/TodoItems";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
    setPriority("Medium");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // ✅ Filter Counts
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="App">
      <Header title="My Todo List" />

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo..."
          className="todo-input"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <Button type="submit" text="Add Todo" />
      </form>

      {/* Filter Buttons with Counts */}
      <div className="filters">
        <Button
          text={`All (${todos.length})`}
          onClick={() => setFilter("all")}
          isActive={filter === "all"}
        />
        <Button
          text={`Active (${activeCount})`}
          onClick={() => setFilter("active")}
          isActive={filter === "active"}
        />
        <Button
          text={`Completed (${completedCount})`}
          onClick={() => setFilter("completed")}
          isActive={filter === "completed"}
        />
      </div>

      <p>{filteredTodos.length} todos</p>

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
            onCancel={cancelEdit}
          />
        ))}
      </div>

      {todos.some((todo) => todo.completed) && (
        <Button text="Clear Completed" onClick={clearCompleted} />
      )}
    </div>
  );
}

export default App;