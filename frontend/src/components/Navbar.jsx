import React from "react";
import { Link } from "react-router";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout, user, userType } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Logo */}
      <HashLink to="/#" smooth className="text-2xl font-bold text-indigo-700">
        Impulso Educativo
      </HashLink>

      {/* Links de navegación */}
      <div className="flex items-center space-x-6">
        <HashLink
          to="/#"
          smooth
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Inicio
        </HashLink>
        <Link
          to="/carreras"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Explorar ofertas
        </Link>
        <Link
          to="/test-vocacional"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Test Vocacional
        </Link>
        <HashLink
          to="/#nosotros"
          smooth
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Nosotros
        </HashLink>
        <Link
          to="/contacto"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Contacto
        </Link>
      </div>

      {/* Botones de usuario */}
      <div className="flex items-center space-x-4">
        {isAuthenticated && user ? (
          <>
            <Link
              to="/perfil"
              className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition"
            >
              Perfil
            </Link>
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
