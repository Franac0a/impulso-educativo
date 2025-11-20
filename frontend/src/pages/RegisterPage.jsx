import React, { useState } from "react";
import { Link } from "react-router-dom";

import { RegisterStudentForm } from "../components/RegisterStudentForm";
import { RegisterUniversityForm } from "../components/RegisterUniversityForm";

export const RegisterPage = () => {
  const [formType, setFormType] = useState("student"); // 'student' | 'university'

  const isStudent = formType === "student";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* --- COLUMNA IZQUIERDA (INFORMACIÓN & BRANDING) --- */}
        <div className="md:w-5/12 bg-gradient-to-br from-indigo-700 via-indigo-600 to-teal-500 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-20 -mt-20 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400 opacity-20 rounded-full -mr-20 -mb-20 blur-3xl"></div>

          <div className="relative z-10">
            {/* Logo Pequeño */}
            <Link to="/" className="flex items-center gap-2 mb-12 group w-fit">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <span className="font-bold text-sm tracking-wide uppercase opacity-90 group-hover:opacity-100">
                Volver al Inicio
              </span>
            </Link>

            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              {isStudent
                ? "Tu futuro comienza aquí."
                : "Conectá con tus futuros alumnos."}
            </h2>
            <p className="text-indigo-100 text-lg mb-10 leading-relaxed">
              {isStudent
                ? "Unite a nuestra comunidad para descubrir la carrera ideal que se alinea con tus pasiones."
                : "Registra tu institución para mostrar tu oferta académica a miles de estudiantes en Formosa."}
            </p>

            {/* Lista de Beneficios (Iconos SVG integrados) */}
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm shadow-inner">
                  {/* Icono Birrete */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-teal-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Orientación Vocacional</h4>
                  <p className="text-indigo-200 text-sm">
                    Tests gratuitos basados en IA y RIASEC.
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm shadow-inner">
                  {/* Icono Lupa */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-teal-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Exploración Inteligente</h4>
                  <p className="text-indigo-200 text-sm">
                    Filtros avanzados por tipo, duración y área.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <p className="text-xs opacity-50 mt-10 relative z-10">
            © 2025 Impulso Educativo. Todos los derechos reservados.
          </p>
        </div>

        {/* --- COLUMNA DERECHA (FORMULARIO) --- */}
        <div className="md:w-7/12 bg-white p-8 md:p-12 flex flex-col justify-center relative">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
              Crear Cuenta
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Completa tus datos para{" "}
              {isStudent ? "empezar tu viaje." : "registrar tu institución."}
            </p>

            {/* RENDERIZADO CONDICIONAL DEL FORMULARIO */}
            <div className="animate-fadeIn">
              {isStudent ? <RegisterStudentForm /> : <RegisterUniversityForm />}
            </div>

            {/* SWITCH DE TIPO DE CUENTA */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">
                  {isStudent
                    ? "¿Representas a una universidad?"
                    : "¿Eres un estudiante buscando carrera?"}
                </p>
                <button
                  onClick={() =>
                    setFormType(isStudent ? "university" : "student")
                  }
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm hover:bg-indigo-100 transition-colors"
                >
                  {isStudent ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-1 4h1m-1 4h1"
                        />
                      </svg>
                      Registrar Institución
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Soy Estudiante
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-400 mt-6">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-teal-600 font-bold hover:underline"
                >
                  Inicia Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
