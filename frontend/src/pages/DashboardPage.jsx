// src/pages/DashboardPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

// ⚠️ CAMBIO: Exportamos como una constante nombrada
export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-indigo-700">
        Panel de {user.name}
      </h1>
      <p className="mt-2 text-lg">
        Bienvenido al panel de administración de tu institución.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/dashboard/mis-carreras"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Mis Carreras</h2>
          <p className="text-gray-600">
            Ver, editar y eliminar las carreras de tu institución.
          </p>
        </Link>
        <Link
          to="/dashboard/crear-carrera"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Cargar Nueva Carrera</h2>
          <p className="text-gray-600">Agregar una nueva oferta académica.</p>
        </Link>
      </div>
    </div>
  );
};
