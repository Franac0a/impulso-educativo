import React from "react";
import { Link } from "react-router-dom";
// ⚠️ INSTRUCCIÓN: Descomenta tus imports reales
import { useAuth } from "../context/AuthContext";
import { AboutSection } from "../components/AboutSection";

export const HomePage = () => {
  // Mock del hook para la vista previa (Bórralo y usa el real)
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* --- HERO SECTION (Bienvenida) --- */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-teal-50 overflow-hidden">
        {/* Elementos decorativos de fondo (burbujas) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-100 blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-100 blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Texto Hero */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide uppercase shadow-sm">
                Tu futuro empieza hoy
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Impulsá tu carrera <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
                  sin límites.
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Centralizamos todas las carreras y universidades de Formosa para
                que encuentres tu camino ideal. ¿Dudas? Nuestro test vocacional
                inteligente te guía paso a paso.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/carreras"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  🔍 Explorar Oferta
                </Link>
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 hover:border-teal-500 hover:text-teal-600 font-bold rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Crear Cuenta Gratis
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    to="/test-vocacional"
                    className="px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    🧩 Ir al Test Vocacional
                  </Link>
                )}
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="lg:w-1/2 w-full relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Placeholder de imagen atractiva */}
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                  alt="Estudiantes felices"
                  className="w-full h-auto object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN CÓMO FUNCIONA (Cards) --- */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase mb-2">
              Metodología
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              ¿Cómo descubrís tu vocación?
            </h3>
            <p className="mt-4 text-gray-500">
              Usamos modelos probados como RIASEC para conectar tus intereses
              genuinos con oportunidades reales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                1. Realizá el Test
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Responde preguntas simples sobre tus gustos y preferencias. No
                hay respuestas incorrectas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                2. Obtené tu Perfil
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Nuestro algoritmo analiza tus respuestas y genera tu código
                RIASEC (ej: Realista, Artístico).
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                3. Explorá Carreras
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Filtra automáticamente las universidades y carreras que
                coinciden con tu personalidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN NOSOTROS (INTEGRADA) --- */}
      <section id="nosotros">
        <AboutSection />
      </section>

      {/* --- SECCIÓN HOLA USUARIO (DASHBOARD PREVIEW) --- */}
      {isAuthenticated && user && (
        <div className="bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Decoración fondo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

              <div className="flex flex-col md:flex-row items-center justify-between p-10 md:p-16 relative z-10">
                <div className="text-center md:text-left mb-8 md:mb-0">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    👋 ¡Hola de nuevo, {user.nombre || "Estudiante"}!
                  </h2>
                  <p className="text-indigo-100 text-lg max-w-xl">
                    Tu futuro te espera. ¿Listo para continuar tu búsqueda donde
                    la dejaste?
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link
                    to="/perfil"
                    className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
                  >
                    Ver Mi Perfil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
