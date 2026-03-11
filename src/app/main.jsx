import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { VibeProvider } from "../engine/vibeEngine";
import "../styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VibeProvider>
      <App />
    </VibeProvider>
  </React.StrictMode>,
);
