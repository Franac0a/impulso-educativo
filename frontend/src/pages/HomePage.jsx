// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

// ⚠️ CAMBIO: Exportamos como una constante nombrada
export const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    // ... (El contenido JSX es el mismo que te pasé antes)
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bienvenido a Impulso</h1>
      {/* ...etc... */}
    </div>
  );
};
