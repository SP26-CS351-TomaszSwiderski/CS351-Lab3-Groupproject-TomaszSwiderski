import Button from "./Button";

function ToDoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  editValue,
  setEditValue,
  onSave,
}) {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    marginBottom: "12px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
  };

  const textStyle = {
    marginLeft: "12px",
    fontSize: "15px",
    fontWeight: "500",
    color: todo.completed ? "#9ca3af" : "#111827",
    textDecoration: todo.completed ? "line-through" : "none",
  };

  const inputStyle = {
    marginLeft: "12px",
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    flex: 1,
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "8px",
  };

  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span style={textStyle}>{todo.text}</span>
        )}
      </div>

      <div style={buttonGroupStyle}>
        {isEditing ? (
          <Button text="Save" onClick={onSave} />
        ) : (
          <>
            <Button text="Edit" onClick={onEdit} />
            <Button text="Delete" onClick={onDelete} />
          </>
        )}
      </div>
    </div>
  );
}

export default ToDoItem;