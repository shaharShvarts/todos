import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TodoContext from "./components/context/TodoContext";

ReactDOM.render(
  <React.StrictMode>
    <TodoContext>
      <App />
    </TodoContext>
  </React.StrictMode>,
  document.getElementById("root")
);
