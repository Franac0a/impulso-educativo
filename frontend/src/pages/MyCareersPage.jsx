import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Usamos react-router-dom para web

// ⚠️ DESCOMENTA TUS IMPORTS REALES:
import { careerService } from "../services/career.service";
import { useAuth } from "../context/AuthContext";

export const MyCareersPage = () => {
  const { user } = useAuth();
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- LÓGICA (Igual que antes) ---
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta carrera?"
    );
    if (!confirmDelete) return;

    try {
      await careerService.delete(id);
      setCarreras((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Error al eliminar la carrera.");
    }
  };

  useEffect(() => {
    const fetchMyCareers = async () => {
      try {
        const data = await careerService.getMyCareers();
        setCarreras(data);
      } catch (err) {
        // Si falla es probable que no tenga institución, mostramos vacío o error
        console.error(err);
        setError(
          "No pudimos cargar tus carreras. Verifica tu conexión o perfil."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchMyCareers();
  }, []);

  // --- RENDERIZADO ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER DE LA PÁGINA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-20 md:pt-24">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Mis Carreras
            </h1>
            <p className="text-gray-500 mt-1">
              Administra la oferta académica de tu institución.
            </p>
          </div>
          <Link
            to="/dashboard/crear-carrera"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nueva Carrera
          </Link>
        </div>

        {/* ESTADOS DE CARGA Y ERROR */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* VISTA DE TARJETAS (Móvil) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {carreras.map((carrera) => (
                <div
                  key={carrera.id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {carrera.nombre}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${
                        carrera.tipo === "Grado"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {carrera.tipo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-semibold">Área:</span>{" "}
                    {carrera.area_estudio}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-semibold">Duración:</span>{" "}
                    {carrera.duracion_anios} años
                  </p>

                  <div className="flex gap-2 border-t border-gray-50 pt-3">
                    <Link
                      to={`/dashboard/editar-carrera/${carrera.id}`}
                      className="flex-1 text-center py-2 rounded-lg bg-gray-50 text-gray-700 font-medium text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(carrera.id)}
                      className="flex-1 text-center py-2 rounded-lg bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* VISTA DE TABLA (Escritorio) */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Nombre de la Carrera
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Área
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Duración
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {carreras.map((carrera) => (
                    <tr
                      key={carrera.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {carrera.nombre}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            carrera.tipo === "Grado"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-teal-100 text-teal-800"
                          }`}
                        >
                          {carrera.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {carrera.area_estudio}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {carrera.duracion_anios} años
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            to={`/dashboard/editar-carrera/${carrera.id}`}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(carrera.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MENSAJE SI NO HAY DATOS */}
            {carreras.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No hay carreras cargadas
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comienza agregando tu primera oferta académica.
                </p>
                <div className="mt-6">
                  <Link
                    to="/dashboard/crear-carrera"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cargar mi primera carrera
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
