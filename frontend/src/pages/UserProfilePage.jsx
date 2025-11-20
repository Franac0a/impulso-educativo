import React, { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { userService } from "../services/user.service";

export const UserProfilePage = () => {
  // Usamos los mocks definidos arriba (o los imports reales si los descomentas)
  const { user, loading: authLoading, logout } = useAuth();

  const [perfil, setPerfil] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await userService.getProfile();
        // Ajuste: soportamos response.perfil o response directo según tu backend
        setPerfil(response.perfil || response || null);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setError("No se pudo cargar la información del perfil.");
      } finally {
        setCargandoPerfil(false);
      }
    };

    if (user) {
      fetchPerfil();
    } else {
      setCargandoPerfil(false);
    }
  }, [user]);

  // --- HELPER PARA MOSTRAR RIASEC BONITO ---
  const renderRiasecBadges = (riasecData) => {
    if (!riasecData)
      return <span className="text-gray-400 italic">No completado aún</span>;

    let letters = [];
    try {
      if (Array.isArray(riasecData)) {
        letters = riasecData;
      } else if (typeof riasecData === "string") {
        // Si es "RIA" -> ['R','I','A']
        letters = riasecData.replace(/[^a-zA-Z]/g, "").split("");
      }
    } catch (e) {
      return <span>{riasecData}</span>;
    }

    if (letters.length === 0)
      return <span className="text-gray-400 italic">No completado aún</span>;

    const colors = {
      R: "bg-red-100 text-red-700 border-red-200",
      I: "bg-yellow-100 text-yellow-700 border-yellow-200",
      A: "bg-orange-100 text-orange-700 border-orange-200",
      S: "bg-green-100 text-green-700 border-green-200",
      E: "bg-blue-100 text-blue-700 border-blue-200",
      C: "bg-purple-100 text-purple-700 border-purple-200",
    };

    return (
      <div className="flex gap-2 flex-wrap">
        {letters.map((l, idx) => {
          const letter = String(l).toUpperCase();
          return (
            <span
              key={idx}
              className={`px-3 py-1 rounded-lg font-bold border ${
                colors[letter] || "bg-gray-100 text-gray-600"
              }`}
            >
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  // --- RENDERIZADO DE ESTADOS DE CARGA/ERROR ---
  if (authLoading || cargandoPerfil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Hubo un problema
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-teal-600 font-semibold hover:underline"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No se encontró el perfil del usuario.</p>
      </div>
    );
  }

  // --- RENDERIZADO PRINCIPAL (TARJETA DE PERFIL) ---
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto pt-10">
        {/* TARJETA PRINCIPAL */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          {/* FONDO DE CABECERA (Gradiente) */}
          <div className="h-40 bg-gradient-to-r from-teal-400 via-emerald-500 to-indigo-600 relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          {/* CONTENIDO DEL PERFIL */}
          <div className="relative px-6 pb-10 sm:px-10">
            {/* AVATAR FLOTANTE */}
            <div className="flex flex-col sm:flex-row items-center -mt-16 mb-6 sm:mb-8">
              <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                <div className="w-full h-full rounded-full bg-indigo-50 flex items-center justify-center text-4xl font-bold text-indigo-600 uppercase border-2 border-indigo-100">
                  {perfil.name ? perfil.name.charAt(0) : "U"}
                </div>
              </div>
              <div className="mt-4 sm:mt-16 sm:ml-6 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {perfil.name}
                </h1>
                <p className="text-sm font-medium text-teal-600 uppercase tracking-wider bg-teal-50 inline-block px-3 py-1 rounded-full mt-2 border border-teal-100">
                  {perfil.type === "student" ? "Estudiante" : perfil.type}
                </p>
              </div>
            </div>

            {/* GRILLA DE INFORMACIÓN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* EMAIL CARD */}
              <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-teal-200 hover:bg-white transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400 group-hover:text-teal-500 transition-colors">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase">
                    Correo Electrónico
                  </h3>
                </div>
                <p className="text-gray-800 font-medium pl-1">{perfil.email}</p>
              </div>

              {/* RIASEC CARD */}
              <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/30 hover:border-indigo-200 hover:bg-indigo-50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>

                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-400 group-hover:text-indigo-600 transition-colors">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-indigo-400 uppercase">
                    Perfil Vocacional
                  </h3>
                </div>

                <div className="relative z-10">
                  {renderRiasecBadges(perfil.riasecProfile)}
                </div>
              </div>
            </div>

            {/* ACCIONES */}
            <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={logout}
                className="px-6 py-3 rounded-xl text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 border border-transparent hover:border-red-200 transition-all flex items-center justify-center gap-2"
              >
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Footer pequeño */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Impulso Educativo © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

// EXPORTACIÓN POR DEFECTO PARA EVITAR ERROR EN PREVIEW
export default UserProfilePage;
