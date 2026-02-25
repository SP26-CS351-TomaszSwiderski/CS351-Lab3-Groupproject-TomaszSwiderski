function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  isActive = false,
}) {
  const baseStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };

  const variants = {
    primary: {
      backgroundColor: isActive ? "#003366" : "#0066cc",
      color: "white",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "white",
    },
    secondary: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...variants[variant] }}
      onMouseOver={(e) => (e.target.style.opacity = "0.85")}
      onMouseOut={(e) => (e.target.style.opacity = "1")}
    >
      {text}
    </button>
  );
}

export default Button;