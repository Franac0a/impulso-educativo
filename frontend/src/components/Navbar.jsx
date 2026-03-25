import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const logoUrl = "./public/logo.jpg";

import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout, user, userType } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2 border-gray-200"
          : "bg-white/0 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- LOGO --- */}
          <CustomHashLink to="/#" className="flex items-center gap-3 group">
            {/* Contenedor del Logo con Anillo de Color y Animación */}
            <div className="relative w-12 h-12 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500">
              {/* Fondo degradado (El anillo de color) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 shadow-lg shadow-teal-500/40"></div>

              {/* Círculo blanco interno para separar logo del borde */}
              <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center overflow-hidden">
                {/* TU IMAGEN DE LOGO */}
                <img
                  src={logoUrl}
                  alt="Logo Impulso"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <span
              className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-gray-800" : "text-teal-900"
              }`}
            >
              Impulso<span className="text-teal-600">Educativo</span>
            </span>
          </CustomHashLink>

          {/* --- MENÚ ESCRITORIO --- */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/#">Inicio</NavLink>
            <NavLink to="/carreras">Explorar Ofertas</NavLink>
            <NavLink to="/test-vocacional">Test Vocacional</NavLink>
            <NavLink to="/#nosotros">Nosotros</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </div>

          {/* --- BOTONES DE USUARIO (Escritorio) --- */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm border-2 border-teal-200 group-hover:border-teal-400 transition-colors">
                    {user?.nombre ? user.nombre.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">
                    Perfil
                  </span>
                </Link>

                {userType === "universidad" && (
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full shadow-md transition-all hover:-translate-y-0.5"
                  >
                    Panel
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-500 hover:text-red-700 px-3 py-2 transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-teal-600 font-semibold transition-colors"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 hover:shadow-teal-500/50"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* --- BOTÓN HAMBURGUESA (Móvil) --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-teal-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- MENÚ MÓVIL --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
            <MobileNavLink to="/#" onClick={() => setIsMobileMenuOpen(false)}>
              Inicio
            </MobileNavLink>
            <MobileNavLink
              to="/carreras"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Carreras
            </MobileNavLink>
            <MobileNavLink
              to="/test-vocacional"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Test Vocacional
            </MobileNavLink>
            <MobileNavLink
              to="/#nosotros"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </MobileNavLink>
            <div className="border-t border-gray-100 my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/perfil"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-md"
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Ingresar
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-base font-bold text-teal-600 hover:bg-teal-50 rounded-md"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- COMPONENTES AUXILIARES ---

const CustomHashLink = ({ to, children, className, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);

    if (to.startsWith("/#") || to.startsWith("#")) {
      e.preventDefault();
      const id = to.replace("/#", "").replace("#", "");

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  if (!to.includes("#")) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const NavLink = ({ to, children }) => {
  return (
    <CustomHashLink
      to={to}
      className="relative text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 group py-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
    </CustomHashLink>
  );
};

const MobileNavLink = ({ to, children, onClick }) => (
  <CustomHashLink
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50 transition-colors"
  >
    {children}
  </CustomHashLink>
);
