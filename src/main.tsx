import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProcessProvider } from "./context/ProcessContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProcessProvider>
      <App />
    </ProcessProvider>
  </React.StrictMode>
);
