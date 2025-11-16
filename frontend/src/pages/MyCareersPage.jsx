// src/pages/MyCareersPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // ⚠️ de 'react-router'
import { careersService } from "../services/careers.service";
import { useAuth } from "../context/AuthContext";

// ⚠️ Exportamos como una constante nombrada
export const MyCareersPage = () => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Para dar la bienvenida

  useEffect(() => {
    const fetchMyCareers = async () => {
      try {
        const data = await careersService.getMyCareers();
        setCarreras(data);
      } catch (err) {
        setError(
          "Error al cargar tus carreras. Es posible que aún no hayas cargado el perfil de tu institución."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyCareers();
  }, []); // El array vacío [] hace que se ejecute solo al cargar la página

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Mis Carreras</h1>
          <Link
            to="/dashboard/crear-carrera"
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            + Cargar Nueva Carrera
          </Link>
        </div>

        {/* --- Estados de Carga y Error --- */}
        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
            {error}
          </p>
        )}

        {/* --- Tabla de Carreras --- */}
        {!loading && !error && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Área
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {carreras.map((carrera) => (
                  <tr key={carrera.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {carrera.nombre}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {carrera.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {carrera.area_estudio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {carrera.duracion_anios} años
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Editar
                      </button>
                      <button className="text-red-600 hover:text-red-900 ml-4">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* --- Mensaje si no hay carreras --- */}
            {carreras.length === 0 && (
              <p className="text-center text-gray-500 p-8">
                Aún no has cargado ninguna carrera. ¡Empieza cargando la
                primera!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
