import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ⚠️ DESCOMENTA TUS IMPORTS REALES:
import { useAuth } from "../context/AuthContext";
import { universityService } from "../services/university.service";

export const DashboardPage = () => {
  // Mocks para vista previa (Borrar en tu proyecto)
  const { user } = useAuth();
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificamos si el perfil de la institución ya existe
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await universityService.getMyInstitution();
        setInstitution(response.institucion);
      } catch (err) {
        setInstitution(null);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitution();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Cargando tu panel...</p>
      </div>
    );
  }

  // --- CASO 1: EL PERFIL NO EXISTE (ONBOARDING) ---
  if (!institution) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-10 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
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
            </div>
            <h1 className="text-3xl font-bold mb-2">¡Hola, {user.name}!</h1>
            <p className="text-indigo-100 text-lg">
              Tu cuenta institucional ha sido creada.
            </p>
          </div>

          <div className="p-10 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Siguiente paso: Activar Perfil
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              Para comenzar a publicar tus carreras y llegar a miles de
              estudiantes, necesitamos configurar el perfil público de tu
              institución.
            </p>

            <Link
              to="/dashboard/crear-perfil"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 gap-2"
            >
              <span>🚀</span> Crear Perfil Público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- CASO 2: EL PERFIL EXISTE (DASHBOARD) ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* HEADER DASHBOARD */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                Cuenta Verificada
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Panel de Control
            </h1>
            <p className="text-gray-500 text-lg mt-1">
              Administrando:{" "}
              <span className="font-semibold text-indigo-600">
                {institution.nombre}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-gray-500">Administrador</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE ACCIONES */}
      <div className="max-w-7xl mx-auto px-6 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TARJETA 1: MIS CARRERAS */}
          <Link
            to="/dashboard/mis-carreras"
            className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col items-start relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              Mis Carreras
            </h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Gestiona la oferta académica actual. Edita información, planes de
              estudio o elimina carreras antiguas.
            </p>
            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Ver listado{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>

          {/* TARJETA 2: CARGAR NUEVA (DESTACADA) */}
          <Link
            to="/dashboard/crear-carrera"
            className="group bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-300 flex flex-col items-start text-white relative overflow-hidden transform hover:-translate-y-1"
          >
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-10 rounded-tl-full -mr-10 -mb-10"></div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Nueva Carrera</h2>
            <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
              ¿Abriste una nueva inscripción? Agrégala al catálogo para que los
              estudiantes puedan encontrarla hoy mismo.
            </p>
            <span className="mt-auto bg-white text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm group-hover:bg-indigo-50 transition-colors">
              + Crear Carrera
            </span>
          </Link>

          {/* TARJETA 3: EDITAR PERFIL */}
          <Link
            to="/dashboard/editar-perfil"
            className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col items-start relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
              Editar Perfil
            </h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Mantén actualizada la información de tu institución, logo, sitio
              web y datos de contacto.
            </p>
            <span className="mt-auto text-teal-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Configurar{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
