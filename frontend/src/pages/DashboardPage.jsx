import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { universityService } from "../services/university.service";

export const DashboardPage = () => {
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
        // Es normal que dé 404 si no está creado
        setInstitution(null);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitution();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Cargando panel...</div>;
  }

  // --- Caso 1: El perfil NO existe ---
  if (!institution) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen text-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          ¡Bienvenido, {user.name}!
        </h1>
        <p className="text-lg text-gray-600 mt-2 mb-6">
          Tu cuenta de institución está lista.
        </p>
        <div className="max-w-md mx-auto bg-white p-8 shadow-xl rounded-lg border border-indigo-300">
          <h2 className="text-2xl font-semibold mb-4">Siguiente Paso:</h2>
          <p className="text-gray-700 mb-6">
            Para poder cargar carreras, primero debes crear el perfil público de
            tu institución.
          </p>
          <Link
            to="/dashboard/crear-perfil"
            className="w-full inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
          >
            Crear Perfil
          </Link>
        </div>
      </div>
    );
  }

  // --- Caso 2: El perfil SÍ existe ---
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700">
          Panel de {institution.nombre}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Bienvenido, {user.name}. Desde aquí puedes administrar tus carreras y
          perfil.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Mis Carreras */}
          <Link
            to="/dashboard/mis-carreras"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Mis Carreras
            </h2>
            <p className="text-gray-600 mt-2">
              Ver, editar y eliminar las carreras de tu institución.
            </p>
            <span className="mt-4 inline-block text-indigo-600 font-semibold">
              Administrar Carreras &rarr;
            </span>
          </Link>

          {/* Card: Cargar Carrera */}
          <Link
            to="/dashboard/crear-carrera"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Cargar Nueva Carrera
            </h2>
            <p className="text-gray-600 mt-2">
              Agregar una nueva oferta académica a tu perfil.
            </p>
            <span className="mt-4 inline-block text-green-600 font-semibold">
              Cargar Carrera &rarr;
            </span>
          </Link>

          {/* Card: Editar Perfil */}
          <Link
            to="/dashboard/editar-perfil" // (Esta ruta aún no la hicimos)
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Editar Perfil
            </h2>
            <p className="text-gray-600 mt-2">
              Actualizar el nombre, alias o sitio web de tu institución.
            </p>
            <span className="mt-4 inline-block text-gray-600 font-semibold">
              Editar Perfil &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
