import React from "react";
import { Link } from "react-router";

export const Footer = () => {
  // Función para el año actual
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-700 text-green-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y Descripción */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white">
              Impulso Educativo
            </Link>
            <p className="mt-4 text-teal-100 max-w-xs">
              Centralizando la oferta académica de Formosa para ayudarte a
              encontrar tu futuro.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/carreras" className="hover:text-white">
                  Explorar Carreras
                </Link>
              </li>
              <li>
                {/* (Links de relleno que tenías en la navbar) */}
                <span className="text-teal-200 cursor-not-allowed">
                  Servicios
                </span>
              </li>
              <li>
                <span className="text-teal-200 cursor-not-allowed">
                  Nosotros
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal/Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              Soporte
            </h3>
            <ul className="mt-4 space-y-2">
              {/* ¡Aquí está el link que pediste! */}
              <li>
                <Link to="/contacto" className="hover:text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <span className="text-teal-200 cursor-not-allowed">
                  Términos y Condiciones
                </span>
              </li>
              <li>
                <span className="text-teal-200 cursor-not-allowed">
                  Política de Privacidad
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              Redes Sociales
            </h3>
            <div className="flex space-x-4 mt-4">
              {/* Íconos SVG de tu mockup de contacto */}
              <a
                href="#"
                className="text-teal-100 hover:text-white"
                title="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white"
                title="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white"
                title="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.669-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.197-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white"
                title="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002.396-4.008 2.983-4.008 2.589 0 2.59 2.32 2.59 4.008v8.396h4.98v-8.66c0-4.032-2.12-5.996-4.93-5.996s-4.002 1.896-4.612 3.272l.024-.024v-2.616z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria y Copyright */}
        <div className="mt-12 border-t border-teal-600 pt-8 text-center">
          <p className="text-teal-100">
            &copy; {currentYear} Impulso Educativo. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
