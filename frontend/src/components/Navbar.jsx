// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router"; // Para la navegación
import { useAuth } from "../context/AuthContext"; // Para saber si estamos logueados

// ⚠️ Exportamos como constante nombrada
export const Navbar = () => {
  const { isAuthenticated, logout, user, userType } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Logo o Nombre de la App */}
      <Link to="/" className="text-2xl font-bold text-indigo-700">
        Impulso Educativo
      </Link>

      {/* Navegación Principal */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Inicio
        </Link>
        <Link
          to="/carreras"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Explorar Carreras
        </Link>
        {/* Aquí puedes añadir más links como Servicios, Nosotros, Contacto */}
        <span className="text-gray-400">Servicios</span>
        <span className="text-gray-400">Nosotros</span>
        <span className="text-gray-400">Contacto</span>
      </div>

      {/* Botones de Auth / Dashboard */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-700">
              Hola, {user.name.split(" ")[0]}!
            </span>
            {userType === "universidad" && (
              <Link
                to="/dashboard"
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition"
              >
                Mi Panel
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
