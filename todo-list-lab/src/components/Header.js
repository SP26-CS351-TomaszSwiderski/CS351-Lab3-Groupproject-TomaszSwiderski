import React from "react";

function Header({ title }) {
  const headerStyle = {
    textAlign: "center",
    marginBottom: "30px",
    padding: "20px 0",
    borderBottom: "2px solid #e5e7eb",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1f2937",
    letterSpacing: "1px",
    margin: 0,
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>{title}</h1>
    </header>
  );
}

export default Header;