import React from "react";
import "./welcome.css";

function Welcome() {
  return (
    <div className="welcome-wrapper">
      <h1 className="welcome-title">Welcome page</h1>
      <img
        className="welcome-background"
        src="https://images.unsplash.com/photo-1514593214839-ce1849100055?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
      ></img>
    </div>
  );
}

export default Welcome;
