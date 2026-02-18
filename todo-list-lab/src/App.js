// Import react and the useState hook for state management
import React, { useState } from "react";
import "./App.css";

// Import our custom components
import Header from "./components/Header";
import Button from "./components/Button";
import ToDoItem from "./components/TodoItems";

function App() {
  // todos array to store all to do items
  const [todos, setTodos] = useState([]);

  // inputValue string to store current input field value
  const [inputValue, setInputValue] = useState("");

  // Tracks which filter is currently active: "all", "active", or "completed"
  const [filter, setFilter] = useState("all");

  // Stores the ID of the todo currently being edited
  // null means no todo is being edited
  const [editingId, setEditingId] = useState(null);

  // Stores the text value when editing an existing todo
  const [editValue, setEditValue] = useState("");
  // this function basically updates inputValue as the user types in the input field
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // this function to add a new todo to the list
  const handleSumbit = (event) => {
    // prevent default form submission ( wchich will reload the page and cause data loss)
    event.preventDefault();

    //chechk if input is empty after removing the white space
    if (inputValue.trim() === "") {
      return;
    }
    //Create a new todo aboj
    const newToDo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    };

    // Add the new todo to the todos array using spread operator
    setTodos([...todos, newToDo]);

    // clear the input field
    setInputValue("");
  };
  // This fucntion will toggle a todos completed status
  const toggleTodo = (id) => {
    // Map over the todos array to create a new array
    setTodos(
      todos.map((todo) => {
        // if this todos id matches, toggle its completed status
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      }),
    );
  };

  // This function removes a todo from the list
  const deleteTodo = (id) => {
    // Filter out the todo with the matching id
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <Header title="My Todo List" />

      <form onSubmit={handleSumbit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo...."
          className="todo-input"
        />

        <Button type="submit" text="Add todo" />
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Export the App component
export default App;
