import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
// ⚠️ 1. IMPORTAMOS LA NUEVA SECCIÓN
import { AboutSection } from "../components/AboutSection";

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sección Hero (Bienvenida) */}
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">
          Te damos la bienvenida a Impulso Educativo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Centralizamos todas las carreras y universidades de Formosa para
          ayudarte a encontrar tu futuro. Y si no sabés por dónde empezar, te
          ofrecemos tests de orientación vocacional gratuitos.
        </p>
        <div className="mt-12 flex justify-center gap-4">
          <Link
            to="/carreras"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition"
          >
            Explorar Carreras
          </Link>
          <Link
            to={isAuthenticated ? "/test-vocacional" : "/register"}
            className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-600 transition"
          >
            Hacer Test Vocacional
          </Link>
        </div>
      </div>

      {/* Sección "Cómo Funciona" (Los Tests) */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* ⚠️ Asumo que tenés una imagen 'lupa.svg' o similar en /public */}
            <img
              src="/lupa.svg"
              alt="Persona haciendo un test"
              className="rounded-lg shadow-lg w-full"
              onError={(e) =>
                (e.target.src =
                  "https://placehold.co/600x400/e2e8f0/64748b?text=Imagen+Test")
              }
            />
          </div>
          <div>
            <span className="text-indigo-600 font-semibold">ORIENTACIÓN</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-2">
              Descubrí tu vocación
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Nuestra plataforma utiliza tests vocacionales (basados en RIASEC y
              otros modelos) para analizar tus intereses y habilidades.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                {/* Check SVG */}
                <svg
                  className="w-6 h-6 text-green-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Analizá tus intereses reales.
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Conectá tu perfil con carreras compatibles.
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Tomá una decisión informada sobre tu futuro.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ⚠️ 2. AÑADIMOS LA NUEVA SECCIÓN CON EL ID */}
      <section id="nosotros">
        <AboutSection />
      </section>

      {/* Sección "Hola Usuario" (Solo si está logueado) */}
      {isAuthenticated && user && (
        <div className="bg-indigo-700 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-2">¡Hola, {user.name}!</h2>
            <p className="text-lg text-indigo-200">
              Nos alegra tenerte de vuelta. ¿Listo para seguir explorando?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
