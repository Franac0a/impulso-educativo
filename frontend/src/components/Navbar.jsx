import React from "react";
// ⚠️ CAMBIO: Importamos 'Link' y 'HashLink'
import { Link } from "react-router";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout, user, userType } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Logo - ⚠️ CAMBIO: Convertido a HashLink para scroll top */}
      <HashLink to="/#" smooth className="text-2xl font-bold text-indigo-700">
        Impulso Educativo
      </HashLink>

      {/* Links de Navegación */}
      <div className="flex items-center space-x-6">
        {/* ⚠️ CAMBIO: Convertido a HashLink para scroll top */}
        <HashLink
          to="/#"
          smooth
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Inicio
        </HashLink>
        {/* ⚠️ Este link AHORA te redirigirá a /login si no estás logueado */}
        <Link
          to="/carreras"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Explorar Carreras
        </Link>
        {/* (Links de relleno, podés borrarlos o hacerlos funcionar) */}
        <span className="text-gray-400">Servicios</span>

        {/* ⚠️ CAMBIO: Convertido a HashLink para hacer scroll */}
        <HashLink
          to="/#nosotros"
          className="text-gray-700 hover:text-indigo-600 font-medium"
          // smooth (opcional) para scroll suave
          smooth
        >
          Nosotros
        </HashLink>

        {/* ⚠️ CAMBIO: Convertido a Link normal */}
        <Link
          to="/contacto"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Contacto
        </Link>
      </div>

      {/* Botones de Auth */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          // --- ESTADO LOGUEADO ---
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
          // --- ESTADO INVITADO ---
          <>
            {/* Apunta a /login, que está en tus PublicRoutes. Debería funcionar. */}
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
