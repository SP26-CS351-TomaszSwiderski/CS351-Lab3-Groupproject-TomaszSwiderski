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
  onCancel
}) {
  const getPriorityStyle = () => {
    if (todo.priority === "High") {
      return { backgroundColor: "#fee2e2", color: "#b91c1c" };
    }
    if (todo.priority === "Low") {
      return { backgroundColor: "#dcfce7", color: "#166534" };
    }
    return { backgroundColor: "#fef9c3", color: "#92400e" };
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "14px 16px",
    marginBottom: "12px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)"
  };

  const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1
  };

  const badgeStyle = {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    ...getPriorityStyle()
  };

  const textStyle = {
    textDecoration: todo.completed ? "line-through" : "none",
    color: todo.completed ? "#9ca3af" : "#111827"
  };

  const timestampStyle = {
    marginTop: "6px",
    fontSize: "12px",
    color: "#6b7280"
  };

  return (
    <div style={containerStyle}>
      <div style={topRowStyle}>
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
              style={{ flex: 1 }}
            />
          ) : (
            <>
              <span style={badgeStyle}>{todo.priority}</span>
              <span style={textStyle}>{todo.text}</span>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {isEditing ? (
            <>
             <Button text="Save" onClick={onSave} />
              <Button text="Cancel" onClick={onCancel} variant="secondary" />
             </>
              ) : (
              <>
              <Button text="Edit" onClick={onEdit} />
              <Button text="Delete" onClick={onDelete} variant="danger" />
                </>
    )}
        </div>
      </div>

      <div style={timestampStyle}>
        Created: {new Date(todo.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

export default ToDoItem;