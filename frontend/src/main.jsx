// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { App } from "./App.jsx";

// ⚠️ ¡ESTA LÍNEA ES LA CLAVE! ⚠️
// Asegurate de que SÍ esté importando tu index.css
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
